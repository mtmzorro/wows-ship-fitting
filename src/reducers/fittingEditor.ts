import { Ship, Fitting } from '../type/types'
import actionType from '../constants/fittingEditor'

const INITIAL_STATE: Fitting = {
    id: 0,
    createDate: 0,
    modifyDate: 0,
    author: '',
    title: '',
    shipId: '',
    commanderId: '',
    commanderSkill: [],
    upgrade: [],
    description: '',
}

export default function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionType.SET_SHIP_ID:
            return {
                ...state,
                shipId: action.payload,
            }
        case actionType.SET_FITTING_EDITOR:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
