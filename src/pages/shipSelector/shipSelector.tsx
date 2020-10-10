import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import { useDispatch } from 'react-redux'
import { getShipsByNation, getShipImage } from '../../service/ship'
import { getNationList, getShipSpeciesList } from '../../service/common'
import { actions } from '../../reducers/fittingEditor'
import {
    shipNameLocalize,
    tierLocalize,
    nationLocalize,
    shipSpeciesLocalize,
} from '../../utils/localization'
import './shipSelector.scss'

const nationList = getNationList() as Nation[]
const shipSpeciesList = getShipSpeciesList() as ShipSpecies[]

const ShipSelector: React.FC = () => {
    // connect store
    // const shipId = useSelector(state => state.fittingEditor.shipId)
    const dispatch = useDispatch()

    const [curNation, setCurNation] = useState<Nation | string>('')
    const [curShipSpecies, setShipSpecies] = useState<ShipSpecies | string>('')
    const [curShipList, setCurShipList] = useState<Ship[]>([])

    const handleNationSelect = (nation: Nation) => {
        setCurNation(nation)
    }

    const handleShipSpeciesSelect = (shipSpecies: ShipSpecies) => {
        setShipSpecies(shipSpecies)
    }

    const handleReset = () => {
        setCurNation('')
        setShipSpecies('')
        setCurShipList([])
    }

    // dispatch to fittingEditor
    const handleShipSelect = (ship: Ship) => {
        dispatch(actions.saveShipSelector(ship))
        // back to fittingEditor
        Taro.navigateBack({ delta: 1 })
    }

    // curShipSpecies 最终更新，查询舰船列表
    useEffect(() => {
        if (!curShipSpecies || !curNation) {
            return
        }

        let result = getShipsByNation(curNation as Nation)
        result = result
            .filter((item) => {
                return item.species === curShipSpecies
            })
            .sort((a, b) => {
                return  b.tier - a.tier
            })

        setCurShipList(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curShipSpecies])

    return (
        <View className='ship-selector'>
            <View className='section-title'>
                <View className='section-title__sub'>Ship Selector</View>
                <View className='section-title__content'>舰船选择器</View>
            </View>
            <View className='selector-state'>
                <View className='selector-state__content'>
                    当前选择：
                    {curNation && nationLocalize(curNation)}{' '}
                    {curShipSpecies && `> ${shipSpeciesLocalize(curShipSpecies)}`}
                </View>
                <View className='selector-state__ext'>
                    <Button
                        className='common-button common-button--primary common-button--small'
                        size='mini'
                        onClick={handleReset.bind(this)}
                    >
                        重置
                    </Button>
                </View>
            </View>
            <View className='selector-list'>
                {!curNation && (
                    <View className='selector-list__wrap'>
                        {nationList.map((nation) => {
                            return (
                                <View
                                    className='selector-list__item'
                                    key={nation}
                                    onClick={handleNationSelect.bind(this, nation)}
                                >
                                    <View className='item__text'>{nationLocalize(nation)}</View>
                                    <View className='item__ext'>
                                        <View className='iconfont icon-arrow-right'></View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                )}
                {curNation && curShipList.length === 0 && (
                    <View className='selector-list__wrap'>
                        {shipSpeciesList.map((species) => {
                            return (
                                <View
                                    className='selector-list__item'
                                    key={species}
                                    onClick={handleShipSpeciesSelect.bind(this, species)}
                                >
                                    <View className='item__text'>
                                        {shipSpeciesLocalize(species)}
                                    </View>
                                    <View className='item__ext'>
                                        <View className='iconfont icon-arrow-right'></View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                )}
                {curShipList.length > 0 && (
                    <View className='selector-list__wrap'>
                        {console.log(curShipList)}
                        {curShipList.map((ship) => {
                            return (
                                <View
                                    className='selector-list__item ship-list'
                                    key={ship.id}
                                    onClick={handleShipSelect.bind(this, ship)}
                                >
                                    <View className='item__text'>
                                        T-{tierLocalize(ship.tier)} {shipNameLocalize(ship.id)}
                                    </View>
                                    <View className='item__ext'>
                                        <Image className='item__ext-ship' lazyLoad src={getShipImage(ship.id)} />
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                )}
            </View>
        </View>
    )
}

export default ShipSelector
