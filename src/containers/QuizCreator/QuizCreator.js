import { Button } from '../../components';
import React from 'react';
import s from './QuizCreator.module.scss';

const QuizCreator = () => {
	const submit = (event) => {
		event.preventDefault();
	};

	const addQuestion = () => {};

	const createQuiz = () => {};

	return (
		<div className={s.QuizCreator}>
			<div>
				<h1>Quiz Creator</h1>
				<form onSubmit={submit}>
					<input type="text" />
					<hr />
					<input type="text" />
					<input type="text" />
					<input type="text" />
					<input type="text" />
					<select name="" id=""></select>
					<Button type="primary" onClick={addQuestion}>
						Add question
					</Button>
					<Button type="success" onClick={createQuiz}>
						Create quiz
					</Button>
				</form>
			</div>
		</div>
	);
};

export default QuizCreator;
