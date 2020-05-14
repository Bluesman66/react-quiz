import { GET_ANSWER_ID } from '../types';

const handlers = {
	[GET_ANSWER_ID]: (state, { payload }) => ({
		...state,
		activeQuestion: state.activeQuestion + 1,
	}),
	DEFAULT: (state) => state,
};

const quizReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default quizReducer;
