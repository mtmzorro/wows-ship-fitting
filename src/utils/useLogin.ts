import Taro, { useReady } from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../reducers/user'
import { checkServerLogin, serverLogin } from '../service/common'
import { User } from '../type/types'

/**
 * useDebouce 防抖 Hook
 * @param value 防抖目标
 * @param delay 延时
 */
const useLogin = (redirectUrl: string, redirectType: 'page' | 'tabBar') => {
    const dispatch = useDispatch()
    const userStore: User = useSelector((state) => state.user)

    // 获取 UserInfo 微信授权验证相关操作
    const handleUserInfo = async () => {
        try {
            /** 
             *  向 store 存储 微信相关数据
                userInfo.nickName
                userInfo.avatarUrl
                userInfo.gender //性别 0：未知、1：男、2：女
                userInfo.province
                userInfo.city
                userInfo.country
             */
            const { userInfo } = await Taro.getUserInfo()
            // 已授权 存储 userInfo 数据，有变化则更新 store
            if (
                userStore.nickName !== userInfo.nickName ||
                userStore.avatarUrl !== userInfo.avatarUrl
            ) {
                dispatch(actions.combineUserInfo(userInfo))
            }
        } catch (error) {
            // 未授权 跳转 login 授权页
            Taro.redirectTo({
                url: `/pages/login/login?redirectUrl=${redirectUrl}&redirectType=${redirectType}`,
            })
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

    // 生命周期 onReady 时执行
    useReady(async () => {
        // 获取 Server 登录态
        const user = checkServerLogin()
        console.log('当前用户 Server 登录态', user)

        if (user) {
            // 已登录
            handleUserId(user)
            handleUserInfo()
        } else {
            // 未登录 静默登录
            try {
                const userResult = await serverLogin()
                // 登录后 存储 userId userOpenId 数据
                handleUserId(userResult)
                handleUserInfo()
            } catch (error) {
                Taro.showToast({
                    title: '服务端返回异常，请检查网络或重试',
                    icon: 'none',
                })
            }
        }
    })
}

export default useLogin
