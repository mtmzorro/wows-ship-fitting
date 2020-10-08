import leancloudApp from '../../.travis/leancloudApp.json'

const config = {
    dataVersion: '0.9.5',
    language: 'zh-CN',
    CDNPath: 'https://jsfi',
    imageCDNPath: 'https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1',
    shipImageCDNPath: 'https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1',
    kitImageCDNPath: 'https://cdn.jsdelivr.net/gh/mtmzorro/ship-res-kit@0.0.1',
    leanCould: {
        appId: leancloudApp.appId,
        appKey: leancloudApp.appKey,
        serverURL: 'https://avoscloud.com',
    },
    dbClasses:{
        // Fitting: 'Fitting_new'
        Fitting: 'Fitting'
    }
}

export default config
