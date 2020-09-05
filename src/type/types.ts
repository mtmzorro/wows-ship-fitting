export type Nation =
    | "Commonwealth"
    | "Europe"
    | "France"
    | "Germany"
    | "Italy"
    | "Japan"
    | "Pan_America"
    | "Pan_Asia"
    | "Russia"
    | "USA"
    | "United_Kingdom"

export type ShipSpecies =
    | 'AirCarrier'
    | 'Battleship'
    | 'Cruiser'
    | 'Destroyer'
    | 'Submarine'
    | 'Auxillary'

export interface Ship {
    id: string
    // name: string
    nation: Nation
    species: ShipSpecies
    tier: number
    upgrade: {}
}

export interface Commander {
    // id: string
    name: string
    nation: Nation
}

export interface Fitting {
    id: number
    createDate: number
    modifyDate: number
    authorNickName: string
    authorOpenId: string
    shipId: string
    commanderName: string
    commanderSkill: any[]
    upgrade: any[]
    title: string
    description: string
}

export interface User {
    id: string
    openId: string
    avatarUrl: string
    nickName: string
    country: string
    city: string
    gender: number
    language: string
    province: string
    username: string
}
