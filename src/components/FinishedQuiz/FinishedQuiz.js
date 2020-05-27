import { CLASS_ERROR, CLASS_SUCCESS } from '../../consts';
import React, { useContext } from 'react';

import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
import { QuizContext } from '../../context';
import { resetStateAction } from '../../context/actions/quiz';
import s from './FinishedQuiz.module.scss';

const FinishedQuiz = () => {
	const { quiz, dispatch } = useContext(QuizContext);
	const { quizes, results } = quiz;

	const successCount = Object.keys(results).reduce((total, key) => {
		if (results[key] === CLASS_SUCCESS) {
			total++;
		}
		return total;
	}, 0);

	return (
		<div className={s.FinishedQuiz}>
			<ul>
				{quizes.map((quizItem, index) => {
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
				Correctly {successCount} of {quizes.length}
			</p>
			<div>
				<Button onClick={() => dispatch(resetStateAction())} type="primary">
					Retry
				</Button>
				<Link to="/">
					<Button type="success">Go to quiz list</Button>
				</Link>
			</div>
		</div>
	);
};

export default FinishedQuiz;
