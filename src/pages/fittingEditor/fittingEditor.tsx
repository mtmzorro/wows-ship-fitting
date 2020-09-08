import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image, Label, Input, Textarea, Form } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { shipNameLocalize, commanderNameLocalize } from '../../utils/localization'
import { Fitting, User } from '../../type/types'
import { saveFitting, checkUserInfoSetting, getUserInfo } from '../../service/common'

interface State {
    fittingEditor: Fitting
    user: User
}

const FittingEditor: React.FC = () => {
    // connect store
    const { fittingEditor, user } = useSelector((state) => {
        return { fittingEditor: state.fittingEditor, user: state.user }
    }) as State
    const dispatch = useDispatch()

    const [inputTitle, setInputTitle] = useState<string>(fittingEditor.title)
    const [inputDescription, setInputDescription] = useState<string>(fittingEditor.description)

    useEffect(() => {
        checkUserInfoSetting()
    }, [])

    const handleShipSelector = () => {
        Taro.navigateTo({ url: '/pages/shipSelector/shipSelector' })
    }

    const handleCmdrSelector = () => {
        Taro.navigateTo({ url: '/pages/cmdrSelector/cmdrSelector' })
    }

    const handleSkillSelector = () => {
        Taro.navigateTo({ url: '/pages/skillSelector/skillSelector' })
    }


    // save
    const handleSave = () => {
        const cache = {
            authorNickName: user.nickName,
            authorOpenId: user.openId,
            commanderName: fittingEditor.commanderName,
            commanderSkill: fittingEditor.commanderSkill,
            upgrade: [],
            title: inputTitle,
            description: inputDescription,
            shipId: fittingEditor.shipId,
        }
        // dispatch(setFittingEditor(cache))
        saveFitting(cache)
            .then((result) => {
                console.log('FittingEditor save success')
            })
            .catch((error) => {
                console.log('FittingEditor save error')
            })
    }

    return (
        <View>
            {console.log('FittingEditor render')}
            <View className='user'>
                <View className='ship'>
                    {user.openId} - {user.nickName}
                </View>
                <View className='commander'></View>
            </View>
            <View className='preview'>
                <View className='ship'></View>
                <View className='commander'></View>
            </View>
            <View>
                <Label>选择战舰</Label>
                {fittingEditor.shipId ? (
                    shipNameLocalize(fittingEditor.shipId)
                ) : (
                    <Button onClick={handleShipSelector}>点击选择</Button>
                )}
            </View>
            <View>
                <Label>选择舰长</Label>
                {fittingEditor.commanderName ? (
                    commanderNameLocalize(fittingEditor.commanderName)
                ) : (
                    <Button onClick={handleCmdrSelector}>点击选择</Button>
                )}
            </View>
            <View>
                <Label>舰长技能</Label>
                {fittingEditor.commanderSkill.length > 0 && fittingEditor.commanderSkill}
                <Button onClick={handleSkillSelector}>点击编辑</Button>
            </View>
            <View>
                <Label>舰船配件</Label>
                {fittingEditor.upgrade.length > 0 && fittingEditor.upgrade}
                <Button>点击编辑</Button>
            </View>
            <View>
                <Label>配置说明</Label>
                <Input
                    id='title'
                    name='title'
                    placeholder='配置名称'
                    value={inputTitle}
                    onInput={(e: any) => setInputTitle(e.target.value)}
                ></Input>
                <Textarea
                    id='description'
                    name='description'
                    placeholder='战舰装配思路（如配件选择）'
                    value={inputDescription}
                    onInput={(e: any) => setInputDescription(e.target.value)}
                ></Textarea>
            </View>
            <Button onClick={handleSave}>保存装配方案</Button>
        </View>
    )
}

export default FittingEditor
