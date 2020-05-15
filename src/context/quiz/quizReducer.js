import { SET_ANSWER_STATE, SET_IS_FINISHED, SET_NEXT_QUESTION } from '../types';

const handlers = {
	[SET_NEXT_QUESTION]: (state) => ({
		...state,
		activeQuestion: state.activeQuestion + 1,
		answerState: null,
	}),
	[SET_ANSWER_STATE]: (state, { payload }) => ({
		...state,
		answerState: payload,
	}),
	[SET_IS_FINISHED]: (state, { payload }) => ({
		...state,
		isFinished: payload,
	}),
	DEFAULT: (state) => state,
};

const quizReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default quizReducer;
