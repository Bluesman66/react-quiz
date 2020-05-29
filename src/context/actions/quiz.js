import { CLASS_ERROR, CLASS_SUCCESS } from '../../consts';
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

import { BASE_URL } from '../../consts';
import axios from 'axios';

export function fetchQuizesAction(token) {
	return async (dispatch) => {
		dispatch(fetchQuizesStartAction());
		try {
			const response = await axios.get(`${BASE_URL}/quizes.json`, {
				cancelToken: token,
			});
			const quizes = [];
			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Test N${index + 1}`,
				});
			});
			dispatch(fetchQuizesSuccessAction(quizes));
		} catch (error) {
			dispatch(fetchQuizesErrorAction(error));
		}
	};
}

export function fetchQuizByIdAction(quizId, token) {
	return async (dispatch) => {
		dispatch(fetchQuizesStartAction());
		try {
			const response = await axios.get(`${BASE_URL}/quizes/${quizId}.json`, {
				cancelToken: token,
			});
			dispatch(fetchQuizSuccessAction(response.data));
		} catch (error) {
			dispatch(fetchQuizesErrorAction(error));
		}
	};
}

export function fetchQuizSuccessAction(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		payload: quiz,
	};
}

export function fetchQuizesStartAction() {
	return {
		type: FETCH_QUIZES_START,
	};
}

export function fetchQuizesSuccessAction(quizes) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		payload: quizes,
	};
}

export function fetchQuizesErrorAction(error) {
	return {
		type: FETCH_QUIZES_ERROR,
		payload: error,
	};
}

export function goNextQuestionAction() {
	return {
		type: SET_NEXT_QUESTION,
	};
}

export function setIsFinishedAction() {
	return {
		type: SET_IS_FINISHED,
	};
}

export function setAnswerStateAction(answerId, state, results) {
	return {
		type: SET_ANSWER_STATE,
		payload: { answerState: { [answerId]: state }, results },
	};
}

export function resetStateAction() {
	return {
		type: RESET_STATE,
	};
}

export function answerClickAction(answerId) {
	return (dispatch, getState) => {
		const state = getState().quiz;

		if (state.answerState) {
			const key = Object.keys(state.answerState)[0];
			if (state.answerState[key] === CLASS_SUCCESS) return;
		}

		const question = state.quiz[state.activeQuestion];
		const results = state.results;

		if (question.correctAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = CLASS_SUCCESS;
			}

			dispatch(setAnswerStateAction(answerId, CLASS_SUCCESS, results));

			const timeout = window.setTimeout(() => {
				if (isQuizFinished(state)) {
					dispatch(setIsFinishedAction());
				} else {
					dispatch(goNextQuestionAction());
				}
				window.clearTimeout(timeout);
			}, 1000);
		} else {
			results[question.id] = CLASS_ERROR;
			dispatch(setAnswerStateAction(answerId, CLASS_ERROR, results));
		}
	};
}

function isQuizFinished(state) {
	return state.activeQuestion + 1 === state.quiz.length;
}
