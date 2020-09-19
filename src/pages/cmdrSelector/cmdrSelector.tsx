import React, { useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { Commander, Nation } from '../../type/types'
import { getCommandersByNation, getCommanderImage } from '../../service/commander'
import { commanderNameLocalize } from '../../utils/localization'
import { actions } from '../../reducers/fittingEditor'
import './cmdrSelector.scss'

const ShipSelector: React.FC = () => {
    // connect store
    const curNation = useSelector((state) => state.fittingEditor.nation) as Nation
    const dispatch = useDispatch()

    // const [curNation, setCurNation] = useState<Nation | null>(null)
    const [curCmdrList, setCurCmdrList] = useState<Commander[]>([])

    // dispatch to fittingEditor
    const handleCmdrSelect = (commander: Commander) => {
        dispatch(actions.setCommanderName(commander.name))
        Taro.navigateBack({ delta: 1 })
    }

    // 依赖 curNation 国家选择，查询舰长列表
    useEffect(() => {
        if (!curNation) {
            return
        }
        const result = getCommandersByNation(curNation)
        setCurCmdrList(result)
    }, [curNation])

    return (
        <View className='commander-selector'>
            <View className='section-title'>
                <View className='section-title__sub'>Commander Selector</View>
                <View className='section-title__content'>舰长选择器</View>
            </View>
            <View className='selector-list'>
                {curCmdrList.length > 0 &&
                    curCmdrList.map((commander) => {
                        return (
                            <View
                                className='selector-list__item'
                                key={commander.name}
                                onClick={handleCmdrSelect.bind(this, commander)}
                            >
                                <View className='item__image'>
                                    <Image
                                        className='item__image-ship'
                                        lazyLoad
                                        src={getCommanderImage(commander.name, commander.nation)}
                                    />
                                </View>
                                <View className='item__text'>
                                    {commanderNameLocalize(commander.name)}
                                </View>
                            </View>
                        )
                    })}
            </View>
        </View>
    )
}

export default ShipSelector
