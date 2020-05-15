import {
	RESET_STATE,
	SET_ANSWER_STATE,
	SET_IS_FINISHED,
	SET_NEXT_QUESTION,
} from './types';

export function goNextQuestion() {
	return {
		type: SET_NEXT_QUESTION,
	};
}

export function setIsFinished(value) {
	return {
		type: SET_IS_FINISHED,
		payload: value,
	};
}

export function setAnswerState(answerId, state, results) {
	return {
		type: SET_ANSWER_STATE,
		payload: { answerState: { [answerId]: state }, results },
	};
}

export function resetState(number) {
	return {
		type: RESET_STATE,
	};
}
