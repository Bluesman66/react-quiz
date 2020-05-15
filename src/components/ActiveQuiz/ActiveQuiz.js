import React, { useContext } from 'react';

import AnswersList from './AnswersList/AnswersList';
import { QuizContext } from '../../context';
import s from './ActiveQuiz.module.scss';

const ActiveQuiz = () => {
	const { question, answerNumber, quizLength } = useContext(QuizContext);

	return (
		<div className={s.ActiveQuiz}>
			<p className={s.Qestion}>
				<span>
					<strong>{answerNumber}</strong>.&nbsp;{question}
				</span>
				<small>
					{answerNumber} of {quizLength}
				</small>
			</p>
			<AnswersList />
		</div>
	);
};

export default ActiveQuiz;
