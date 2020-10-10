import {  Nation, Commander } from '../type/types'
import commanderData from '../data/commander'
import config from '../config/config'

export const getCommanders = () => {
    const result = [ ...commanderData ]
    return result
}

export const getCommanderByName = (name: string) => {
    const commanders = [ ...commanderData ]
    const result = commanders.find((commander) => {
        return commander.name === name
    })
    return result
}

export const getCommandersByNation = (nation: Nation) => {
    const commanders = [ ...commanderData ] as Commander[]
    const result = commanders.filter((commander) => {
        return commander.nation === nation
    })
    return result
}

// https://cdn.jsdelivr.net/gh/mtmzorro/ship-res-kit@0.9.9.1/crew_commander/base/${data.nation}/${data.name}.png
export const getCommanderImage = (name : string, nation: string): string => {
    return `${config.imageCDNPathKit}/crew_commander/base/${nation}/${name}.png`
}