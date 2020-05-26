import React, { useEffect, useState } from 'react';

import { BASE_URL } from '../../consts';
import { Loader } from '../../components';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import s from './QuizList.module.scss';

const QuizList = () => {
	const [quizes, setQuizes] = useState([]);
	const [loading, setLoading] = useState(true);

	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	useEffect(() => {
		const getQuizList = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/quizes.json`, {
					cancelToken: source.token,
				});
				const quizes = [];
				Object.keys(response.data).forEach((key, index) => {
					quizes.push({
						id: key,
						name: `Test N${index + 1}`,
					});
				});
				setQuizes(quizes);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		getQuizList();

		return () => {
			source.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderQuizes = () => {
		return quizes.map((quiz) => {
			return (
				<li key={quiz.id}>
					<NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
				</li>
			);
		});
	};

	return (
		<div className={s.QuizList}>
			<div>
				<h1>QuizList</h1>
				{loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
			</div>
		</div>
	);
};

export default QuizList;
