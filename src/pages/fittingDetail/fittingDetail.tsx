import React from 'react'
import { View, Button, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { Fitting, User } from '../../type/types'
import { getCommanderImage } from '../../service/commander'
import { getShipImage } from '../../service/ship'
import { getSkillbyId } from '../../service/skill'
import { commanderNameLocalize, shipNameLocalize } from '../../utils/localization'
import SkillItem from '../../components/skillItem/skillItem'
import { actions } from '../../reducers/fittingEditor'
import './fittingDetail.scss'

interface State {
    fittingDetail: Fitting
    user: User
}

const FittingDetail: React.FC = () => {
    const router = useRouter()
    // read | edit 
    const pageType = router.params.type

    // connect Store
    const { fittingDetail, user } = useSelector((state) => {
        return { fittingDetail: state.fittingDetail, user: state.user }
    }) as State
    const dispatch = useDispatch()

    const buttonEditorHandle = () => {
        dispatch(actions.setFittingEditor(fittingDetail))
        Taro.redirectTo({
            url: '/pages/fittingEditor/fittingEditor?type=edit',
        })
    }

    // 配置微信分享
    Taro.showShareMenu({
        withShareTicket: true,
    })

    return (
        <View className='fitting-detail'>
            {fittingDetail.title && (
                <React.Fragment>
                    <View className='detail-top'>
                        <View className='detail-top__bg'>
                            <Image
                                className='detail-top__commander'
                                src={getCommanderImage(
                                    fittingDetail.commanderName,
                                    fittingDetail.nation
                                )}
                            />
                            <Image
                                className='detail-top__ship'
                                src={getShipImage(fittingDetail.shipId)}
                            />
                        </View>
                    </View>
                    <View className='detail-content'>
                        <View className='detail-content__section section'>
                            <View className='section__line'>
                                <View className='section__line-label'>方案</View>
                                <View className='section__line-content'>{fittingDetail.title}</View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>战舰</View>
                                <View className='section__line-content'>
                                    {shipNameLocalize(fittingDetail.shipId)}
                                </View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>舰长</View>
                                <View className='section__line-content'>
                                    {commanderNameLocalize(fittingDetail.commanderName)}
                                </View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>作者</View>
                                <View className='section__line-content'>
                                    {fittingDetail.authorNickName}
                                </View>
                            </View>
                        </View>
                        <View className='detail-content__section section'>
                            <View className='section__title'>
                                <View className='section__title-content'>舰长技能</View>
                                <View className='section__title-ext'>Tips: 以下数据为基础加成</View>
                            </View>
                            <View className='section__skill-list'>
                                {fittingDetail.commanderSkill.map((skillId) => {
                                    const skill = getSkillbyId(skillId)
                                    return (
                                        skill && (
                                            <SkillItem
                                                key={skill.sort}
                                                skill={skill}
                                                itemType='static'
                                            />
                                        )
                                    )
                                })}
                            </View>
                        </View>
                        <View className='detail-content__section section'>
                            <View className='section__title'>装配思路</View>
                            <View className='section__description'>
                                {fittingDetail.description}
                            </View>
                        </View>
                        <View className='detail-content__section section'>
                            <View className='section__title'>更新时间</View>
                            <View className='section__time'>
                                {new Date(fittingDetail.modifyDate).toLocaleString()}
                            </View>
                        </View>
                    </View>
                    {pageType === 'edit' && user.openId === fittingDetail.authorOpenId && (
                        <View className='detail-button'>
                            <Button
                                className='common-button common-button--primary'
                                onClick={buttonEditorHandle}
                            >
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
