import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { getSkills } from '../../service/skill'
import SkillItem from './skillItem/skillItem'
import { Skill } from '../../type/types'
import { actions } from '../../reducers/fittingEditor'

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

    const [skillList, setSkillList] = useState<SkillData[]>(skillInitData)
    const [skillCostRemain, setSkillCostRemain] = useState(19)

    const skillSelectedRef = useRef<string[][]>([[], [], [], []])
    const skillCostRemainRef = useRef(19)

    // skill selected
    const handleSelect = (skill: SkillData) => {
        
        if (!skill.selected) {
            // 选择技能 增加
            console.log('skillCostRemain selected', skillCostRemainRef.current - skill.cost)
            if (skillCostRemainRef.current - skill.cost < 0) {
                Taro.showToast({
                    title: '已无可用技能点',
                    duration: 1000,
                })
                return
            }
            // 技能选择需要先选择上一级前置
            if (skill.cost > 1 && skillSelectedRef.current[skill.cost - 2].length === 0) {
                Taro.showToast({
                    title: '请先选择上一级技能',
                    duration: 1000,
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
            if (item.id === skill.id) {
                item.selected = !item.selected
            }
            return item
        })
        setSkillList(newSkillList)
        setSkillCostRemain(skillCostRemainRef.current)
    }

    const handleStoreSkill = () => {
        dispatch(actions.setCommanderSkill(skillSelectedRef.current))
        Taro.navigateBack({ delta: 1 })
    }

    // const handleSelector

    return (
        <View>
            <View>剩余技能点：{skillCostRemain}</View>
            <View>当前选择技能：{console.log(skillSelectedRef.current)}</View>

            {/* <View onClick={handleStateTest}>test state</View> */}
            <View>
                {skillList.map((skill) => {
                    return <SkillItem key={skill.sort} skill={skill} onSelect={handleSelect} />
                })}
            </View>
            <Button onClick={handleStoreSkill}>确认技能</Button>
        </View>
    )
}

export default SkillSelector
