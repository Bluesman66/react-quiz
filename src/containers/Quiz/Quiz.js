import { ActiveQuiz, FinishedQuiz } from '../../components';
import React, { useContext, useEffect } from 'react';

import { Loader } from '../../components';
import { QuizContext } from '../../context';
import axios from 'axios';
import { fetchQuizById } from '../../context/actions/quiz';
import s from './Quiz.module.scss';

const Quiz = (props) => {
	const { quiz, dispatch } = useContext(QuizContext);
	const { isFinished, loading } = quiz;

	useEffect(() => {
		const source = axios.CancelToken.source();
		dispatch(fetchQuizById(props.match.params.id, source.token));
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
