import { ActiveQuiz } from '../../components';
import React from 'react';
import s from './Quiz.module.scss';

const Quiz = () => {
	return (
		<div className={s.Quiz}>
			<div className={s.QuizWrapper}>
				<h1>Please answer the questions</h1>
				<ActiveQuiz />
			</div>
		</div>
	);
};

export default Quiz;
