import React, { useContext } from 'react';

import AnswersList from './AnswersList/AnswersList';
import { QuizContext } from '../../context';
import s from './ActiveQuiz.module.scss';

const ActiveQuiz = () => {
	const { quiz } = useContext(QuizContext);
	const { activeQuestion } = quiz;

	const activeQuiz = quiz.quiz[activeQuestion];
	const question = activeQuiz ? activeQuiz.question : '';
	const answerNumber = activeQuestion + 1;

	return (
		<div className={s.ActiveQuiz}>
			<p className={s.Qestion}>
				<span>
					<strong>{answerNumber}</strong>.&nbsp;{question}
				</span>
				<small>
					{answerNumber} of {quiz.quiz.length}
				</small>
			</p>
			<AnswersList />
		</div>
	);
};

export default ActiveQuiz;
