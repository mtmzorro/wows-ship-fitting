import React, {useState, useEffect, useCallback} from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from "@tarojs/components";
import { useSelector, useDispatch } from 'react-redux'
import { Ship, ShipSpecies, Nation } from '../../type/types';
import {
    getShipsByNation,
    getNationList,
    getShipSpeciesList,
} from "../../service/ship";
import ShipItem from './shipItem'
import { actions } from '../../reducers/fittingEditor';

const nationList = getNationList() as Nation[]
const shipSpeciesList = getShipSpeciesList() as ShipSpecies[]

const ShipSelector: React.FC = () => {

    // connect store
    // const shipId = useSelector(state => state.fittingEditor.shipId)
    const dispatch = useDispatch()
    
    const [curNation, setCurNation] = useState<Nation | null>(null)
    const [curShipSpecies, setShipSpecies] = useState<ShipSpecies | null>(null)
    const [curShipList, setCurShipList] = useState<Ship[]>([])

    const handleNationSelect = (nation: Nation) => {
        setCurNation(nation)
    }

    const handleShipSpeciesSelect = (shipSpecies: ShipSpecies) => {
        setShipSpecies(shipSpecies)
    }

    // dispatch to fittingEditor
    const handleShipSelect = useCallback((ship: Ship) => {
        dispatch(actions.setShipId(ship.id))
        Taro.redirectTo({url: '/pages/fittingEditor/fittingEditor'})
    }, [dispatch])

    // curShipSpecies 最终更新，查询舰船列表
    useEffect(() => {
        if (!curShipSpecies || !curNation) {
            return
        }

        let result = getShipsByNation(curNation)
        result = result.filter((item) => {
            return item.species === curShipSpecies
        }).sort((a, b) => {
            return a.tier - b.tier
        })

        setCurShipList(result)
    }, [curShipSpecies])

    return (
        <View>
            <View>
                当前选择国家：{curNation}，舰船类别：{curShipSpecies}
            </View>
            <View>
                {!curNation && (
                    <View>
                        {nationList.map((nation) => {
                            return <View key={nation} onClick={handleNationSelect.bind(this, nation)}>{nation} - 国旗</View>;
                        })}
                    </View>
                )}
            </View>
            <View>
                {curNation && (
                    <View>
                        {shipSpeciesList.map((species) => {
                            return <View key={species} onClick={handleShipSpeciesSelect.bind(this, species)}>{species} - 分类</View>;
                        })}
                    </View>
                )}
            </View>
            <View>
                {curShipList.length > 0 && (
                    <View>
                        {curShipList.map((ship) => {
                            return <ShipItem key={ship.id} ship={ship} onSelect={handleShipSelect} />
                        })}
                    </View>
                )}
            </View>
        </View>
    );
}

export default ShipSelector