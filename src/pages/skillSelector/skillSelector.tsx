import React, { useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { getSkills } from '../../service/skill'
import {
    skillNameLocalize,
    skillDescriptionLocalize,
    skillPerksLocalize,
} from '../../utils/localization'

// const nationList = getNationList() as Nation[]
const SkillList = getSkills()

const SkillSelector: React.FC = () => {


    return (
        <View>
            <View>当前选择技能：</View>
            <View>
                {SkillList.common.map((skill) => {
                    return (
                        <View key={skill.sort}>
                            <Text>
                                {skill.sort} - {skillNameLocalize(skill.id)}
                            </Text>
                            <View>{skillDescriptionLocalize(skill.id)}</View>
                            <View>{skillPerksLocalize(skill.id)}</View>
                            <View>----</View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default SkillSelector
