declare type Nation =
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

declare type ShipSpecies =
    | 'AirCarrier'
    | 'Battleship'
    | 'Cruiser'
    | 'Destroyer'
    // | 'Submarine'
    // | 'Auxillary'

declare interface Ship {
    id: string
    nation: Nation
    species: ShipSpecies
    tier: number
    upgrade: {}
}

declare interface Commander {
    name: string
    nation: Nation
}

declare interface Fitting {
    id: string
    createDate: number
    modifyDate: number
    authorNickName: string
    authorOpenId: string
    shipId: string
    nation: Nation | string
    commanderName: string
    commanderSkill: any[]
    upgrade: any[]
    title: string
    description: string
}

declare interface User {
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

declare interface Skill {
    id: string
    name?: string
    sort: string
    cost: number
    description?: string
    perks?: string
}