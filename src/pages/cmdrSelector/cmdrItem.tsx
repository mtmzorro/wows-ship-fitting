import React, { memo } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { Commander } from '../../type/types'
import { commanderNameLocalize } from '../../utils/localization'
import { getCommanderImage } from '../../service/commander'

interface Props {
    commander: Commander
    onSelect: (commander: Commander) => void
}

const CmdrItem: React.FC<Props> = memo((props) => {
    const { commander, onSelect } = props
    return (
        <View onClick={onSelect.bind(this, commander)}>
            {commander.name} - {commanderNameLocalize(commander.name)}
            <Image src={getCommanderImage(commander.name, commander.nation)} />
        </View>
    )
})

export default CmdrItem
