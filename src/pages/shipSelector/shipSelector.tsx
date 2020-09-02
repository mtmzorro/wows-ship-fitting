import React, {useState, useEffect} from 'react'
import { View, Button, Text, Image } from "@tarojs/components";
import { Ship,ShipSpecies,Nation } from '../../type/types';
import {
    getShips,
    getShipsByNation,
    getShipsBySpecies,
    getShipsByTier,
    getShipImageById,
} from "../../service/ship";


interface Props {
    name: string
}

const ShipSelector: React.FC<Props> = (props) => {
    const [shipData, setShipData] = useState<Ship[]>([])

    useEffect(() => {
        const result = getShips()
        if (result) {
            setShipData(result)
            console.log(result)
        }
    }, [])

    const buttonClickHandle = () =>{
        Taro.navigateTo({
            url: 'pages/fittingEditor/fittingEditor?id=12312s'
        })
    }

    return (
        <View>
            <View>hello</View>
            <View>
                <Button onClick={buttonClickHandle}>编辑装配方案</Button>
                <View>{  }</View>
            </View>
        </View>
    )
}

export default ShipSelector