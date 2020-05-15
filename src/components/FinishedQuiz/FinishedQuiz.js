import { CLASS_ERROR, CLASS_SUCCESS } from '../../consts';
import React, { useContext } from 'react';

import { QuizContext } from '../../context';
import s from './FinishedQuiz.module.scss';

const FinishedQuiz = () => {
	const { results, quiz, quizLength, onRetry } = useContext(QuizContext);

	const successCount = Object.keys(results).reduce((total, key) => {
		if (results[key] === CLASS_SUCCESS) {
			total++;
		}
		return total;
	}, 0);

	return (
		<div className={s.FinishedQuiz}>
			<ul>
				{quiz.map((quizItem, index) => {
					const cls = [
						'fa',
						results[quizItem.id] === CLASS_ERROR ? 'fa-times' : 'fa-check',
						s[results[quizItem.id]],
					];

					return (
						<li key={index}>
							<strong>{index + 1}</strong>.&nbsp;{quizItem.question}
							<i className={cls.join(' ')} />
						</li>
					);
				})}
			</ul>
			<p>
				Correctly {successCount} of {quizLength}
			</p>
			<div>
				<button onClick={onRetry}>Retry</button>
			</div>
		</div>
	);
};

export default FinishedQuiz;
