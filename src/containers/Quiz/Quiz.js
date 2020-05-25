import { ActiveQuiz, FinishedQuiz } from '../../components';
import React, { useContext, useEffect, useState } from 'react';

import { BASE_URL } from '../../consts';
import { Loader } from '../../components';
import { QuizContext } from '../../context';
import axios from 'axios';
import s from './Quiz.module.scss';

const Quiz = (props) => {
	const { isFinished, loadQuiz } = useContext(QuizContext);
	const [loading, setLoading] = useState(true);

	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	useEffect(() => {
		const getQuiz = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/quizes/${props.match.params.id}.json`,
					{
						cancelToken: source.token,
					}
				);
				setLoading(false);
				loadQuiz(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		getQuiz();

		return () => {
			source.cancel();
		};
	});

	return (
		<div className={s.Quiz}>
			<div className={s.QuizWrapper}>
				<h1>Please answer the questions</h1>
				{loading ? <Loader /> : isFinished ? <FinishedQuiz /> : <ActiveQuiz />}
			</div>
		</div>
	);
};

export default Quiz;
