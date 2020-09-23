export default {
    pages: [
        'pages/index/index',
        'pages/fittingDetail/fittingDetail',
        'pages/fittingEditor/fittingEditor',
        'pages/shipSelector/shipSelector',
        'pages/cmdrSelector/cmdrSelector',
        'pages/skillSelector/skillSelector',
        'pages/userCenter/userCenter',
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
        color: '#999999',
        selectedColor: '#233e99',
        list: [
            {
                iconPath: 'assets/images/icon-index.png',
                selectedIconPath: 'assets/images/icon-index-selected.png',
                pagePath: 'pages/index/index',
                text: '装配首页',
            },
            {
                iconPath: 'assets/images/icon-user.png',
                selectedIconPath: 'assets/images/icon-user-selected.png',
                pagePath: 'pages/userCenter/userCenter',
                text: '我的装配',
            },
        ],
    },
}
