import actionType from '../constants/fittingEditor'
import { Fitting } from '../type/types'

export const setShipId = (shipId: string) => {
    return {
        type: actionType.SET_SHIP_ID,
        payload: shipId
    }
}

export const setFittingEditor = (fitting: Fitting) => {
    return {
        type: actionType.SET_FITTING_EDITOR,
        payload: fitting
    }
}

export const setCommanderId = (shipId: string) => {
    return {
        type: '',
        payload: shipId
    }
}

export const setCommanderSkill = (shipId: string) => {
    return {
        type: '',
        payload: shipId
    }
}