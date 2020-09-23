/* global wx */
// import AV from 'leancloud-storage/dist/av-weapp.js'
import Taro, { UserInfo } from '@tarojs/taro'
import { Fitting, User } from '../type/types'
import LearnCloud from '../utils/learnCloud'
import AV from '../utils/leanCloud'
import nationData from '../data/nation'
import shipSpeciesData from '../data/shipSpecies'
import { setStorage, getStorage } from '../utils/storage'

// get 国家列表
export const getNationList = () => {
    return [...nationData]
}

// get 舰船分类列表
export const getShipSpeciesList = () => {
    return [...shipSpeciesData]
}

// 解析 LeanCloud 获取到的 Fiiting 数据
const parseFittingData = (data: any): Fitting => {
    return {
        id: data.id,
        createDate: data.createdAt.getTime(),
        modifyDate: data.updatedAt.getTime(),
        ...data.attributes,
    }
}

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

export const queryAllFitting = async (): Promise<any> => {
    const query = new AV.Query('Fitting')
    query.descending('createdAt')
    const result = await query.find()
    return result
}

/**
 * queryRecentFitting 获取最近20个方案，并本地缓存
 */
export const queryRecentFitting = async (): Promise<Fitting[]> => {
    const storageResult = await getStorage('indexFittings')

    if (storageResult) {
        return storageResult
    } else {
        const query = new AV.Query('Fitting')
        query.descending('createdAt')
        query.limit(20)
        const result = await query.find()
        const parsedResult =  result.map((item) => parseFittingData(item))
        // 存储并设置缓存时间 分钟
        setStorage('indexFittings', parsedResult, 10)
        return parsedResult
    }
}

// getFittingById 根据 id 方案查询
export const getFittingById = async (id: string): Promise<Fitting> => {
    const query = new AV.Query('Fitting')
    const result = await query.get(id)
    return parseFittingData(result)
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
                resolve(userInfo)
            },
            fail: (error) => {
                reject(error)
            },
        })
    })
}

// Stroage UserInfo to Server
export const stroageUserInfo = (userInfo: User): Promise<any> => {
    const user = AV.User.current()
    return user.set(userInfo).save()
}
