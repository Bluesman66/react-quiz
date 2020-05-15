import React from 'react';
import s from './FinishedQuiz.module.scss';

const FinishedQuiz = () => {
	return (
		<div className={s.FinishedQuiz}>
			<ul>
				<li>
					<strong>1.</strong>&nbsp; How are you?
					<i className={'fa fa-times ' + s.error} />
				</li>
				<li>
					<strong>2.</strong>&nbsp; How are you?
					<i className={'fa fa-check ' + s.success} />
				</li>
			</ul>
			<p>Correctly 4 of 10</p>
			<div>
				<button>Repeat</button>
			</div>
		</div>
	);
};

export default FinishedQuiz;
