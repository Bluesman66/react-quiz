import {
	FETCH_QUIZES_ERROR,
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZ_SUCCESS,
	RESET_STATE,
	SET_ANSWER_STATE,
	SET_IS_FINISHED,
	SET_NEXT_QUESTION,
} from '../types';

const initialState = {
	activeQuestion: 0,
	answerState: null,
	quizes: [],
	results: {},
	isFinished: false,
	loading: false,
	error: {},
	quiz: {},
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
	[SET_IS_FINISHED]: (state) => ({
		...state,
		isFinished: true,
	}),
	[RESET_STATE]: (state) => ({
		...state,
		activeQuestion: 0,
		answerState: null,
		isFinished: false,
		results: {},
	}),
	[FETCH_QUIZES_START]: (state) => ({
		...state,
		loading: true,
	}),
	[FETCH_QUIZES_SUCCESS]: (state, { payload }) => ({
		...state,
		quizes: payload,
		loading: false,
	}),
	[FETCH_QUIZES_ERROR]: (state, { payload }) => ({
		...state,
		error: payload,
	}),
	[FETCH_QUIZ_SUCCESS]: (state, { payload }) => ({
		...state,
		quiz: payload,
		loading: false,
	}),
	DEFAULT: (state) => state,
};

const quizReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default [quizReducer, initialState];
