import React, { useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './navBar.scss'

const NavBar: React.FC = () => {
    const wxMenuRect = useMemo(() => Taro.getMenuButtonBoundingClientRect(), [])
    // const wxSystemInfo = useMemo(() => Taro.getSystemInfoSync(), [])

    const menuHeight = wxMenuRect.height
    const navBarStyle = {
        height: menuHeight,
        top: wxMenuRect.top,
    }

    const handleBack = () => {
        Taro.navigateBack({ delta: 1 })
    }

    const handleHome = () => {
        Taro.switchTab({ url: '/pages/index/index' })
    }

    if (!wxMenuRect || menuHeight === 0) {
        return <React.Fragment></React.Fragment>
    }
    return (
        <View className='nav-bar' style={navBarStyle}>
            {Taro.getCurrentPages().length > 1 ? (
                <View className='nav-bar__button' onClick={handleBack}>
                    <View className='iconfont icon-back'></View>
                </View>
            ) : (
                <View className='nav-bar__button' onClick={handleHome}>
                    <View className='iconfont icon-index'></View>
                </View>
            )}
        </View>
    )
}

export default NavBar
