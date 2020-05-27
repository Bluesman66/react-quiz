import {
	RESET_STATE,
	SET_ANSWER_STATE,
	SET_IS_FINISHED,
	SET_NEXT_QUESTION,
	SET_QUIZES,
} from '../types';

const initialState = {
	activeQuestion: 0,
	answerState: null,
	quizes: [],
	results: {},
	isFinished: false,
};

const handlers = {
	[SET_NEXT_QUESTION]: (state) => ({
		...state,
		activeQuestion: state.activeQuestion + 1,
		answerState: null,
	}),
	[SET_ANSWER_STATE]: (state, { payload }) => ({
		...state,
		answerState: payload.answerState,
		results: payload.results,
	}),
	[SET_IS_FINISHED]: (state, { payload }) => ({
		...state,
		isFinished: payload,
	}),
	[RESET_STATE]: (state) => ({
		...state,
		activeQuestion: 0,
		answerState: null,
		isFinished: false,
		results: {},
	}),
	[SET_QUIZES]: (state, { payload }) => ({
		...state,
		quizes: payload,
	}),
	DEFAULT: (state) => state,
};

const quizReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default [quizReducer, initialState];
