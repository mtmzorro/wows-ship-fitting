import config from '../config/config'
import shipLocalesData from '../locales/ship'
import tierLocalesData from '../locales/tier'
import cmdrLocalesData  from '../locales/commander'
import skillLocalesData from '../locales/skill'
import nationLocalesData from '../locales/nation'
import shipSpeciesLocalesData from '../locales/shipSpecies'


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

export const nationLocalize = (nation: string): string => {
    const result = nationLocalesData[nation]
    if (!result) {
        return '未知国家'
    }
    return result[language]
}

export const shipSpeciesLocalize = (shipSpecies: string): string => {
    const result = shipSpeciesLocalesData[shipSpecies]
    if (!result) {
        return '未知舰种'
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

export const skillNameLocalize = (id: string): string => {
    const result = skillLocalesData[id].name
    if (!result) {
        return ''
    }
    return result[language]
}

export const skillDescriptionLocalize = (id: string): string => {
    const result = skillLocalesData[id].description
    if (!result) {
        return ''
    }
    return result[language]
}

export const skillPerksLocalize = (id: string): string => {
    const result = skillLocalesData[id].perks
    if (!result) {
        return ''
    }
    return result[language]
}