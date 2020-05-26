import { CLASS_ERROR, CLASS_SUCCESS } from '../../consts';
import {
	goNextQuestionAction,
	resetStateAction,
	setAnswerStateAction,
	setIsFinishedAction,
	setQuizCreatorCorrectAnswerIdAction,
	setQuizCreatorFormControlsAction,
	setQuizCreatorFormValidAction,
	setQuizCreatorQuizAction,
	setQuizListPropsAction,
	setQuizLoadingAction,
	setQuizQuizesAction,
} from '../actions';

import QuizContext from './QuizContext';
import React from 'react';
import { createControl } from '../../form';
import quizReducer from './quizReducer';
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

const QuizState = (props) => {
	const initialState = {
		activeQuestion: 0,
		answerState: null,

		quiz: {
			quizes: [],
			loading: true,
			results: {},
			isFinished: false,
			setQuizQuizes,
			setQuizLoading,
			retryQuiz,
		},

		quizList: {
			quizes: [],
			loading: true,
			setQuizListProps,
		},

		quizCreator: {
			quiz: [],
			formValid: false,
			correctAnswerId: 1,
			formControls: createFormControls(),
			setQuizCreatorQuiz,
			setQuizCreatorFormValid,
			setQuizCreatorCorrectAnswerId,
			setQuizCreatorFormControls,
		},
	};

	const [state, dispatch] = useEnhancedReducer(quizReducer, initialState, [
		thunk,
		logMiddleware,
	]);

	function createOptionControl(number) {
		return createControl(
			{
				label: `Variant ${number}`,
				error: 'Value can not be empty',
				id: number,
			},
			{ required: true }
		);
	}

	function createFormControls() {
		return {
			question: createControl(
				{
					label: 'Please enter question',
					error: 'Question can not be empty',
				},
				{ required: true }
			),
			option1: createOptionControl(1),
			option2: createOptionControl(2),
			option3: createOptionControl(3),
			option4: createOptionControl(4),
		};
	}

	function answerClick(answerId) {
		if (state.answerState) {
			const key = Object.keys(state.answerState)[0];
			if (state.answerState[key] === CLASS_SUCCESS) return;
		}

		const question = state.quiz.quizes[state.activeQuestion];
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
	}

	function isQuizFinished() {
		return state.activeQuestion + 1 === state.quiz.quizes.length;
	}

	function retryQuiz() {
		dispatch(resetStateAction());
	}

	function setQuizQuizes(quizes) {
		dispatch(setQuizQuizesAction(quizes));
	}

	function setQuizLoading(loading) {
		dispatch(setQuizLoadingAction(loading));
	}

	function setQuizListProps(loading, quizes) {
		dispatch(setQuizListPropsAction(loading, quizes));
	}

	function setQuizCreatorQuiz(quiz) {
		dispatch(setQuizCreatorQuizAction(quiz));
	}

	function setQuizCreatorFormValid(formValid) {
		dispatch(setQuizCreatorFormValidAction(formValid));
	}

	function setQuizCreatorCorrectAnswerId(answerId) {
		dispatch(setQuizCreatorCorrectAnswerIdAction(answerId));
	}

	function setQuizCreatorFormControls(formControls) {
		formControls
			? dispatch(setQuizCreatorFormControlsAction(formControls))
			: dispatch(setQuizCreatorFormControlsAction(createFormControls()));
	}

	const activeQuiz = state.quiz.quizes[state.activeQuestion];

	return (
		<QuizContext.Provider
			value={{
				question: activeQuiz ? activeQuiz.question : '',
				answers: activeQuiz ? activeQuiz.answers : [],
				answerNumber: state.activeQuestion + 1,
				answerState: state.answerState,
				quizLength: state.quiz.quizes.length,
				quiz: state.quiz,
				quizList: state.quizList,
				quizCreator: state.quizCreator,
				answerClick,
			}}
		>
			{props.children}
		</QuizContext.Provider>
	);
};

export default QuizState;
