import { CLASS_ERROR, CLASS_SUCCESS } from '../../consts';
import {
	goNextQuestionAction,
	resetStateAction,
	setAnswerStateAction,
	setIsFinishedAction,
	setQuizesAction,
} from '../actions';
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

	const answerClick = (answerId) => {
		if (state.quiz.answerState) {
			const key = Object.keys(state.quiz.answerState)[0];
			if (state.quiz.answerState[key] === CLASS_SUCCESS) return;
		}

		const question = state.quiz.quizes[state.quiz.activeQuestion];
		const results = state.quiz.results;

		if (question.correctAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = CLASS_SUCCESS;
			}

			dispatch(setAnswerStateAction(answerId, CLASS_SUCCESS, results));

			const timeout = window.setTimeout(() => {
				if (isQuizFinished()) {
					dispatch(setIsFinishedAction(true));
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

	const isQuizFinished = () => {
		return state.quiz.activeQuestion + 1 === state.quiz.quizes.length;
	};

	const retryQuiz = () => {
		dispatch(resetStateAction());
	}

	const setQuizes = (quizes) => {
		dispatch(setQuizesAction(quizes));
	}

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
				answerClick,
				setQuizes,
				retryQuiz,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export default QuizState;
