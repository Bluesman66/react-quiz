import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from '../types';

import { BASE_URL } from '../../consts';
import axios from 'axios';

export function createQuizQuestionAction(item) {
	return {
		type: CREATE_QUIZ_QUESTION,
		payload: item,
	};
}

export function resetQuizCreationAction() {
	return {
		type: RESET_QUIZ_CREATION,
	};
}

export function finishCreateQuizAction() {
	return async (dispatch, getState) => {
		await axios.post(`${BASE_URL}/quizes.json`, getState().create.quiz);
		dispatch(resetQuizCreationAction());
	};
}
