import React, { memo, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import {
    skillNameLocalize,
    skillDescriptionLocalize,
    skillPerksLocalize,
} from '../../../utils/localization'
import { SkillData } from '../skillSelector'
import { getSkillImage } from '../../../service/skill'

interface Props {
    skill: SkillData
    onSelect: (skill: SkillData) => void
}

const SkillItem: React.FC<Props> = (props) => {
    const { skill, onSelect } = props
    const classNames = classnames('skill-item', {
        'skill-item--selected': skill.selected,
    })

    const handleSkillPrek = (prek: string) => {
        Taro.showModal({
            title: '技能加成',
            content: prek,
            showCancel: false,
        })
    }

    return useMemo(
        () => (
            <View
                className={classNames}
                onClick={onSelect.bind(this, skill)}
                onLongPress={handleSkillPrek.bind(this, skillPerksLocalize(skill.id))}
            >
                <View className='skill-item__icon'>
                    <Image className='icon__image' lazyLoad src={getSkillImage(skill.id)} />
                    <View className='icon__sort'>{skill.sort}</View>
                </View>
                <View className='skill-item__content'>
                    <View className='content__name'>{skillNameLocalize(skill.id)}</View>
                    <View className='content__des'>
                        <View className='content__des-text'>
                            {skillDescriptionLocalize(skill.id)}
                        </View>
                        {/* <View className='content__des-prek'>{skillPerksLocalize(skill.id)}</View> */}
                    </View>
                </View>
            </View>
        ),
        [skill.selected]
    )
}

export default SkillItem
