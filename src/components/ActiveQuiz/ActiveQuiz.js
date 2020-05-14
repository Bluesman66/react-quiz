import AnswersList from './AnswersList/AnswersList';
import React from 'react';
import s from './ActiveQuiz.module.scss';

const ActiveQuiz = (props) => {
	return (
		<div className={s.ActiveQuiz}>
			<p className={s.Qestion}>
				<span>
					<strong>1.</strong>&nbsp; {props.question}
				</span>
				<small>4 of 12</small>
			</p>
			<AnswersList
				answers={props.answers}
				onAnswerClick={props.onAnswerClick}
			/>
		</div>
	);
};

export default ActiveQuiz;
