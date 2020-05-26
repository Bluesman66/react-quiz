import {
	RESET_STATE,
	SET_ANSWER_STATE,
	SET_IS_FINISHED,
	SET_NEXT_QUESTION,
	SET_QUIZ_LIST_PROPS,
	SET_QUIZ_PROPS,
} from '../types';

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
		quiz: {
			...state.quiz,
			isFinished: payload,
		},
	}),
	[RESET_STATE]: (state) => ({
		...state,
		activeQuestion: 0,
		answerState: null,
		isFinished: false,
		results: {},
	}),
	[SET_QUIZ_PROPS]: (state, { payload }) => ({
		...state,
		quiz: {
			...state.quiz,
			loading: payload.loading,
			quizes: payload.quizes,
		},
	}),
	[SET_QUIZ_LIST_PROPS]: (state, { payload }) => ({
		...state,
		quizList: {
			...state.quizList,
			loading: payload.loading,
			quizes: payload.quizes,
		},
	}),
	DEFAULT: (state) => state,
};

const quizReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default quizReducer;
