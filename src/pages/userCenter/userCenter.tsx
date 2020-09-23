import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { Fitting } from '../../type/types'
import SwipeAction, { ClickType } from '../../components/swipeAction/swipeAction'
import { queryAllFitting } from '../../service/common'
import FittingItem from '../../components/fittingItem/fittingItem'
import './userCenter.scss'

const UserCenter: React.FC = () => {
    const [fittingList, setFittingList] = useState<Fitting[]>([])

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

    const handleListItemClick = (id: string, clickType: ClickType) => {
        console.log(id, clickType)
        if (clickType === 'delete') {
            console.log('删除操作')
        }
    }
    const handleFittingDetail = () => {}
    return (
        <View className='user-center'>
            <View className='user-center__top'>
                <View className='user-center__top-banner'></View>
                <View className='user-center__top-user top-user'>
                    <Image
                        className='top-user__image'
                        src='https://avatar-static.segmentfault.com/556/099/556099345-596cba02b2ff8_big64'
                    />
                    <View className='top-user__name'>mTmzorro 荆棘谷</View>
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
