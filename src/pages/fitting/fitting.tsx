import React from 'react'
import { View, Button, Text, Image } from "@tarojs/components";

interface IProps {
    name: string
}

const Fitting: React.FC<IProps> = (props) => {
    return (
        <View>
            <View>hello</View>
            <View>
                <Button>选择战舰</Button>
                <Button>选择舰长</Button>
            </View>
        </View>
    )
}

export default Fitting