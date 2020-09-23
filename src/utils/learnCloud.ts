import AV from 'leancloud-storage/dist/av-weapp.js'
import config from '../config/config'

class LearnCloud {
    private static instance: LearnCloud
    private constructor() {
        AV.init({
            appId: config.leanCould.appId,
            appKey: config.leanCould.appKey,
            serverURL: config.leanCould.serverURL,
        })
    }
    /**
     * save to LearnCloud Class
     * @param className
     * @param data
     */
    public save(className: string, data: Object): Promise<any> {
        const DataObject = AV.Object.extend(className)

        const dataObject = new DataObject()
        Object.keys(data).forEach((key) => {
            dataObject.set(key, data[key])
        })

        return dataObject.save().then((result) => {
            console.log('LearnCloud save success: ', result)
            return result
        })
    }

    /**
     * queryAll
     * @param className
     */
    public queryAll(className: string): Promise<any> {
        const query = new AV.Query(className)
        return query.find().then((result) => {
            console.log(`LearnCloud queryAll ${className} success: `, result)
            return result
        })
    }

    /**
     * getInstance
     */
    public static getInstance(): LearnCloud {
        if (!LearnCloud.instance) {
            LearnCloud.instance = new LearnCloud()
        }
        return LearnCloud.instance
    }
}

export default LearnCloud.getInstance()
