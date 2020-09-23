import { View, Image, Text } from '@tarojs/components'
import React, { useMemo } from 'react'
import classnames from 'classnames'
import { getShipImage, getShipById } from '../../service/ship'
import { getCommanderImage, getCommanderByName } from '../../service/commander'
import { getSkillImage } from '../../service/skill'
import { shipNameLocalize, tierLocalize } from '../../utils/localization'
import { Fitting } from '../../type/types'
import './fittingItem.scss'

type Props = {
    [P in keyof Fitting]: Fitting[P]
} & {
    // card 用于 index | list 用于 userCenter
    itemType: 'card' | 'list'
    handleFittingDetail: (id: string) => void
}

const FittingItem: React.FC<Props> = (props) => {
    const {
        id,
        shipId,
        commanderName,
        authorNickName,
        title,
        createDate,
        commanderSkill,
        nation,
        itemType,
        handleFittingDetail,
    } = props

    const ship = useMemo(() => getShipById(shipId), [shipId])
    const skillList = commanderSkill.reduce((all, cur) => {
        return typeof cur === 'object' ? [...all, ...cur] : [...all, cur]
    }, [])

    // 右侧 Fitting info：card | list 型
    const generateInfo = useMemo(() => {
        return {
            card: (
                <React.Fragment>
                    {ship ? (
                        <View className='info__ship'>
                            T-{tierLocalize(ship.tier)} {shipNameLocalize(shipId)}
                        </View>
                    ) : (
                        <View className='info__ship'>未知舰船</View>
                    )}
                    <View className='info__ext'>
                        {authorNickName} · {createDate.toLocaleDateString()}
                    </View>
                    <View className='info__skill'>
                        {skillList.map((skillId) => {
                            return (
                                <Image
                                    key={skillId}
                                    lazyLoad
                                    className='image-skill'
                                    src={getSkillImage(skillId)}
                                />
                            )
                        })}
                    </View>
                </React.Fragment>
            ),
            list: (
                <React.Fragment>
                    <View className='info__ext'>
                        <View className='info__ext-left'>
                            {ship ? (
                                <React.Fragment>
                                    T-{tierLocalize(ship.tier)} {shipNameLocalize(shipId)}
                                </React.Fragment>
                            ) : (
                                '未知舰船'
                            )}
                        </View>
                        <View className='info__ext-right'>{createDate.toLocaleDateString()}</View>
                    </View>
                </React.Fragment>
            ),
        }[itemType]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, itemType])

    return useMemo(() => {
        const classes = classnames('fitting-item', {
            [`fitting-item--${itemType}`]: itemType,
        })

        return (
            <View className={classes} onClick={handleFittingDetail.bind(this, id)}>
                <View className='fitting-item__image image'>
                    <Image className='image__ship' lazyLoad src={getShipImage(shipId)} />
                    <Image
                        className='image__commander'
                        lazyLoad
                        src={getCommanderImage(commanderName, nation)}
                    />
                </View>
                <View className='fitting-item__info info'>
                    <View className='info__title'>{title}</View>
                    {generateInfo}
                </View>
            </View>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
}

FittingItem.defaultProps = {
    itemType: 'card',
}

export default FittingItem
