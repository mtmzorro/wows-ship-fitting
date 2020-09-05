import { Ship, Fitting } from '../type/types'

// Actions type
export enum actionType {
    SET_ID = 'SET_ID',
    SET_CREATE_DATA = 'SET_CREATE_DATA',
    SET_MODIFY_DATE = 'SET_MODIFY_DATE',
    SET_AUTHOR = 'SET_AUTHOR',
    SET_FITTING_NAME = 'SET_FITTING_NAME',
    SET_SHIP_ID = 'SET_SHIP_ID',
    SET_COMMANDER_NAME = 'SET_COMMANDER_NAME',
    SET_COMMANDER_SKILL = 'SET_COMMANDER_SKILL',
    SET_UPGRADE = 'SET_UPGRADE',
    SET_TITLE = 'SET_TITLE',
    SET_DESCRIPTION = 'SET_DESCRIPTION',
    SET_FITTING_EDITOR = 'SET_FITTING_EDITOR',
}

const INITIAL_STATE: Fitting = {
    id: 0,
    createDate: 0,
    modifyDate: 0,
    authorNickName: '',
    authorOpenId: '',
    title: '',
    shipId: '',
    commanderName: '',
    commanderSkill: [],
    upgrade: [],
    description: '',
}

// Reducer
export default function fittingEditor(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionType.SET_FITTING_EDITOR:
            return {
                ...state,
                ...action.payload
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
        default:
            return state
    }
}

// Action Creators
export const actions = {
    setFittingEditor: (fitting: Partial<Fitting>) => {
        return {
            type: actionType.SET_FITTING_EDITOR,
            payload: fitting
        }
    },
    setShipId: (shipId: string) => {
        return {
            type: actionType.SET_SHIP_ID,
            payload: shipId
        }
    },
    setCommanderName: (commanderName: string) => {
        return {
            type: actionType.SET_COMMANDER_NAME,
            payload: commanderName
        }
    },
}
