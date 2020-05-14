import React, { useReducer } from 'react';
import { SET_ANSWER_STATE, SET_NEXT_QUESTION } from '../types';

import QuizContext from './QuizContext';
import quizReducer from './quizReducer';

const QuizState = ({ children }) => {
	const initialState = {
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
			if (state.answerState[key] === 'success') return;
		}

		const question = state.quiz[state.activeQuestion];

		if (question.correctAnswerId === answerId) {
			dispatch({ type: SET_ANSWER_STATE, payload: { [answerId]: 'success' } });

			const timeout = window.setTimeout(() => {
				if (isQuizFinished()) {
					console.log('Finished');
				} else {
					dispatch({ type: SET_NEXT_QUESTION });
				}
				window.clearTimeout(timeout);
			}, 1000);
		} else {
			dispatch({ type: SET_ANSWER_STATE, payload: { [answerId]: 'error' } });
		}
	};

	const isQuizFinished = () => {
		return state.activeQuestion + 1 === state.quiz.length;
	};

	return (
		<QuizContext.Provider
			value={{
				question: state.quiz[state.activeQuestion].question,
				answers: state.quiz[state.activeQuestion].answers,
				answerNumber: state.activeQuestion + 1,
				quizLength: state.quiz.length,
				answerState: state.answerState,
				onAnswerClick,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export default QuizState;
