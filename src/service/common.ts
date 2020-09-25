import Taro from '@tarojs/taro'
import { Fitting, User } from '../type/types'
import config from '../config/config'
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
        createDate: data.createdAt ? data.createdAt.getTime(): 0,
        modifyDate: data.updatedAt ? data.updatedAt.getTime(): 0,
        ...data.attributes,
    }
}

// saveFitting 保存 装配方案
export const saveFitting = async (fitting: Partial<Fitting>): Promise<Fitting> => {
    const DataObject = AV.Object.extend(config.dbClasses.Fitting)
    const dataObject = new DataObject()
    Object.keys(fitting).forEach((key) => {
        if (key === 'id') return // id 为数据库自生成，忽略
        dataObject.set(key, fitting[key])
    })

    // 设置 数据 ACL 
    const acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setWriteAccess(AV.User.current(), true);
    dataObject.setACL(acl)

    const result = await dataObject.save()
    return parseFittingData(result)
}

// updateFitting 更新 装配方案
export const updateFitting = async (fitting: Partial<Fitting>): Promise<Fitting> => {
    const dataObject = AV.Object.createWithoutData(config.dbClasses.Fitting, fitting.id)
    Object.keys(fitting).forEach((key) => {
        // id 为数据库自生成，authorOpenId 无需更新
        if (key === 'id' || key === 'authorOpenId') return 
        dataObject.set(key, fitting[key])
    })

    const result = await dataObject.save()
    return parseFittingData(result)
}

// queryAllFitting 获取全部配装方案
export const queryAllFitting = async (): Promise<any> => {
    const query = new AV.Query(config.dbClasses.Fitting)
    query.descending('createdAt')
    
    const result = await query.find()
    return result
}

// queryRecentFitting 获取最近20个方案，并本地缓存
export const queryRecentFitting = async (): Promise<Fitting[]> => {
    const storageResult = await getStorage('indexFittings')

    if (storageResult) {
        return storageResult
    } else {
        const query = new AV.Query(config.dbClasses.Fitting)
        query.descending('createdAt')
        query.limit(20)

        const result = await query.find()
        const parsedResult = result.map((item) => parseFittingData(item))
        // 存储并设置缓存时间 分钟
        setStorage('indexFittings', parsedResult, 10)
        return parsedResult
    }
}

// queryAllFitting 获取全部配装方案
export const queryFittingsByUser = async (openID: string): Promise<Fitting[]> => {
    const query = new AV.Query(config.dbClasses.Fitting)
    query.equalTo('authorOpenId', openID)
    query.descending('createdAt')

    const result = await query.find()
    const parsedResult = result.map((item) => parseFittingData(item))
    return parsedResult
}

// getFittingById 根据 id 方案查询
export const getFittingById = async (id: string): Promise<Fitting> => {
    const query = new AV.Query(config.dbClasses.Fitting)

    const result = await query.get(id)
    return parseFittingData(result)
}

// deleteFittingById 根据 id 删除方案，服务端已做 ACL 控制
export const deleteFittingById = async (id: string): Promise<any> => {
    const dataObject = AV.Object.createWithoutData(config.dbClasses.Fitting, id)
    return await dataObject.destroy()
}

// Login to LeanCloud server
// 小程序 onLoad 时执行，无感知登录，暂不获取 UserInfo，个人页、新建时获取
export const serverLogin = async (): Promise<any> => {
    const user = await AV.User.loginWithMiniApp()
    console.log('Server login', user)
    return user
}

// checkServerLogin 检查登录态
export const checkServerLogin = () => {
    return AV.User.current()
}

// saveServer wx.UserInfo to Server
export const saveServerUserInfo = (userInfo: Partial<User>): Promise<any> => {
    const user = AV.User.current()
    return user.set(userInfo).save()
}
