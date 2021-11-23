import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import usersReducer from './users'
import drawingsReducer from './drawings'
import singleDrawingReducer from './singleDrawing'

const reducer = combineReducers({
  user: user,
  users: usersReducer,
  drawing: singleDrawingReducer,
  drawings: drawingsReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
