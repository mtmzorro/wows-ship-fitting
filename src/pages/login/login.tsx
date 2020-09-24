import React from 'react'
import { View, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { actions } from '../../reducers/user'

const Login: React.FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const redirectUrl = router.params.redirectUrl
    const redirectType = router.params.redirectType

    // button onGetUserInfo 获取用户授权弹窗 
    // https://developers.weixin.qq.com/community/develop/doc/000aee01f98fc0cbd4b6ce43b56c01
    const handleLogin = (e) => {
        const userInfo = e.detail.userInfo
        if (!userInfo) return // 未授权返回
        // 授权 存储 UserInfo
        dispatch(actions.combineUserInfo(userInfo))
        // 返回重定向目标
        if (redirectType === 'tabBar') {
            Taro.switchTab({ url: redirectUrl })
        } else {
            Taro.redirectTo({ url: redirectUrl })
        }
    }

    return (
        <View className='Login'>
            <View className='login__wrap'>
                <View className='login__image'></View>
                <View className='login__title'>程序需要您的授权</View>
                <View className='login__ext'>{`获取微信基础信息用于\n为您的装配方案署名、保存方案列表等`}</View>
                <View className='login__handle'>
                    <Button
                        className='common-button common-button--primary login__handle-button'
                        onGetUserInfo={handleLogin}
                        openType='getUserInfo'
                    >
                        确认并继续
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default Login
