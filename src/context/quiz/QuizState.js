import {
	answerClickAction,
	resetStateAction,
	setQuizesAction
} from '../actions/quiz';
import { rootInitialState, rootReducer } from '../reducers/root';

import QuizContext from './QuizContext';
import React from 'react';
import thunk from 'redux-thunk';
import useEnhancedReducer from 'react-enhanced-reducer-hook';

const logMiddleware = ({ getState }) => {
	return (next) => (action) => {
		console.log('Prev State:', getState());
		console.log('Action:', action);
		next(action);
		console.log('Next State:', getState());
	};
};

const QuizState = ({ children }) => {
	const [state, dispatch] = useEnhancedReducer(rootReducer, rootInitialState, [
		thunk,
		logMiddleware,
	]);

	const retryQuiz = () => {
		dispatch(resetStateAction());
	};

	const setQuizes = (quizes) => {
		dispatch(setQuizesAction(quizes));
	};

	const activeQuiz = state.quiz.quizes[state.quiz.activeQuestion];

	return (
		<QuizContext.Provider
			value={{
				question: activeQuiz ? activeQuiz.question : '',
				answers: activeQuiz ? activeQuiz.answers : [],
				answerNumber: state.quiz.activeQuestion + 1,
				answerState: state.quiz.answerState,
				quizLength: state.quiz.quizes.length,
				quiz: state.quiz,
				answerClick: answerId => dispatch(answerClickAction(answerId)),
				setQuizes,
				retryQuiz,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export default QuizState;
