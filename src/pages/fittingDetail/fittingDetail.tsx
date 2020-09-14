import React, { useState, useEffect } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { Fitting, User } from '../../type/types'
import { getFittingById } from '../../service/common'
import { getShipImage } from '../../service/ship'

const FittingDetail: React.FC = () => {
    const router = useRouter()
    const user: User = useSelector((state) => state.user)
    const [fitting, setFitting] = useState<Fitting>({} as Fitting)
    console.log('id', router.params.id)

    // 获取方案数据
    useEffect(() => {
        getFittingById(router.params.id).then((result) => {
            setFitting(result)
        })
    }, [router.params])

    const buttonClickHandle = () => {
        Taro.navigateTo({
            url: '/pages/fittingEditor/fittingEditor?id=12312s',
        })
    }

    return (
        <View>
            {fitting.title && (
                <React.Fragment>
                    <View>方案名称：{fitting.title}</View>
                    <View>作者：{fitting.authorNickName}</View>
                    <View>
                        <Image src={getShipImage(fitting.shipId)} />
                    </View>
                    <View>{fitting.commanderName}</View>
                    <View>{fitting.commanderSkill}</View>
                    <View>{fitting.modifyDate.toString()}</View>
                    <View>{fitting.description}</View>
                    <View>
                        {user.openId === fitting.authorOpenId && (
                            <Button onClick={buttonClickHandle}>编辑装配方案</Button>
                        )}
                    </View>
                </React.Fragment>
            )}
        </View>
    )
}

export default FittingDetail
