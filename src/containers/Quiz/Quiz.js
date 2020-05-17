import { ActiveQuiz, FinishedQuiz } from '../../components';
import React, { useContext, useEffect } from 'react';

import { QuizContext } from '../../context';
import s from './Quiz.module.scss';

const Quiz = (props) => {
	const { isFinished } = useContext(QuizContext);

	useEffect(() => {
		console.log(props.match.params.id);
	});

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
