import config from '../config/config'
import shipLocalesData from '../locales/ship'
import tierLocalesData from '../locales/tier'

// set App language
const language = config.language

export const shipNameLocalize = (id: string): string => {
    const result = shipLocalesData[id]
    if (!shipLocalesData[id]) {
        return '未定义的舰船'
    }
    return result[language]
}

export const cmdNameLocalize = (id: string): string => {
    const result = shipLocalesData[id]
    if (!shipLocalesData[id]) {
        return '未定义的舰船'
    }
    return result[language]
}

export const tierLocalize = (tier): string => {
    const result = tierLocalesData[tier]
    if (!result) {
        return '??'
    }
    return result[language]
}