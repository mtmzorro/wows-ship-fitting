import shipData from '../constants/ship'

export type IShipData = {
    id: string,
    nation: string,
    species: string,
    tier: number,
    upgrade: object,
}[]

type GetAllShip = () => IShipData

export const getAllShip: GetAllShip = () => {
    const ship = shipData as IShipData
    return ship
}