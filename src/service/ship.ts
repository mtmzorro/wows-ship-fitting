import { Nation, ShipSpecies, Ship } from '../type/types'
import shipData from '../data/ship'
import config from '../config/config'


// class ShipService {
//     public static getShips(): Ship[] {
//         const ships = [ ...shipData ]
//         return ships
//     }
// }

export const getShips = () => {
    const result = [ ...shipData ] as Ship[]
    return result
}

export const getShipById = (id: string) => {
    const ships = [ ...shipData ] as Ship[]
    const result = ships.find((ship) => {
        return ship.id === id
    })
    return result
}

export const getShipsByNation = (nation: Nation) => {
    const ships = [ ...shipData ] as Ship[]
    const result = ships.filter((ship) => {
        return ship.nation === nation
    })
    return result
}

export const getShipsBySpecies = (species: ShipSpecies) => {
    const ships = [ ...shipData ] as Ship[]
    const result = ships.filter((ship) => {
        return ship.species === species
    })
    return result
}

export const getShipsByTier = (tier: number) => {
    const ships = [ ...shipData ] as Ship[]
    const result = ships.filter((ship) => {
        return ship.tier === tier
    })
    return result
}

// https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.9.9.1/ship_previews/${id}.png
export const getShipImage = (id: string): string => {
    return `${config.imageCDNPathShip}/ship_previews/${id}.png`
}

// // get 舰船选择器数据
// const getShipSelectorData = () => {
//     const ships = getShips()
//     const nationList = getNationList()
//     const shipSpeciesList = getShipSpeciesList()

//     if (!ships) {
//         return undefined
//     }
//     const result = nationList.map((nation: Nation) => {
//         const newList = getShipsByNation(nation)
//         return {

//         }
//     })
// }

