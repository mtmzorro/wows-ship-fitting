export default {
    pages: [
        'pages/index/index',
        'pages/fittingDetail/fittingDetail',
        'pages/fittingEditor/fittingEditor',
        'pages/shipSelector/shipSelector',
        'pages/cmdrSelector/cmdrSelector',
        'pages/skillSelector/skillSelector',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FFFFFF',
        navigationBarTitleText: '战舰工坊',
        navigationBarTextStyle: 'black',
        backgroundColorTop: '#FFFFFF',
        backgroundColorBottom: '#FFFFFF',
    },
    tabBar: {
        list: [
            {
                pagePath: 'pages/index/index',
                text: '装配首页',
            },
            {
                pagePath: 'pages/fittingEditor/fittingEditor',
                text: '我的装配',
            },
        ],
    },
}
