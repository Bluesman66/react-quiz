import { ActiveQuiz, FinishedQuiz } from '../../components';
import React, { useContext } from 'react';

import { QuizContext } from '../../context';
import s from './Quiz.module.scss';

const Quiz = () => {
	const { isFinished } = useContext(QuizContext);
	return (
		<div className={s.Quiz}>
			<div className={s.QuizWrapper}>
				<h1>Please answer the questions</h1>
				{isFinished ? <FinishedQuiz /> : <ActiveQuiz />}
			</div>
		</div>
	);
};

export default Quiz;
