import React, { memo, useMemo } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import {
    skillNameLocalize,
    skillDescriptionLocalize,
    skillPerksLocalize,
} from '../../../utils/localization'
import { SkillData } from '../skillSelector'
import './skillItem.scss'

interface Props {
    skill: SkillData
    onSelect: (skill: SkillData) => void
}

const SkillItem: React.SFC<Props> = (props) => {
    const { skill, onSelect } = props
    const classNames = classnames('skill-item', {
        'skill-item-selected': skill.selected 
    })

    return useMemo(() => (
        <View className={classNames} onClick={() => { onSelect(skill) }}>
            {console.log('skill-item render')}
            <Text>
                {skill.sort} - {skillNameLocalize(skill.id)}
            </Text>
            {/* <View>{skillDescriptionLocalize(skill.id)}</View>
            <View>{skillPerksLocalize(skill.id)}</View> */}
            <View>----</View>
        </View>
    ), [skill.selected])
}

export default SkillItem
