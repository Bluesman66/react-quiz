import React, { useReducer } from 'react';

import { GET_ANSWER_ID } from '../types';
import QuizContext from './QuizContext';
import quizReducer from './quizReducer';

const QuizState = ({ children }) => {
	const initialState = [
		{
			question: 'What color is sky?',
			correctAnswerId: 2,
			answers: [
				{ text: 'Black', id: 1 },
				{ text: 'Blue', id: 2 },
				{ text: 'Red', id: 3 },
				{ text: 'Green', id: 4 },
			],
		},
	];

	const [state, dispatch] = useReducer(quizReducer, initialState);

	const getAnswerId = (answerId) =>
		dispatch({ type: GET_ANSWER_ID, payload: answerId });

	return (
		<QuizContext.Provider
			value={{
				question: state[0].question,
				answers: state[0].answers,
				getAnswerId,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export default QuizState;
