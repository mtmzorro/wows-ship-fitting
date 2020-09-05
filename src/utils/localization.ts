import config from '../config/config'
import shipLocalesData from '../locales/ship'
import tierLocalesData from '../locales/tier'
import cmdrLocalesData  from '../locales/commander'

// set App language
const language = config.language

export const shipNameLocalize = (id: string): string => {
    const result = shipLocalesData[id]
    if (!result) {
        return '未知舰船'
    }
    return result[language]
}

export const commanderNameLocalize = (name: string): string => {
    const result = cmdrLocalesData[name]
    if (!result) {
        return name
    }
    return result[language]
}

export const tierLocalize = (tier: number): string => {
    const result = tierLocalesData[tier]
    if (!result) {
        return '??'
    }
    return result[language]
}