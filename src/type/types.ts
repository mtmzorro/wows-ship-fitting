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
    nation: Nation | string
    species: ShipSpecies | string
    tier: number
    upgrade: {}
}

export interface Commander {
    id: string
    name: string
    nation: Nation
}

export interface Fitting {
    id: number
    createDate: number
    modifyDate: number
    author: string
    shipId: string
    commanderId: string
    commanderSkill: any[]
    upgrade: any[]
    title: string
    description: string
}

export interface User {
    id: string
    unionID: string
    nickName: string
    plans: Fitting[]
}
