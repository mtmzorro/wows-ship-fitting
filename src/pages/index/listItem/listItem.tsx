import { View, Image } from '@tarojs/components'
import React, { useMemo } from 'react'
import { getShipImage, getShipById } from '../../../service/ship'
import { getCommanderImage, getCommanderByName } from '../../../service/commander'
import { getSkillImage } from '../../../service/skill'
import { shipNameLocalize, tierLocalize } from '../../../utils/localization'
import { Fitting } from '../../../type/types'


type Props = {
    [P in keyof Fitting]: Fitting[P]
} & {
    handleFittingDetail: (id: string) => void
}

const ListItem: React.FC<Props> = (props) => {
    const {
        id,
        shipId,
        commanderName,
        authorNickName,
        title,
        createDate,
        commanderSkill,
        handleFittingDetail,
    } = props

    return useMemo(() => {
        const ship = getShipById(shipId)
        const commamder = getCommanderByName(commanderName)
        const skillList = commanderSkill.reduce((all, cur) => {
            return typeof cur === 'object' ? [...all, ...cur] : [...all, cur]
        }, [])


        return (
            <View className='list-item' onClick={handleFittingDetail.bind(this, id)}>
                <View className='list-item-image'>
                    <Image className='image-ship' src={getShipImage(shipId)} />
                    {commamder && (
                        <Image
                            className='image-commander'
                            src={getCommanderImage(commanderName, commamder.nation)}
                        />
                    )}
                </View>
                <View className='list-item-info'>
                    <View className='info-title'>{title}</View>
                    {ship ? (
                        <View className='info-ship'>
                            T-{tierLocalize(ship.tier)} {shipNameLocalize(shipId)}
                        </View>
                    ) : (
                        <View>未知舰船</View>
                    )}
                    <View className='info-ext'>
                        {authorNickName} · {createDate.toLocaleDateString()}
                    </View>
                    <View className='info-skill'>
                        {skillList.map((skillId) => {
                            return (
                                <Image
                                    key={skillId}
                                    className='image-skill'
                                    src={getSkillImage(skillId)}
                                />
                            )
                        })}
                    </View>
                </View>
            </View>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorNickName, commanderName, id, shipId, title])
}

export default ListItem
