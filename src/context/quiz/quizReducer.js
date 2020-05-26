import {
	RESET_STATE,
	SET_ANSWER_STATE,
	SET_IS_FINISHED,
	SET_NEXT_QUESTION,
	SET_QUIZ_CREATOR_ANSWER_ID,
	SET_QUIZ_CREATOR_FORM_CONTROLS,
	SET_QUIZ_CREATOR_FORM_VALID,
	SET_QUIZ_CREATOR_QUIZ,
	SET_QUIZ_LIST_PROPS,
	SET_QUIZ_LOADING,
	SET_QUIZ_QUIZES
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
	[SET_QUIZ_QUIZES]: (state, { payload }) => ({
		...state,
		quiz: {
			...state.quiz,
			quizes: payload,
		},
	}),
	[SET_QUIZ_LOADING]: (state, { payload }) => ({
		...state,
		quiz: {
			...state.quiz,
			loading: payload,
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
	[SET_QUIZ_CREATOR_QUIZ]: (state, { payload }) => ({
		...state,
		quizCreator: {
			...state.quizCreator,
			quiz: payload,
		},
	}),
	[SET_QUIZ_CREATOR_FORM_VALID]: (state, { payload }) => ({
		...state,
		quizCreator: {
			...state.quizCreator,
			formValid: payload,
		},
	}),
	[SET_QUIZ_CREATOR_ANSWER_ID]: (state, { payload }) => ({
		...state,
		quizCreator: {
			...state.quizCreator,
			correctAnswerId: payload,
		},
	}),
	[SET_QUIZ_CREATOR_FORM_CONTROLS]: (state, { payload }) => ({
		...state,
		quizCreator: {
			...state.quizCreator,
			formControls: payload,
		},
	}),
	DEFAULT: (state) => state,
};

const quizReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default quizReducer;
