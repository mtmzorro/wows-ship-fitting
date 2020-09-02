import config from '../config/config'
import shipLocalesData from '../locales/ship'

// set App language
const language = config.language

export const shipNameLocalize = (id: string): string => {
    if (!shipLocalesData[id]) {
        return '未定义的舰船'
    }
    return shipLocalesData[id][language]
}

export const cmdNameLocalize = (id: string): string => {
    if (!shipLocalesData[id]) {
        return '未定义的舰船'
    }
    return shipLocalesData[id][language]
}