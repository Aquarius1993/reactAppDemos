import * as todoTypes from '../constants/todolist';

export function addTodo(text) {
	return {
		type: todoTypes.ADD_TODO,
		text
	};
}

export function completeTodo(index) {
	return {
		type: todoTypes.COMPLETE_TODO,
		index
	};
}

export function setVisibilityFilter(filter) {
	return {
		type: todoTypes.SET_VISIBILITY_FILTER,
		filter
	};
}