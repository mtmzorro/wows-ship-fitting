import React, {useState, useEffect} from 'react'
import Taro from "@tarojs/taro";
import { View, Button, Text, Image, Label, Input, Textarea } from "@tarojs/components";

interface Props {
    // name: string
}

const FittingEditor: React.FC<Props> = (props) => {
    const [ship, setShip] = useState('')

    useEffect(() => {
        setShip('这是 XX 号')
    }, [])

    const handleShipSelector = () => {
        Taro.navigateTo({url: '/pages/shipSelector/shipSelector'})
    }

    return (
        <View>
            <View className='preview'>
                <View className='ship'></View>
                <View className='commander'></View>
            </View>
            <View>
                <Label>选择战舰</Label>
                <Button onClick={handleShipSelector}>点击选择</Button>
                </View>
            <View>
                <Label>选择舰长</Label>
                <Button>点击选择</Button>
            </View>
            <View>
                <Label>舰长技能</Label>
                <Button>点击编辑</Button>
            </View>
            <View>
                <Label>舰船配件</Label>
                <Button>点击编辑</Button>
            </View>
            <View>
                <Label>配置说明</Label>
                <Input placeholder='配置名称'></Input>
                <Textarea placeholder='战舰装配理念'></Textarea>
            </View>
        </View>
    )
}

export default FittingEditor