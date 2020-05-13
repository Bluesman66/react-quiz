import React, { useState } from 'react';

import s from './Quiz.module.scss';

const Quiz = () => {
	const [quiz, setQuiz] = useState([]);

	return (
		<div className={s.Quiz}>
			<h1>Quiz</h1>
		</div>
	);
};

export default Quiz;
