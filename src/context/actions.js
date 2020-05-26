import {
	RESET_STATE,
	SET_ANSWER_STATE,
	SET_IS_FINISHED,
	SET_NEXT_QUESTION,
	SET_QUIZ_CREATOR_ANSWER_ID,
	SET_QUIZ_CREATOR_FORM_CONTROLS,
	SET_QUIZ_CREATOR_FORM_VALID,
	SET_QUIZ_CREATOR_QUIZ,
	SET_QUIZ_LIST_PROPS,
	SET_QUIZ_PROPS,
} from './types';

export function goNextQuestionAction() {
	return {
		type: SET_NEXT_QUESTION,
	};
}

export function setIsFinishedAction(value) {
	return {
		type: SET_IS_FINISHED,
		payload: value,
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

export function setQuizPropsAction(loading, quizes) {
	return {
		type: SET_QUIZ_PROPS,
		payload: {
			loading,
			quizes,
		},
	};
}

export function setQuizListPropsAction(loading, quizes) {
	return {
		type: SET_QUIZ_LIST_PROPS,
		payload: {
			loading,
			quizes,
		},
	};
}

export function setQuizCreatorQuizAction(value) {
	return {
		type: SET_QUIZ_CREATOR_QUIZ,
		payload: value,
	};
}

export function setQuizCreatorFormValidAction(value) {
	return {
		type: SET_QUIZ_CREATOR_FORM_VALID,
		payload: value,
	};
}

export function setQuizCreatorCorrectAnswerIdAction(value) {
	return {
		type: SET_QUIZ_CREATOR_ANSWER_ID,
		payload: value,
	};
}

export function setQuizCreatorFormControlsAction(value) {
	return {
		type: SET_QUIZ_CREATOR_FORM_CONTROLS,
		payload: value,
	};
}
