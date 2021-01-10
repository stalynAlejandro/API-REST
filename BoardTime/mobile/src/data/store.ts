import userReducer from './user/user.reducer'
import { createStore } from 'redux'

let store = createStore(userReducer)

export default store;