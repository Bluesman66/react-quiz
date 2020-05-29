import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from '../types';

const initialState = {
	quiz: [],
};

const handlers = {
	[CREATE_QUIZ_QUESTION]: (state, { payload }) => ({
		...state,
		quiz: [...state.quiz, payload],
	}),
	[RESET_QUIZ_CREATION]: (state) => ({
		...state,
		quiz: [],
	}),
	DEFAULT: (state) => state,
};

const createReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default [createReducer, initialState];
