import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import Taro, { useReady, UserInfo } from '@tarojs/taro'

import Fitting from '../fitting/fitting'
import { Ship, User } from '../../type/types'
import { getShips } from '../../service/ship'
import { shipNameLocalize } from '../../utils/localization'
import { queryAllFitting, login, checkUserInfoSetting } from '../../service/common'
import { actions } from '../../reducers/user'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

const getShipImg = (id: string) => {
    return `https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1/ship_previews/${id}.png`
}

const getCommanderImg = (data: any) => {
    return `https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1/crew_commander/base/${data.nation}/${data.name}.png`
}

const Index: React.FC = () => {
    const dispatch = useDispatch()
    const [shipData, setShipData] = useState<Ship[]>([])

    useReady(() => {
        login()
            .then((user) => {
                const userId = user.id
                const userOpenId = user.attributes.authData.lc_weapp.openid
                dispatch(actions.setUserId(userId))
                dispatch(actions.setUserOpenId(userOpenId))
            })
            .catch((error) => {
                console.log(`Page Index login error`, error)
            })
    })

    useEffect(() => {
        setShipData(getShips())
        // wechatLogin()
        // 获取服务端 全部 Fitting
        // queryAllFitting()
        //     .then((result) => {
        //         console.log(result)
        //     })
        //     .catch((result) => {})
    }, [])

    // 新建方案、用户中心 需要获取用户信息授权
    const buttonClickHandle = (e) => {
        const userInfo: User = e.detail.userInfo
        if (userInfo) {
            dispatch(actions.setUserInfo(userInfo))
            Taro.navigateTo({
                url: '/pages/fittingEditor/fittingEditor?id=new',
            })
        }
        // checkUserInfoSetting()
    }

    return (
        <View className='index'>
            {console.log('index render')}
            {shipData.length > 0 && (
                <View>
                    <Text>Hello, World</Text>
                    <View>ID: {shipData[0].id}</View>
                    <View>Name: {shipNameLocalize(shipData[0].id)}</View>
                    <Text>国家: {shipData[0].nation}</Text>
                    <Text>T: {shipData[0].tier}</Text>
                    <Image src={getShipImg(shipData[0].id)}></Image>
                </View>
            )}
            <View>
                <View>舰长: Azur_Belfast</View>
                <View>
                    <Image
                        src={getCommanderImg({
                            name: 'Azur_Belfast',
                            nation: 'United_Kingdom',
                        })}
                    ></Image>
                </View>
            </View>
            <Button onGetUserInfo={buttonClickHandle} openType='getUserInfo'>
                创建我的配船方案
            </Button>
        </View>
    )
}

export default Index
