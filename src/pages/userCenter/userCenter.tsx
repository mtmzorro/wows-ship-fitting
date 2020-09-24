import React, { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { Fitting, User } from '../../type/types'
import { queryFittingsByUser, deleteFittingById } from '../../service/common'
import { actions as fittingDetailActions } from '../../reducers/fittingDetail'
import { actions as fittingEditorActions } from '../../reducers/fittingEditor'
import SwipeAction, { ClickType } from '../../components/swipeAction/swipeAction'
import FittingItem from '../../components/fittingItem/fittingItem'
import useLogin from '../../utils/useLogin'
import './userCenter.scss'

const UserCenter: React.FC = () => {
    // 登录态 微信信息授权
    useLogin('/pages/userCenter/userCenter', 'tabBar')

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

    // 滑动操作按钮
    const handleListItemClick = async (id: string, clickType: ClickType) => {
        if (clickType === 'delete') {
            const modalResult = await Taro.showModal({ content: '确定要删除吗？\n删除后不可恢复' })
            if (modalResult.confirm) {
                try {
                    await deleteFittingById(id)
                    Taro.startPullDownRefresh()
                } catch (error) {
                    if (error.code === 403) {
                        Taro.showModal({
                            content: '删除失败，您没有权限操作该装配方案。',
                            showCancel: false,
                        })
                    } else {
                        Taro.showModal({
                            content: '保存失败，网络或者服务器异常。',
                            showCancel: false,
                        })
                    }
                }
            }
        }
    }

    // 打开装配详情页
    const handleFittingDetail = (fitting: Fitting) => {
        dispatch(fittingDetailActions.setFittingDetail(fitting))
        Taro.navigateTo({
            url: `/pages/fittingDetail/fittingDetail?id=${fitting.id}&type=edit`,
        })
    }

    // 新建方案
    const handleCreateClick = () => {
        // reset FittingEditor
        dispatch(fittingEditorActions.resetFittingEditor())
        Taro.navigateTo({
            url: '/pages/fittingEditor/fittingEditor?type=new',
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
            {fittingList.length === 0 ? (
                <View className='user-center__empty empty'>
                    <View className='empty__title'>装配列表&nbsp;空空如也</View>
                    <View className='empty__ext'>{`您可以新建舰船装配\n或者下拉页面刷新数据`}</View>
                    <View className='empty__handle'>
                        <Button
                            className='common-button common-button--primary empty__handle-button'
                            onClick={handleCreateClick}
                        >
                            新建装配方案
                        </Button>
                    </View>
                </View>
            ) : (
                <View className='user-center__fitting'>
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
            )}
        </View>
    )
}

export default UserCenter
