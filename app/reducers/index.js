import {
	combineReducers
} from 'redux'
import userinfo from './userinfo'
import app from './app'
import {
	todos,
	visibilityFilter
} from './todolist'

export default combineReducers({
	userinfo,
	app,
	todos,
	visibilityFilter
})