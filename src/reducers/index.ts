import { combineReducers } from 'redux'
import fittingEditor from './fittingEditor'
import fittingDetail from './fittingDetail'
import user from './user'

export default combineReducers({
    fittingEditor,
    fittingDetail,
    user,
})
