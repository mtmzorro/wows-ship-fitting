import { Ship, Nation, ShipSpecies } from '../type/types'
import shipData from '../data/ship'
import config from '../config/config'


// class ShipService {
//     public static getShips(): Ship[] {
//         const ships = [ ...shipData ]
//         return ships
//     }
// }
type ShipResult = Ship | undefined

export const getShips = () => {
    const result = [ ...shipData ]
    return result
}

export const getShipById = (id: string) => {
    const ships = [ ...shipData ]
    const result = ships.find((ship) => {
        return ship.id === id
    })
    return result
}

export const getShipsByNation = (nation: Nation): ShipResult[] => {
    const ships = [ ...shipData ]
    const result = ships.filter((ship) => {
        return ship.nation === nation
    })
    return result
}

export const getShipsBySpecies = (species: ShipSpecies): ShipResult[] => {
    const ships = [ ...shipData ]
    const result = ships.filter((ship) => {
        return ship.species === species
    })
    return result
}

export const getShipsByTier = (tier: number): ShipResult[] => {
    const ships = [ ...shipData ]
    const result = ships.filter((ship) => {
        return ship.tier === tier
    })
    return result
}

// https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1/ship_previews/${id}.png
export const getShipImageById = (id: string): string => {
    return `${config.imageCDNPath}/ship_previews/${id}.png`
}

