import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image, Label, Input, Textarea, Form } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { shipNameLocalize } from '../../utils/localization'
import { Fitting } from '../../type/types'
import { saveFitting } from '../../service/common'
import { actions } from '../../reducers/fittingEditor'
import useDebouce from '../../utils/useDebouce'

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

    const [inputTitle, setInputTitle] = useState<string>(title)
    const [inputDescription, setInputDescription] = useState<string>(description)
    const debouceTitle = useDebouce(inputTitle)
    const debouceDescription = useDebouce(inputDescription)

    // 同步至 store 中
    useEffect(() => {
        const cache = {
            title: inputTitle,
            description: inputDescription,
        }
        dispatch(actions.setFittingEditor(cache))
    }, [debouceTitle, debouceDescription])

    const handleShipSelector = () => {
        Taro.navigateTo({ url: '/pages/shipSelector/shipSelector' })
    }

    // save
    const handleSave = () => {
        const cache = {
            id: new Date().getTime(),
            createDate: new Date().getTime(),
            modifyDate: new Date().getTime(),
            author: 'mtmzorro',
            commanderId: 'haru',
            commanderSkill: [1, 2, 3],
            upgrade: [2, 3, 4],
            title: title,
            description: description,
            shipId: shipId,
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
                    placeholder='战舰装配理念'
                    value={inputDescription}
                    onInput={(e: any) => setInputDescription(e.target.value)}
                ></Textarea>
            </View>
            <Button onClick={handleSave}>保存装配方案</Button>
        </View>
    )
}

export default FittingEditor
