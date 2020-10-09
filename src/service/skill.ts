import { Skill } from '../type/types'
import skillData from '../data/skill'
import config from '../config/config'

interface SkillData {
    common: Skill[]
}

// getSkills 返回 包括 common 为之后技能改版做准备
export const getSkills = (): SkillData => {
    const result = { ...skillData } as SkillData
    return result
}

// getSkillbyId
export const getSkillbyId = (id: string) => {
    const skills = [ ...skillData.common ] as Skill[]
    const result = skills.find((skill) => {
        return skill.id === id
    })
    return result
}

// getSkillbySort 根据技能索引位置查询
export const getSkillbySort = (sort: string) => {
    const skills = [ ...skillData.common ] as Skill[]
    const result = skills.find((skill) => {
        return skill.sort === sort
    })
    return result
}

// https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1/crew_commander/skills/big/icon_perk_FlightSpeedModifier.png
export const getSkillImage = (id: string): string => {
    return `${config.imageCDNPath}/crew_commander/skills/big/icon_perk_${id}.png`
}
