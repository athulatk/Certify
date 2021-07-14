import { createStore } from 'redux'
import userReducer  from './UserReducer.js'

const store = createStore(userReducer);

export default store;