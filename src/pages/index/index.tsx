import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import Fitting from "../fitting/fitting";
import { Ship } from "../../type/types";
import { getShips } from "../../service/ship";
import { shipNameLocalize } from "../../utils/localization";


import "./index.scss";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type State = {
    shipData: Ship[]
}

interface Index {
    state: State;
}

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shipData: []
        }
    }
    
    componentWillMount() {
        this.setState({
            shipData: getShips()
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    getShipImg(id: string) {
        return `https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1/ship_previews/${id}.png`
    }

    getCommanderImg(data: any) {
        return `https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1/crew_commander/base/${data.nation}/${data.name}.png`
    }

    buttonClickHandle() {
        Taro.navigateTo({
            url: '/pages/fittingEditor/fittingEditor'
        })
    }

    render() {
        return (
            <View className='index'>
                <View>
                    <Text>Hello, World</Text>
                    <View>
                        ID: {this.state.shipData[0].id}
                    </View>
                    <View>
                        Name: {shipNameLocalize(this.state.shipData[0].id)}
                    </View>
                    <Text>国家: {this.state.shipData[0].nation}</Text>
                    <Text>T: {this.state.shipData[0].tier}</Text>
                    <Image src={this.getShipImg(this.state.shipData[0].id)}></Image>
                </View>
                <View>
                    <View>舰长: Azur_Belfast</View>
                    <View>
                        <Image src={this.getCommanderImg({name: 'Azur_Belfast', nation: 'United_Kingdom'})}></Image>
                    </View>
                </View>
                <Button onClick={this.buttonClickHandle}>创建我的配船方案</Button>
            </View>
        );
    }
}

export default Index;
