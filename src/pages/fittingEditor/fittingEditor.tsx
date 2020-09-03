import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image, Label, Input, Textarea } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { shipNameLocalize } from '../../utils/localization'
import { Fitting } from '../../type/types'
import { setFittingEditor } from '../../actions/fittingEditor'

const FittingEditor: React.FC = () => {
    // connect store
    const {
        id,
        createDate,
        modifyDate,
        shipId,
        title,
        author,
        commanderId,
        commanderSkill,
        description,
        upgrade,
    } = useSelector((state) => state.fittingEditor) as Fitting
    const dispatch = useDispatch()

    const handleShipSelector = () => {
        Taro.navigateTo({ url: '/pages/shipSelector/shipSelector' })
    }

    // save
    const handleSave = () => {
        dispatch(
            setFittingEditor({
                id: new Date().getTime(),
                createDate: new Date().getTime(),
                modifyDate: new Date().getTime(),
                author: 'mtmzorro',
                commanderId: 'haru',
                commanderSkill: [1, 2, 3],
                upgrade: [2, 3, 4],
                title: '测试数据',
                description: '测试描述内容内容',
                shipId: shipId,
            })
        )
    }

    return (
        <View>
            <View className='preview'>
                <View className='ship'></View>
                <View className='commander'></View>
            </View>
            <View>
                <Label>选择战舰</Label>
                {shipId ? (
                    shipNameLocalize(shipId)
                ) : (
                    <Button onClick={handleShipSelector}>点击选择</Button>
                )}
            </View>
            <View>
                <Label>选择舰长</Label>
                {commanderId ? commanderId : <Button>点击选择</Button>}
                <Button>点击选择</Button>
            </View>
            <View>
                <Label>舰长技能</Label>
                {commanderSkill.length > 0 && commanderSkill}
                <Button>点击编辑</Button>
            </View>
            <View>
                <Label>舰船配件</Label>
                {upgrade.length > 0 && upgrade}
                <Button>点击编辑</Button>
            </View>
            <View>
                <Label>配置说明</Label>
                <Input placeholder='配置名称' value={title}></Input>
                <Textarea placeholder='战舰装配理念' value={description}></Textarea>
            </View>
            <Button onClick={handleSave}>保存装配方案</Button>
        </View>
    )
}

export default FittingEditor
