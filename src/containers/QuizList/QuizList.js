import React, { useContext, useEffect } from 'react';

import { Loader } from '../../components';
import { NavLink } from 'react-router-dom';
import { QuizContext } from '../../context';
import axios from 'axios';
import { fetchQuizes } from '../../context/actions/quiz';
import s from './QuizList.module.scss';

const QuizList = () => {
	const { quiz, dispatch } = useContext(QuizContext);
	const { quizes, loading } = quiz;

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		dispatch(fetchQuizes(source.token));
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
