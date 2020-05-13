import React, { useState } from 'react';

import { ActiveQuiz } from '../../components';
import s from './Quiz.module.scss';

const Quiz = () => {
	const [quiz, setQuiz] = useState([
		{
			answers: [
				{ text: 'Question 1' },
				{ text: 'Question 2' },
				{ text: 'Question 3' },
				{ text: 'Question 4' },
			],
		},
	]);

	return (
		<div className={s.Quiz}>
			<div className={s.QuizWrapper}>
				<h1>Please answer the questions</h1>
				<ActiveQuiz answers={quiz[0].answers} />
			</div>
		</div>
	);
};

export default Quiz;
