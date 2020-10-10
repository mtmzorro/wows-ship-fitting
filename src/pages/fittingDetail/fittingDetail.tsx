import React, { useEffect } from 'react'
import { View, Button, Image } from '@tarojs/components'
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { getCommanderImage } from '../../service/commander'
import { getShipImage } from '../../service/ship'
import { getSkillbyId } from '../../service/skill'
import { queryFittingById } from '../../service/common'
import { commanderNameLocalize, shipNameLocalize } from '../../utils/localization'
import SkillItem from '../../components/skillItem/skillItem'
import { actions as fittingEditorActions } from '../../reducers/fittingEditor'
import { actions as fittingDetailActions } from '../../reducers/fittingDetail'
import NavBar from '../../components/navBar/navBar'
import './fittingDetail.scss'

interface State {
    fittingDetail: Fitting
    user: User
}

const FittingDetail: React.FC = () => {
    const router = useRouter()
    // read | edit | share
    const pageType = router.params.type
    const fittingId = router.params.id

    // connect Store
    const { fittingDetail, user } = useSelector((state) => {
        return { fittingDetail: state.fittingDetail, user: state.user }
    }) as State
    const dispatch = useDispatch()

    // 分享页进入 从 server 获取数据
    useEffect(() => {
        if (pageType === 'share') {
            Taro.showLoading({ title: '加载中...', mask: true })
            // reset
            dispatch(fittingDetailActions.resetFittingDetail())
            // query
            queryFittingById(fittingId)
                .then((result) => {
                    dispatch(fittingDetailActions.setFittingDetail(result))
                    Taro.hideLoading()
                })
                .catch(() => {
                    Taro.hideLoading()
                    Taro.showModal({
                        content: '网络或者服务器异常，请稍后再试。',
                        showCancel: false,
                    })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fittingId, pageType])

    // 微信分享 相关
    useShareAppMessage(() => {
        return {
            title: fittingDetail.title,
            path: `/pages/fittingDetail/fittingDetail?id=${fittingDetail.id}&type=share`,
        }
    })
    Taro.showShareMenu({
        withShareTicket: true,
        showShareItems: ['wechatFriends'],
    })

    // 编辑方案
    const buttonEditorHandle = () => {
        dispatch(fittingEditorActions.setFittingEditor(fittingDetail))
        Taro.redirectTo({
            url: '/pages/fittingEditor/fittingEditor?type=edit',
        })
    }

    return (
        <View className='fitting-detail'>
            <NavBar />
            {fittingDetail.id && (
                <React.Fragment>
                    <View className='detail-top'>
                        <View className='detail-top__bg'>
                            <Image
                                className='detail-top__commander'
                                src={getCommanderImage(fittingDetail.commanderName, fittingDetail.nation)}
                            />
                            <Image className='detail-top__ship' src={getShipImage(fittingDetail.shipId)} />
                        </View>
                    </View>
                    <View className='detail-content'>
                        <View className='detail-content__section section detail-content__main'>
                            <View className='section__line'>
                                <View className='section__line-label'>方案</View>
                                <View className='section__line-content'>{fittingDetail.title}</View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>战舰</View>
                                <View className='section__line-content'>{shipNameLocalize(fittingDetail.shipId)}</View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>舰长</View>
                                <View className='section__line-content'>
                                    {commanderNameLocalize(fittingDetail.commanderName)}
                                </View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>作者</View>
                                <View className='section__line-content'>{fittingDetail.authorNickName}</View>
                            </View>
                        </View>
                        <View className='detail-content__section section detail-content__skill'>
                            <View className='section__title'>
                                <View className='section__title-content'>舰长技能</View>
                                <View className='section__title-ext'>Tips: 以下数据为基础加成</View>
                            </View>
                            <View className='section__skill-list'>
                                {fittingDetail.commanderSkill.map((skillId) => {
                                    const skill = getSkillbyId(skillId)
                                    return skill && <SkillItem key={skill.sort} skill={skill} itemType='static' />
                                })}
                            </View>
                        </View>
                        <View className='detail-content__section section detail-content__description'>
                            <View className='section__title'>装配思路</View>
                            <View className='section__description'>{fittingDetail.description}</View>
                        </View>
                        <View className='detail-content__section section detail-content__time'>
                            <View className='section__title'>更新时间</View>
                            <View className='section__time'>{new Date(fittingDetail.modifyDate).toLocaleString()}</View>
                        </View>
                    </View>
                    {pageType === 'edit' && user.openId === fittingDetail.authorOpenId && (
                        <View className='detail-button'>
                            <Button className='common-button common-button--primary' onClick={buttonEditorHandle}>
                                编辑装配方案
                            </Button>
                        </View>
                    )}
                </React.Fragment>
            )}
        </View>
    )
}

export default FittingDetail
