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

export interface Plan {
    id: number
    createDate: number
    modifyDate: number
    author: string
    planName: string
    shipId: string
    commanderId: string
    commanderSkill: [][]
    upgrade: [][]
    description: string
}

export interface User {
    id: string
    unionID: string
    nickName: string
    plans: Plan[]
}
