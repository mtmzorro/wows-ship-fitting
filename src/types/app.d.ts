type Nation =
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

type ShipSpecies =
    | 'AirCarrier'
    | 'Battleship'
    | 'Cruiser'
    | 'Destroyer'
    // | 'Submarine'
    // | 'Auxillary'

interface Ship {
    id: string
    nation: Nation
    species: ShipSpecies
    tier: number
    upgrade: {}
}

interface Commander {
    name: string
    nation: Nation
}

interface Fitting {
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

interface User {
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

interface Skill {
    id: string
    name?: string
    sort: string
    cost: number
    description?: string
    perks?: string
}
