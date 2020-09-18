import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import Taro, { useReady, UserInfo } from '@tarojs/taro'

import { Fitting, User } from '../../type/types'
import { queryAllFitting, login } from '../../service/common'
import { actions } from '../../reducers/user'
import { actions as fittingEditorAtions } from '../../reducers/fittingEditor'
import ListItem from './listItem/listItem'

import './index.scss'

const Index: React.FC = () => {
    const dispatch = useDispatch()
    const [fittingList, setFittingList] = useState<Fitting[]>([])

    // ready 静默登陆
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

    // useEffect(() => {
    //     // 获取服务端 全部 Fitting
    //     queryAllFitting().then((result: any[]) => {
    //         console.log('queryAllFitting', result)
    //         const cache = result.map((item) => {
    //             return {
    //                 id: item.id,
    //                 createDate: item.createdAt,
    //                 modifyDate: item.updatedAt,
    //                 ...item.attributes,
    //             }
    //         }) as Fitting[]
    //         setFittingList(cache)
    //     })
    // }, [])

    // 新建方案 需要获取用户信息授权
    const buttonClickHandle = (e) => {
        const userInfo: User = e.detail.userInfo
        if (userInfo) {
            dispatch(actions.setUserInfo(userInfo))
            // reset FittingEditor
            dispatch(fittingEditorAtions.resetFittingEditor())
            Taro.navigateTo({
                url: '/pages/fittingEditor/fittingEditor?id=new',
            })
        }
        // checkUserInfoSetting()
    }

    const handleFittingDetail = (id: string) => {
        Taro.navigateTo({
            url: `/pages/fittingDetail/fittingDetail?id=${id}`,
        })
    }

    return (
        <View className='index'>
            <View className='title'>HELLO，指挥官！</View>
            <Button
                className='fitting-banner'
                onGetUserInfo={buttonClickHandle}
                openType='getUserInfo'
            >
                创建我的配船方案
            </Button>
            <View className='section-title'>
                <View className='section-title__sub'>Recent</View>
                <View className='section-title__content'>近期装配方案</View>
            </View>
            {fittingList.map((fitting) => {
                return (
                    <ListItem
                        key={fitting.id}
                        {...fitting}
                        handleFittingDetail={handleFittingDetail}
                    />
                )
            })}
        </View>
    )
}

export default Index
