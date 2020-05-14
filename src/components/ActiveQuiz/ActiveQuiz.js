import React, { useContext } from 'react';

import AnswersList from './AnswersList/AnswersList';
import { QuizContext } from '../../context';
import s from './ActiveQuiz.module.scss';

const ActiveQuiz = () => {
	const { question } = useContext(QuizContext);
	return (
		<div className={s.ActiveQuiz}>
			<p className={s.Qestion}>
				<span>
					<strong>1.</strong>&nbsp; {question}
				</span>
				<small>4 of 12</small>
			</p>
			<AnswersList />
		</div>
	);
};

export default ActiveQuiz;
