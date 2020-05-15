import { CLASS_ERROR, CLASS_SUCCESS } from '../../consts';
import React, { useReducer } from 'react';
import {
	SET_ANSWER_STATE,
	SET_IS_FINISHED,
	SET_NEXT_QUESTION,
	RESET_STATE,
} from '../types';

import QuizContext from './QuizContext';
import quizReducer from './quizReducer';

const QuizState = ({ children }) => {
	const initialState = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null,
		quiz: [
			{
				id: 1,
				question: 'What color is sky?',
				correctAnswerId: 2,
				answers: [
					{ text: 'Black', id: 1 },
					{ text: 'Blue', id: 2 },
					{ text: 'Red', id: 3 },
					{ text: 'Green', id: 4 },
				],
			},
			{
				id: 2,
				question: 'Which year St. Petersburg was founded?',
				correctAnswerId: 3,
				answers: [
					{ text: '1683', id: 1 },
					{ text: '1700', id: 2 },
					{ text: '1703', id: 3 },
					{ text: '1803', id: 4 },
				],
			},
		],
	};

	const [state, dispatch] = useReducer(quizReducer, initialState);

	const onAnswerClick = (answerId) => {
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

			dispatch({
				type: SET_ANSWER_STATE,
				payload: { answerState: { [answerId]: CLASS_SUCCESS }, results },
			});

			const timeout = window.setTimeout(() => {
				if (isQuizFinished()) {
					dispatch({ type: SET_IS_FINISHED, payload: true });
				} else {
					dispatch({ type: SET_NEXT_QUESTION });
				}
				window.clearTimeout(timeout);
			}, 1000);
		} else {
			results[question.id] = CLASS_ERROR;
			dispatch({
				type: SET_ANSWER_STATE,
				payload: { answerState: { [answerId]: CLASS_ERROR }, results },
			});
		}
	};

	const isQuizFinished = () => {
		return state.activeQuestion + 1 === state.quiz.length;
	};

	const onRetry = () => {
		dispatch({ type: RESET_STATE });
	};

	return (
		<QuizContext.Provider
			value={{
				question: state.quiz[state.activeQuestion].question,
				answers: state.quiz[state.activeQuestion].answers,
				answerNumber: state.activeQuestion + 1,
				quizLength: state.quiz.length,
				answerState: state.answerState,
				results: state.results,
				quiz: state.quiz,
				isFinished: state.isFinished,
				onAnswerClick,
				onRetry,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export default QuizState;
