import { CLASS_ERROR, CLASS_SUCCESS } from '../../consts';
import React, { useReducer } from 'react';
import {
	goNextQuestion,
	resetState,
	setAnswerState,
	setIsFinished,
	setQuiz,
} from '../actions';

import QuizContext from './QuizContext';
import quizReducer from './quizReducer';

const QuizState = (props) => {
	const [state, dispatch] = useReducer(quizReducer, {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null,
		quiz: [],
	});

	const answerClick = (answerId) => {
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

			dispatch(setAnswerState(answerId, CLASS_SUCCESS, results));

			const timeout = window.setTimeout(() => {
				if (isQuizFinished()) {
					dispatch(setIsFinished(true));
				} else {
					dispatch(goNextQuestion());
				}
				window.clearTimeout(timeout);
			}, 1000);
		} else {
			results[question.id] = CLASS_ERROR;
			dispatch(setAnswerState(answerId, CLASS_ERROR, results));
		}
	};

	const isQuizFinished = () => {
		return state.activeQuestion + 1 === state.quiz.length;
	};

	const retry = () => {
		dispatch(resetState());
	};

	const loadQuiz = (quiz) => {
		dispatch(setQuiz(quiz));
	};

	const activeQuiz = state.quiz[state.activeQuestion];

	return (
		<QuizContext.Provider
			value={{
				question: activeQuiz ? activeQuiz.question : '',
				answers: activeQuiz ? activeQuiz.answers : [],
				answerNumber: state.activeQuestion + 1,
				quizLength: state.quiz.length,
				answerState: state.answerState,
				results: state.results,
				quiz: state.quiz,
				isFinished: state.isFinished,
				answerClick,
				retry,
				loadQuiz,
			}}
		>
			{props.children}
		</QuizContext.Provider>
	);
};

export default QuizState;
