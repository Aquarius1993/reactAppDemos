import * as todoTypes from '../constants/todolist';

const {
	SHOW_ALL
} = todoTypes.VisibilityFilters;

export function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case todoTypes.SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state;
	}
}

export function todos(state = [], action) {
	switch (action.type) {
		case todoTypes.ADD_TODO:
			return [...state, {
				text: action.text,
				completed: false
			}]
		case todoTypes.COMPLETE_TODO:
			return [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], {
					completed: true
				}),
				...state.slice(action.index + 1)
			];
		default:
			return state
	}
}