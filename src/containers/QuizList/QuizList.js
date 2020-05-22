import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import axios from 'axios';
import s from './QuizList.module.scss';

const QuizList = () => {
	const [quizes, setQuizes] = useState([]);

	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	const renderQuizes = () => {
		return quizes.map((quiz) => {
			return (
				<li key={quiz.id}>
					<NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
				</li>
			);
		});
	};

	useEffect(() => {
		const getQuizList = async () => {
			try {
				const response = await axios.get(
					'https://react-quiz-82f4c.firebaseio.com/quizes.json',
					{
						cancelToken: source.token,
					}
				);
				const qzs = [];
				Object.keys(response.data).forEach((key, index) => {
					qzs.push({
						id: key,
						name: `Test N${index + 1}`,
					});
				});
				setQuizes(qzs);
			} catch (error) {
				console.log(error);
			}
		};

		getQuizList();

		return () => {
			source.cancel();
		};
	});

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
