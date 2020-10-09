import Taro, { useReady } from '@tarojs/taro'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/user'
import { checkServerLogin, serverLogin, saveServerUserInfo } from '../service/common'
import { User } from '../type/types'

/**
 * useLogin 登陆、wx.UserInfo Hook
 * 如未登陆、未解析UserInfo 跳转 login
 * @param redirectUrl login页，登录后重定向 url
 * @param redirectType login页，登录后重定向 页面类型
 * @returns isLogin 是否登陆
 */
const useLogin = (redirectUrl: string, redirectType: 'page' | 'tabBar'): boolean => {
    const [isLogin, setIsLogin] = useState(false)
    const dispatch = useDispatch()
    const userStore: User = useSelector((state) => state.user)

    // 获取 UserInfo 微信授权验证相关操作
    const handleUserInfo = async () => {
        try {
            // 可获取字段 nickName avatarUrl gender province city country
            const { userInfo } = await Taro.getUserInfo()

            // 已授权 存储 userInfo 数据，有变化则更新 store，并存储到 Sever 用户表
            if (userStore.nickName !== userInfo.nickName || userStore.avatarUrl !== userInfo.avatarUrl) {
                dispatch(actions.setUserInfo(userInfo))
                saveServerUserInfo(userInfo)
            }
            return true
        } catch (error) {
            // 未授权
            return false
        }
    }

    // 存储用户 Server Id openId 相关操作
    const handleUserId = (user) => {
        const userId = user.id
        const userOpenId = user.attributes.authData.lc_weapp.openid
        // 有变化则 更新 store
        if (userStore.id !== userId || userStore.openId !== userOpenId) {
            dispatch(actions.setUserId(userId))
            dispatch(actions.setUserOpenId(userOpenId))
        }
    }

    // 存储 User Store，获取 UserInfo 微信相关
    const handleUser = async (user) => {
        handleUserId(user)
        const result = await handleUserInfo()

        if (result) {
            Taro.hideLoading()
            setIsLogin(true)
        } else {
            // 未授权 跳转 login 授权页
            Taro.redirectTo({
                url: `/pages/login/login?redirectUrl=${redirectUrl}&redirectType=${redirectType}`,
            })
        }
    }

    // 生命周期 onReady 时执行
    useReady(async () => {
        // 获取 Server 登录态
        const user = checkServerLogin()
        console.log('当前用户 Server 登录态', user)
        Taro.showLoading({ title: '加载中...', mask: true })

        if (user) {
            // Server 已登录
            handleUser(user)
        } else {
            // Server 未登录 静默登录
            try {
                const userResult = await serverLogin()
                handleUser(userResult)
            } catch (error) {
                Taro.hideLoading()
                Taro.showToast({
                    title: '服务端返回异常，请检查网络或重试',
                    icon: 'none',
                })
            }
        }
    })

    return isLogin
}

export default useLogin
