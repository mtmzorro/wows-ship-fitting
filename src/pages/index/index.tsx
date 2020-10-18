import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Button } from '@tarojs/components'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { queryRecentFitting } from '../../service/common'
import { actions as fittingEditorActions } from '../../reducers/fittingEditor'
import { actions as fittingDetailActions } from '../../reducers/fittingDetail'
import FittingItem from '../../components/fittingItem/fittingItem'
import Skeleton from './skeleton/skeleton'
import './index.scss'

const Index: React.FC = () => {
    const dispatch = useDispatch()
    const [topFittings, setTopFittings] = useState<Fitting[]>([])
    const [topFittingsLoading, setTopFittingsLoading] = useState(false)

    // 设置近期顶置精选
    const setTopFittingsData = async () => {
        try {
            setTopFittingsLoading(true)
            const result = await queryRecentFitting()
            setTopFittingsLoading(false)
            setTopFittings(result)
        } catch (error) {
            Taro.showToast({
                title: '服务器或数据有问题啦，请稍后重试。',
                icon: 'none',
                duration: 2000,
            })
        }
    }

    // 检查更新
    const checkUpdate = () => {
        const updateManager = Taro.getUpdateManager()
        updateManager.onUpdateReady(function () {
            Taro.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                },
            })
        })
        updateManager.onUpdateFailed(function () {
            Taro.showToast({
                title: '更新失败，请稍后重试。',
                icon: 'none',
                duration: 2000,
            })
        })
    }

    // 初次刷新
    useEffect(() => {
        checkUpdate()
        setTopFittingsData()
    }, [])

    // 下拉刷新
    usePullDownRefresh(async () => {
        await setTopFittingsData()
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

    // 配置微信分享
    Taro.showShareMenu({
        withShareTicket: true,
    })

    return (
        <View className='index'>
            <View className='title'>HELLO，指挥官！</View>
            <Button className='fitting-banner' onClick={handleCreateClick}>
                创建我的配船方案
            </Button>
            <View className='section-title'>
                <View className='section-title__sub'>Recent</View>
                <View className='section-title__content'>精选云端装配</View>
            </View>
            {topFittingsLoading ? (
                <Skeleton />
            ) : (
                <React.Fragment>
                    {topFittings.map((fitting) => {
                        return (
                            <FittingItem
                                key={fitting.id}
                                {...fitting}
                                itemType='card'
                                handleFittingDetail={handleFittingDetail}
                            />
                        )
                    })}
                </React.Fragment>
            )}
        </View>
    )
}

export default Index
