import React, { useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'
import {
    skillNameLocalize,
    skillDescriptionLocalize,
    skillPerksLocalize,
} from '../../utils/localization'
import { getSkillImage } from '../../service/skill'
import './skillItem.scss'

type SkillData = Skill & { selected?: boolean }

interface Props {
    // static 静态技能模块 | interactive 可点击交互选择模块
    itemType: 'static' | 'interactive'
    skill: SkillData
    onSelect?: (skill: SkillData) => void
}

const SkillItem: React.FC<Props> = (props) => {
    const { itemType, skill, onSelect } = props

    // 长按显示技能详情
    const handleSkillPrek = (prek: string) => {
        Taro.showModal({
            title: '技能加成',
            content: prek,
            showCancel: false,
        })
    }

    // interactive 型 增加事件
    const handlePressEvent =
        itemType === 'interactive'
            ? {
                  onClick: onSelect && onSelect.bind(this, skill),
                  // 长按显示技能详情
                  onLongPress: handleSkillPrek.bind(this, skillPerksLocalize(skill.id)),
              }
            : {}

    const classNames = classnames('skill-item', {
        'skill-item--selected': skill.selected,
        'skill-item--active': itemType === 'interactive',
        [`skill-item--${itemType}`]: itemType,
    })

    return useMemo(
        () => (
            <View className={classNames} {...handlePressEvent}>
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
                        {itemType === 'static' && (
                            <View className='content__des-prek'>
                                {skillPerksLocalize(skill.id)}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [skill.selected, skill.id]
    )
}

SkillItem.defaultProps = {
    itemType: 'interactive',
}

export default SkillItem
