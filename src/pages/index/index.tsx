import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Button} from '@tarojs/components'
import Taro, { usePullDownRefresh, useReady } from '@tarojs/taro'
import { Fitting, User } from '../../type/types'
import { queryRecentFitting } from '../../service/common'
import { actions as userActions } from '../../reducers/user'
import { actions as fittingEditorActions } from '../../reducers/fittingEditor'
import { actions as fittingDetailActions } from '../../reducers/fittingDetail'
import FittingItem from '../../components/fittingItem/fittingItem'
import './index.scss'

const Index: React.FC = () => {
    const dispatch = useDispatch()
    const [fittingList, setFittingList] = useState<Fitting[]>([])

    // ready 静默登陆
    // useReady(() => {
    //     login()
    //         .then((user) => {
    //             const userId = user.id
    //             const userOpenId = user.attributes.authData.lc_weapp.openid
    //             dispatch(userActions.setUserId(userId))
    //             dispatch(userActions.setUserOpenId(userOpenId))
    //         })
    //         .catch((error) => {
    //             console.log(`Page Index login error`, error)
    //         })
    // })

    // 获取服务端 近期 Fitting
    const getFittingData = async () => {
        try {
            const result = await queryRecentFitting()
            console.log('queryAllFitting', result)
            setFittingList(result)
        } catch (error) {
            Taro.showToast({
                title: '服务器或数据有问题啦，请稍后重试。',
                icon: 'none',
                duration: 2000,
            })
        }
    }

    // 初次刷新
    useEffect(() => {
        getFittingData()
    }, [])

    // 下拉刷新
    usePullDownRefresh(async () => {
        await getFittingData()
        Taro.stopPullDownRefresh()
    })

    // 新建方案 需要获取用户信息授权
    const handleCreateClick = (e) => {
        // reset FittingEditor
        dispatch(fittingEditorActions.resetFittingEditor())
        Taro.navigateTo({
            url: '/pages/fittingEditor/fittingEditor?type=new',
        })
    }

    // 打开装配详情页
    const handleFittingDetail = (fitting: Fitting) => {
        dispatch(fittingDetailActions.setFittingDetail(fitting))
        Taro.navigateTo({
            url: `/pages/fittingDetail/fittingDetail?id=${fitting.id}&type=read`,
        })
    }

    return (
        <View className='index'>
            <View className='title'>HELLO，指挥官！</View>
            <Button
                className='fitting-banner'
                onClick={handleCreateClick}
            >
                创建我的配船方案
            </Button>
            <View className='section-title'>
                <View className='section-title__sub'>Recent</View>
                <View className='section-title__content'>近期云端装配</View>
            </View>
            {fittingList.map((fitting) => {
                return (
                    <FittingItem
                        key={fitting.id}
                        {...fitting}
                        itemType='card'
                        handleFittingDetail={handleFittingDetail}
                    />
                )
            })}
        </View>
    )
}

export default Index
