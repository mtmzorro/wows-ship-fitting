import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image, ScrollView } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { getSkills } from '../../service/skill'
import SkillItem from '../../components/skillItem/skillItem'
import { Skill } from '../../type/types'
import { actions } from '../../reducers/fittingEditor'
import './skillSelector.scss'

export type SkillData = Skill & { selected: boolean }

const SkillSelector: React.FC = () => {
    // skillList Init Data Memo
    const skillInitData = useMemo(() => {
        return getSkills().common.map((item) => {
            item['selected'] = false
            return item
        }) as SkillData[]
    }, [])

    const dispatch = useDispatch()

    const [skillList, setSkillList] = useState<SkillData[]>([...skillInitData])
    const [skillCostRemain, setSkillCostRemain] = useState(19)

    const skillSelectedRef = useRef<string[][]>([[], [], [], []])
    const skillCostRemainRef = useRef(19)
    const skillCostLevelRef = useRef([1, 2, 3, 4])

    // skill selected
    const handleSelect = (skill: SkillData) => {
        if (!skill.selected) {
            // 选择技能 增加
            if (skillCostRemainRef.current - skill.cost < 0) {
                Taro.showToast({
                    title: '已无可用技能点',
                    duration: 1000,
                    icon: 'none',
                })
                return
            }
            // 技能选择需要先选择上一级前置
            if (skill.cost > 1 && skillSelectedRef.current[skill.cost - 2].length === 0) {
                Taro.showToast({
                    title: '请先选择上一级技能',
                    duration: 1000,
                    icon: 'none',
                })
                return
            }
            // if (skill.cost)
            skillSelectedRef.current[skill.cost - 1].push(skill.id)
            skillCostRemainRef.current -= skill.cost
        } else {
            // 取消技能 移除
            // 技能取消需要下一级没有已选技能 && 当前级别只有一个已选
            if (
                skill.cost < 4 &&
                skillSelectedRef.current[skill.cost].length !== 0 &&
                skillSelectedRef.current[skill.cost - 1].length === 1
            ) {
                Taro.showToast({
                    title: '有已选的高级技能，请先取消',
                    duration: 1000,
                    icon: 'none',
                })
                return
            }
            skillSelectedRef.current[skill.cost - 1] = skillSelectedRef.current[
                skill.cost - 1
            ].filter((item) => {
                return item !== skill.id
            })

            skillCostRemainRef.current += skill.cost
        }

        // set state update UI
        const newSkillList = skillList.map((item) => {
            // 更新已选技能状态
            if (item.id === skill.id) {
                item.selected = !item.selected
            }
            return item
        })
        setSkillList(newSkillList)
        setSkillCostRemain(skillCostRemainRef.current)
    }

    const handleResetSkill = () => {
        const newSkillList = skillList.map((item) => {
            item.selected = false
            return item
        })
        setSkillList(newSkillList)
        setSkillCostRemain(19)
        skillSelectedRef.current = [[], [], [], []]
        skillCostRemainRef.current = 19
    }

    const handleStoreSkill = () => {
        const skillArray = skillSelectedRef.current.reduce((all, cur) => {
            return typeof cur === 'object' ? [...all, ...cur] : [...all, cur]
        }, [])
        dispatch(actions.setCommanderSkill(skillArray))
        Taro.navigateBack({ delta: 1 })
    }

    // const handleSelector

    return (
        <View className='skill-selector'>
            <View className='selector-state'>
                <View className='selector-state__content'>剩余技能点：{skillCostRemain}</View>
                <View className='selector-state__ext'>
                    <Button
                        className='common-button common-button--primary common-button--small'
                        size='mini'
                        onClick={handleResetSkill.bind(this)}
                    >
                        重置
                    </Button>
                </View>
            </View>
            <ScrollView className='skill-selector__scroll' scrollY scrollWithAnimation>
                <View className='skill-selector__scroll-wrap'>
                    {skillCostLevelRef.current.map((cost) => {
                        return (
                            <View key={cost}>
                                <View className='section-title'>
                                    <View className='section-title__sub'>Cost - {cost}</View>
                                    <View className='section-title__content'>
                                        {cost}点技能消耗
                                    </View>
                                </View>
                                <View className='skill-list'>
                                    {skillList.map((skill) => {
                                        if (skill.cost === cost) {
                                            return (
                                                <SkillItem
                                                    key={skill.sort}
                                                    itemType='interactive'
                                                    skill={skill}
                                                    onSelect={handleSelect}
                                                />
                                            )
                                        }
                                    })}
                                </View>
                            </View>
                        )
                    })}

                    <Button
                        className='common-button common-button--primary'
                        onClick={handleStoreSkill}
                    >
                        保存技能选择
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

export default SkillSelector
