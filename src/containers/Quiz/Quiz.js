import { ActiveQuiz, FinishedQuiz } from '../../components';
import React, { useContext, useEffect } from 'react';

import { BASE_URL } from '../../consts';
import { Loader } from '../../components';
import { QuizContext } from '../../context';
import axios from 'axios';
import s from './Quiz.module.scss';

const Quiz = (props) => {
	const { quiz } = useContext(QuizContext);
	const { loading, isFinished, setQuizProps } = quiz;

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
				setQuizProps(false, response.data);
			} catch (error) {
				console.log(error);
			}
		};

		getQuiz();

		return () => {
			source.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.match.params.id]);

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
