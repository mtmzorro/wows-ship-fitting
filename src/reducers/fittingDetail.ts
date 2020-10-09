import { Fitting } from '../type/types'

// Actions type
export enum actionType {
    SET_FITTING_DETAIL = 'SET_FITTING_DETAIL',
    RESET_FITTING_DETAIL = 'RESET_FITTING_DETAIL',
}

const INITIAL_STATE: Fitting = {
    id: '0',
    createDate: 0,
    modifyDate: 0,
    authorNickName: '',
    authorOpenId: '',
    title: '',
    shipId: '',
    nation: '',
    commanderName: '',
    commanderSkill: [],
    upgrade: [],
    description: '',
}

// Reducer
export default function fittingDetail(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionType.SET_FITTING_DETAIL:
            return {
                ...state,
                ...action.payload,
            }
        case actionType.RESET_FITTING_DETAIL:
            return {
                ...state,
                ...INITIAL_STATE,
            }
        default:
            return state
    }
}

// Action Creators
export const actions = {
    setFittingDetail: (fitting: Fitting) => {
        return {
            type: actionType.SET_FITTING_DETAIL,
            payload: fitting,
        }
    },
    resetFittingDetail: () => {
        return {
            type: actionType.RESET_FITTING_DETAIL,
        }
    },
}
