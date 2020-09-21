import React, { useState, useEffect, useMemo } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { Fitting, User } from '../../type/types'
import { getFittingById } from '../../service/common'
import { getCommanderImage } from '../../service/commander'
import { getShipImage } from '../../service/ship'
import { getSkillbyId } from '../../service/skill'
import { commanderNameLocalize, shipNameLocalize } from '../../utils/localization'
import SkillItem from '../../components/skillItem/skillItem'
import { actions } from '../../reducers/fittingEditor'
import './fittingDetail.scss'

const FittingDetail: React.FC = () => {
    const router = useRouter()
    // connect Store
    const user: User = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [fitting, setFitting] = useState<Fitting>({} as Fitting)

    // 根据路由 id 获取方案数据
    useEffect(() => {
        getFittingById(router.params.id).then((result) => {
            setFitting(result)
        })
    }, [router.params])

    const buttonEditorHandle = () => {
        dispatch(actions.setFittingEditor(fitting))
        Taro.redirectTo({
            url: '/pages/fittingEditor/fittingEditor?id=12312s',
        })
    }

    const skillList = useMemo(() => {
        if (fitting.commanderSkill) {
            return fitting.commanderSkill.reduce((all, cur) => {
                return typeof cur === 'object' ? [...all, ...cur] : [...all, cur]
            }, [])
        } else {
            return fitting.commanderSkill
        }
    }, [fitting.commanderSkill]) as string[] | undefined

    // 配置微信分享
    Taro.showShareMenu({
        withShareTicket: true,
    })

    return (
        <View className='fitting-detail'>
            {fitting.title && (
                <React.Fragment>
                    <View className='detail-top'>
                        <View className='detail-top__bg'>
                            <Image
                                className='detail-top__commander'
                                src={getCommanderImage(fitting.commanderName, fitting.nation)}
                            />
                            <Image
                                className='detail-top__ship'
                                src={getShipImage(fitting.shipId)}
                            />
                        </View>
                    </View>
                    <View className='detail-content'>
                        <View className='detail-content__section section'>
                            <View className='section__line'>
                                <View className='section__line-label'>方案</View>
                                <View className='section__line-content'>{fitting.title}</View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>战舰</View>
                                <View className='section__line-content'>
                                    {shipNameLocalize(fitting.shipId)}
                                </View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>舰长</View>
                                <View className='section__line-content'>
                                    {commanderNameLocalize(fitting.commanderName)}
                                </View>
                            </View>
                            <View className='section__line'>
                                <View className='section__line-label'>作者</View>
                                <View className='section__line-content'>
                                    {fitting.authorNickName}
                                </View>
                            </View>
                        </View>
                        <View className='detail-content__section section'>
                            <View className='section__title'>
                                <View className='section__title-content'>舰长技能</View>
                                <View className='section__title-ext'>Tips: 以下数据为基础加成</View>
                            </View>
                            <View className='section__skill-list'>
                                {skillList &&
                                    skillList.map((skillId) => {
                                        const skill = getSkillbyId(skillId)
                                        return skill && <SkillItem key={skill.sort} skill={skill} itemType='static' />
                                    })}
                            </View>
                        </View>
                        <View className='detail-content__section section'>
                            <View className='section__title'>装配思路</View>
                            <View className='section__description'>{fitting.description}</View>
                        </View>
                        <View className='detail-content__section section'>
                            <View className='section__title'>更新时间</View>
                            <View className='section__time'>
                                {fitting.modifyDate.toLocaleString()}
                            </View>
                        </View>
                    </View>
                    {user.openId === fitting.authorOpenId && (
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
