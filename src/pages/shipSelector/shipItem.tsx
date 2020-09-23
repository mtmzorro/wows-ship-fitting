import React, {memo} from 'react'
import { View } from "@tarojs/components";
import { Ship} from '../../type/types';
import {shipNameLocalize ,tierLocalize} from '../../utils/localization';

interface Props {
    ship: Ship,
    onSelect: (ship: Ship) => void
}

const ShipItem: React.FC<Props> = memo((props) => {
    const {ship, onSelect} = props
    return (
        <View onClick={onSelect.bind(this, ship)}>
            {ship.id} - {shipNameLocalize(ship.id)} - T-{tierLocalize(ship.tier)}
        </View>
    )
})

export default ShipItem