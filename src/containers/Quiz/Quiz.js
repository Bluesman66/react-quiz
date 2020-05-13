import React, { useState } from 'react';

import { ActiveQuiz } from '../../components';
import s from './Quiz.module.scss';

const Quiz = () => {
	const [quiz, setQuiz] = useState([]);

	return (
		<div className={s.Quiz}>
			<div className={s.QuizWrapper}>
				<h1>Quiz</h1>
				<ActiveQuiz />
			</div>
		</div>
	);
};

export default Quiz;
