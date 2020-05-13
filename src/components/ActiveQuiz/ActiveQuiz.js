import AnswersList from './AnswersList/AnswersList';
import React from 'react';
import s from './ActiveQuiz.module.scss';

const ActiveQuiz = (props) => {
	return (
		<div className={s.ActiveQuiz}>
			<p className={s.Qestion}>
				<span>
					<strong>1.</strong>&nbsp; How are you?
				</span>
				<small>4 of 12</small>
			</p>
			<AnswersList answers={props.answers} />
		</div>
	);
};

export default ActiveQuiz;
