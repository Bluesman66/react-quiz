import { NavLink } from 'react-router-dom';
import React from 'react';
import s from './QuizList.module.scss';

const QuizList = () => {
	const renderQuizes = () => {
		return [1, 2, 3].map((quiz, index) => {
			return (
				<li key={index}>
					<NavLink to={`/quiz/${quiz}`}>Quiz {quiz}</NavLink>
				</li>
			);
		});
	};

	return (
		<div className={s.QuizList}>
			<div>
				<h1>QuizList</h1>
				<ul>{renderQuizes()}</ul>
			</div>
		</div>
	);
};

export default QuizList;
