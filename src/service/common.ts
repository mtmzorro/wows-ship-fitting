/* global wx */
import AV from 'leancloud-storage/dist/av-weapp.js'
import Taro, { UserInfo } from '@tarojs/taro'
import { Fitting, User } from '../type/types'
import LearnCloud from '../utils/learnCloud'

export const saveFitting = (fitting: Partial<Fitting>): Promise<any> => {
    return LearnCloud.save('Fitting', fitting)
    // return new Promise((resolve) => {
    //     learnCloud.save('Fitting', fitting).then((result) => {
    //         console.log('saveFitting save success')
    //         resolve(result)
    //     }).catch((error) => {
    //         console.log('saveFitting save error', error)
    //     })
    // })
}

export const queryAllFitting = (): Promise<any> => {
    return LearnCloud.queryAll('Fitting')
}

// Login to LearnCloud server
// 小程序 onLoad 时执行，无感知登录，暂不获取 UserInfo，个人页、新建时获取
export const login = (): Promise<any> => {
    return AV.User.loginWithMiniApp().then((user) => {
        console.log('server login', user)
        // this.globalData.user = user
        return user

        // wx.getUserInfo({
        //     success: ({ userInfo }) => {
        //         console.log('wx ', userInfo)
        //     },
        // })

        // wx.getSetting({
        //     success(res) {
        //         console.log('wx setting', res.authSetting)
        //         // res.authSetting = {
        //         //   "scope.userInfo": true,
        //         //   "scope.userLocation": true
        //         // }
        //     },
        // })

        // wx.openSetting({
        //     success(res) {
        //         console.log('wx setting', res.authSetting)
        //         // res.authSetting = {
        //         //   "scope.userInfo": true,
        //         //   "scope.userLocation": true
        //         // }
        //     },
        // })
    })
}

export const checkLogin = (): boolean => {
    return AV.User.current() ? true : false
}

export const checkUserInfoSetting = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        Taro.getSetting({
            success(res) {
                const isEnable = res.authSetting['scope.userInfo']
                if (!isEnable) {
                    // 无 UserInfo 权限，触发授权提示
                    Taro.authorize({
                        scope: 'scope.userInfo',
                        success() {
                            // 用户已经同意小程序使用获取用户信息权限，后续调用不会弹窗询问
                            resolve(true)
                            console.log('authorize 同意')
                        },
                        fail() {
                            resolve(false)
                            console.log('authorize 不同意')
                        },
                    })
                } else {
                    resolve(true)
                    console.log('getSetting 已授权')
                }
            },
            fail(error) {
                reject(error)
            },
        })
    })
}

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        Taro.getUserInfo({
            success: ({ userInfo }) => {
                console.log('wx ', userInfo)
            },
        })
    })
}

// Stroage UserInfo to Server
export const stroageUserInfo = (userInfo: User): Promise<any> => {
    const user = AV.User.current()
    return user.set(userInfo).save()
}
