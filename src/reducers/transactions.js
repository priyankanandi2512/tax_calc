import { FETCH_TRANSACTIONS, UPDATE_TRANSACTIONS } from '../constants/actionTypes'

const initialState = []
const transactionsToBeSaved = 4
const session = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      const transactions = JSON.parse(localStorage.getItem(`transactions-${action.payload.userName}`))
      return transactions || []

    case UPDATE_TRANSACTIONS:
      const { data } = action.payload
      const updatedData = [...state, data]
      localStorage.setItem(`transactions-${action.payload.userName}`, JSON.stringify(updatedData))
      return updatedData.slice(Math.max(updatedData.length - transactionsToBeSaved, 0))
    default:
      return state
  }
}

export default session
