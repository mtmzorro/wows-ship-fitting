import shipData from '../data/ship'
import config from '../config/config'

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
