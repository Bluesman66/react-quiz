import React, { useState } from 'react';

import { ActiveQuiz } from '../../components';
import s from './Quiz.module.scss';

const Quiz = () => {
	const [quiz, setQuiz] = useState([
		{
			question: 'What color is sky?',
			correctAnswerId: 2,
			answers: [
				{ text: 'Black', id: 1 },
				{ text: 'Blue', id: 2 },
				{ text: 'Red', id: 3 },
				{ text: 'Green', id: 4 },
			],
		},
	]);

	const onAnswerClickHandler = (answerId) => {
		console.log(answerId);
	};

	return (
		<div className={s.Quiz}>
			<div className={s.QuizWrapper}>
				<h1>Please answer the questions</h1>
				<ActiveQuiz
					answers={quiz[0].answers}
					question={quiz[0].question}
					onAnswerClick={onAnswerClickHandler}
				/>
			</div>
		</div>
	);
};

export default Quiz;
