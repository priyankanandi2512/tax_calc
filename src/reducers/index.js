import { combineReducers } from 'redux'
import session from './session'
import transactions from './transactions'

export default combineReducers({
  session,
  transactions
})
