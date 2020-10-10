// Actions type
export enum actionType {
    SET_USER_ID = 'SET_USER_ID',
    SET_USER_OPEN_ID = 'SET_USER_OPEN_ID',
    SET_USER = 'SET_USER',
}

const INITIAL_STATE: User = {
    id: '',
    openId: '',
    avatarUrl: '',
    nickName: '',
    username: '',
    city: '',
    gender: -1,
    language: '',
    province: '',
    country: '',
}

// Reducer
export default function fittingEditor(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                ...action.payload,
            }
        case actionType.SET_USER_ID:
            return {
                ...state,
                id: action.payload,
            }
        case actionType.SET_USER_OPEN_ID:
            return {
                ...state,
                openId: action.payload,
            }
        default:
            return state
    }
}

export const actions = {
    setUserInfo: (userInfo: Partial<User>) => {
        return {
            type: actionType.SET_USER,
            payload: userInfo,
        }
    },
    setUser: (user: User) => {
        return {
            type: actionType.SET_USER,
            payload: user,
        }
    },
    setUserId: (id: string) => {
        return {
            type: actionType.SET_USER_ID,
            payload: id,
        }
    },
    setUserOpenId: (openId: string) => {
        return {
            type: actionType.SET_USER_OPEN_ID,
            payload: openId,
        }
    },
}
