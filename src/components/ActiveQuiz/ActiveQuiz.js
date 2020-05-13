import React from 'react';
import s from './ActiveQuiz.module.scss';

const ActiveQuiz = () => {
	return (
		<div className={s.ActiveQuiz}>
			<p className={s.Qestion}>
				<span>
					<strong>1.</strong>&nbsp; How are you doing?
				</span>
				<small>4 of 12</small>
			</p>
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
			</ul>
		</div>
	);
};

export default ActiveQuiz;
