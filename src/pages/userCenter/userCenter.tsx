import React, { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { Fitting, User } from '../../type/types'
import { queryFittingsByUser } from '../../service/common'
import { actions } from '../../reducers/fittingDetail'
import SwipeAction, { ClickType } from '../../components/swipeAction/swipeAction'
import FittingItem from '../../components/fittingItem/fittingItem'
import './userCenter.scss'

const UserCenter: React.FC = () => {
    // connect store
    const user: User = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [fittingList, setFittingList] = useState<Fitting[]>([])

    const getUserFittingData = async () => {
        Taro.showLoading({ mask: true, title: '加载数据中' })
        try {
            const result = await queryFittingsByUser(user.openId)
            Taro.hideLoading()
            setFittingList(result)
        } catch (error) {
            console.log(error)
            Taro.hideLoading()
            Taro.showToast({
                title: '服务端数据异常，请稍后重试。',
                icon: 'none',
                duration: 2000,
            })
        }
    }

    // 初始化数据
    useEffect(() => {
        getUserFittingData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.openId])

    // 下拉刷新
    usePullDownRefresh(async () => {
        await getUserFittingData()
        Taro.stopPullDownRefresh()
    })

    // 删除操作
    const handleListItemClick = (id: string, clickType: ClickType) => {
        console.log(id, clickType)
        if (clickType === 'delete') {
            console.log('删除操作')
        }
    }

    // 打开装配详情页
    const handleFittingDetail = (fitting: Fitting) => {
        dispatch(actions.setFittingDetail(fitting))
        Taro.navigateTo({
            url: `/pages/fittingDetail/fittingDetail?id=${fitting.id}&type=edit`,
        })
    }
    return (
        <View className='user-center'>
            <View className='user-center__top'>
                <View className='user-center__top-banner'></View>
                <View className='user-center__top-user top-user'>
                    <Image className='top-user__image' src={user.avatarUrl} />
                    <View className='top-user__name'>{user.nickName}</View>
                </View>
            </View>
            <View className='user-center__fitting '>
                <View className='section-title'>
                    <View className='section-title__sub'>Fitting List</View>
                    <View className='section-title__content'>我的装配方案</View>
                </View>
                <View className='fitting-list'>
                    {fittingList.map((fitting) => {
                        return (
                            <View key={fitting.id} className='fitting-list__item item'>
                                <SwipeAction
                                    onClick={handleListItemClick.bind(this, fitting.id)}
                                    classname='item__swipe'
                                >
                                    <FittingItem
                                        {...fitting}
                                        itemType='list'
                                        handleFittingDetail={handleFittingDetail}
                                    />
                                </SwipeAction>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

export default UserCenter
