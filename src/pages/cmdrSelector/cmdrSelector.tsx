import React, { useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { Commander, Nation } from '../../type/types'
import { getCommandersByNation } from '../../service/commander'
import { getNationList } from '../../service/common'
import { actions } from '../../reducers/fittingEditor'
import CmdrItem from './cmdrItem'

const nationList = getNationList() as Nation[]

const ShipSelector: React.FC = () => {
    // connect store
    // const shipId = useSelector(state => state.fittingEditor.shipId)
    const dispatch = useDispatch()

    const [curNation, setCurNation] = useState<Nation | null>(null)
    const [curCmdrList, setCurCmdrList] = useState<Commander[]>([])

    const handleNationSelect = (nation: Nation) => {
        setCurNation(nation)
    }

    // dispatch to fittingEditor
    const handleCmdrSelect = useCallback(
        (commander: Commander) => {
            dispatch(actions.setCommanderName(commander.name))
            Taro.navigateTo({ url: '/pages/fittingEditor/fittingEditor' })
        },
        [dispatch]
    )

    // 依赖 curNation 国家选择，查询舰长列表
    useEffect(() => {
        if (!curNation) {
            return
        }
        const result = getCommandersByNation(curNation)
        setCurCmdrList(result)
    }, [curNation])

    return (
        <View>
            <View>当前选择国家：{curNation}</View>
            <View>
                {!curNation && (
                    <View>
                        {nationList.map((nation) => {
                            return (
                                <View key={nation} onClick={handleNationSelect.bind(this, nation)}>
                                    {nation} - 国旗
                                </View>
                            )
                        })}
                    </View>
                )}
            </View>
            <View>
                {curCmdrList.length > 0 && (
                    <View>
                        {curCmdrList.map((commander) => {
                            return (
                                <CmdrItem
                                    key={commander.name}
                                    commander={commander}
                                    onSelect={handleCmdrSelect}
                                />
                            )
                        })}
                    </View>
                )}
            </View>
        </View>
    )
}

export default ShipSelector
