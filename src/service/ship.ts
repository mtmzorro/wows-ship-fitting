import { Ship, Nation, ShipSpecies } from '../type/types'
import shipData from '../data/ship'
import nationData from '../data/nation'
import shipSpeciesData from '../data/shipSpecies'
import config from '../config/config'


// class ShipService {
//     public static getShips(): Ship[] {
//         const ships = [ ...shipData ]
//         return ships
//     }
// }

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

export const getShipsByNation = (nation: Nation) => {
    const ships = [ ...shipData ]
    const result = ships.filter((ship) => {
        return ship.nation === nation
    })
    return result
}

export const getShipsBySpecies = (species: ShipSpecies) => {
    const ships = [ ...shipData ]
    const result = ships.filter((ship) => {
        return ship.species === species
    })
    return result
}

export const getShipsByTier = (tier: number) => {
    const ships = [ ...shipData ]
    const result = ships.filter((ship) => {
        return ship.tier === tier
    })
    return result
}

// get 国家列表
export const getNationList = () => {
    return [ ...nationData ]
}

// get 舰船分类列表
export const getShipSpeciesList = () => {
    return [ ...shipSpeciesData ]
}

// https://cdn.jsdelivr.net/gh/mtmzorro/ship-res@0.0.1/ship_previews/${id}.png
export const getShipImageById = (id: string): string => {
    return `${config.imageCDNPath}/ship_previews/${id}.png`
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

