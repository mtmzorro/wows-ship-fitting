import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import Taro, { useReady, UserInfo } from '@tarojs/taro'

import { Fitting, User } from '../../type/types'
import { getShipImage } from '../../service/ship'
import { shipNameLocalize } from '../../utils/localization'
import { queryAllFitting, login } from '../../service/common'
import { actions } from '../../reducers/user'

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

    useEffect(() => {
        // 获取服务端 全部 Fitting
        queryAllFitting().then((result: any[]) => {
            console.log('queryAllFitting', result)
            const cache = result.map((item) => {
                return {
                    id: item.id,
                    createDate: item.createdAt,
                    modifyDate: item.updatedAt,
                    ...item.attributes,
                }
            }) as Fitting[]
            setFittingList(cache)
        })
    }, [])

    // 新建方案 需要获取用户信息授权
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

    const handleFittingDetail = (id: string) => {
        Taro.navigateTo({
            url: `/pages/fittingDetail/fittingDetail?id=${id}`,
        })
    }

    return (
        <View className='index'>
            <Button onGetUserInfo={buttonClickHandle} openType='getUserInfo'>
                创建我的配船方案
            </Button>
            {fittingList.map((fitting) => {
                return (
                    <View key={fitting.id} onClick={handleFittingDetail.bind(this, fitting.id)}>
                        <Image src={getShipImage(fitting.shipId)} />
                        <View>{fitting.title}</View>
                        <View>作者：{fitting.authorNickName}</View>
                        <View>舰长：{fitting.commanderName}</View>
                        <View>舰船：{shipNameLocalize(fitting.shipId)}</View>
                    </View>
                )
            })}
        </View>
    )
}

export default Index
