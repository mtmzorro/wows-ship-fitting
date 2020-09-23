import AV from 'leancloud-storage/dist/av-weapp.js'
import config from '../config/config'

AV.init({
    appId: config.leanCould.appId,
    appKey: config.leanCould.appKey,
    serverURL: config.leanCould.serverURL,
})

export default AV
