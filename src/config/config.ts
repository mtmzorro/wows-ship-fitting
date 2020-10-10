import leancloudApp from '../../.travis/leancloudApp.json'

const versionData = '0.9.5'
const versionImage = '0.9.9.1'
const CDNPath = 'https://cdn.jsdelivr.net/gh/mtmzorro'

const config = {
    versionData: versionData,
    versionImage: versionImage,
    language: 'zh-CN',
    imageCDNPath: `${CDNPath}/ship-res@0.0.1`,
    imageCDNPathShip: `${CDNPath}/ship-res@${versionImage}`,
    imageCDNPathKit: `${CDNPath}/ship-res-kit@${versionImage}`,
    leanCould: {
        appId: leancloudApp.appId,
        appKey: leancloudApp.appKey,
        serverURL: 'https://avoscloud.com',
    },
    dbClasses:{
        Fitting: 'Fitting'
    }
}

export default config
