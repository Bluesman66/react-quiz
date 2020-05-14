import React, { useReducer } from 'react';

import { GET_ANSWER_ID } from '../types';
import QuizContext from './QuizContext';
import quizReducer from './quizReducer';

const QuizState = ({ children }) => {
	const initialState = {
		activeQuestion: 0,
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

	const getAnswerId = (answerId) =>
		dispatch({ type: GET_ANSWER_ID, payload: answerId });

	return (
		<QuizContext.Provider
			value={{
				question: state.quiz[state.activeQuestion].question,
				answers: state.quiz[state.activeQuestion].answers,
				answerNumber: state.activeQuestion + 1,
				quizLength: state.quiz.length,
				getAnswerId,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export default QuizState;
