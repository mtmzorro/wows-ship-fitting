import React, {useState, useEffect} from 'react'
import { View, Button, Text, Image } from "@tarojs/components";

interface Props {
    name: string
}

const Fitting: React.FC<Props> = (props) => {
    const [ship, setShip] = useState('')

    useEffect(() => {
        setShip('这是 XX 号')
    }, [])

    const buttonClickHandle = () =>{
        Taro.navigateTo({
            url: '/pages/fittingEditor/fittingEditor?id=12312s'
        })
    }

    return (
        <View>
            <View>hello</View>
            <View>
                <Button onClick={buttonClickHandle}>编辑装配方案</Button>
                <View>{ ship }</View>
            </View>
        </View>
    )
}

export default Fitting