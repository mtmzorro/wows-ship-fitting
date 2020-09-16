import { Ship, Fitting } from '../type/types'

// Actions type
export enum actionType {
    SET_ID = 'SET_ID',
    SET_SHIP_ID = 'SET_SHIP_ID',
    SET_COMMANDER_NAME = 'SET_COMMANDER_NAME',
    SET_COMMANDER_SKILL = 'SET_COMMANDER_SKILL',
    SET_FITTING_EDITOR = 'SET_FITTING_EDITOR',
    RESET_FITTING_EDITOR = 'RESET_FITTING_EDITOR',
}

const INITIAL_STATE: Fitting = {
    id: 0,
    createDate: new Date(),
    modifyDate: new Date(),
    authorNickName: '',
    authorOpenId: '',
    title: '',
    shipId: '',
    commanderName: '',
    commanderSkill: [[]],
    upgrade: [],
    description: '',
}

// Reducer
export default function fittingEditor(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionType.SET_FITTING_EDITOR:
            return {
                ...state,
                ...action.payload,
            }
        case actionType.SET_SHIP_ID:
            return {
                ...state,
                shipId: action.payload,
            }
        case actionType.SET_COMMANDER_NAME:
            return {
                ...state,
                commanderName: action.payload,
            }
        case actionType.SET_COMMANDER_SKILL:
            return {
                ...state,
                commanderSkill: action.payload,
            }
        case actionType.RESET_FITTING_EDITOR:
            return {
                ...INITIAL_STATE
            }
        default:
            return state
    }
}

// Action Creators
export const actions = {
    setFittingEditor: (fitting: Partial<Fitting>) => {
        return {
            type: actionType.SET_FITTING_EDITOR,
            payload: fitting,
        }
    },
    setShipId: (shipId: string) => {
        return {
            type: actionType.SET_SHIP_ID,
            payload: shipId,
        }
    },
    setCommanderName: (commanderName: string) => {
        return {
            type: actionType.SET_COMMANDER_NAME,
            payload: commanderName,
        }
    },
    setCommanderSkill: (skillList: string[][]) => {
        return {
            type: actionType.SET_COMMANDER_SKILL,
            payload: skillList,
        }
    },
    resetFittingEditor: () => {
        return {
            type: actionType.RESET_FITTING_EDITOR,
        }
    },
}
