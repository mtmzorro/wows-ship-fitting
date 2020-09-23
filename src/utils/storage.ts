import Taro from '@tarojs/taro'

/**
 * setStorage 写入本地存储
 * @param key key
 * @param value value
 * @param expire 可选 过期时间，单位 s 分钟，getStorage 时会根据过期时间清理
 * @returns Promise<any>
 */
export const setStorage = async (key: string, value: string | {}, expire?: number): Promise<any> => {
    try {
        const cache = {
            data: value,
            expire: expire && expire * 60000,
            startTime: new Date().getTime(),
        }
        return await Taro.setStorage({
            key: key,
            data: cache,
        })
    } catch (error) {
        console.log(error)
    }
}

/**
 * getStorage 获取本地存储
 * @param key
 * @returns Promise<any | undefined>
 */
export const getStorage = async (key: string): Promise<any | undefined> => {
    try {
        const nowDate = new Date().getTime()
        const cache = await Taro.getStorage({ key: key })
        const result = cache.data
        if (result.expire && nowDate - result.startTime > result.expire) {
            Taro.removeStorage({
                key: key,
            })
            return undefined
        }
        return result.data
    } catch (error) {
        console.log(error)
    }
}
