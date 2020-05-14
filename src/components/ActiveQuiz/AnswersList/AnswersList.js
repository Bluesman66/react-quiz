import React, { useContext } from 'react';

import AnswerItem from './AnswerItem/AnswerItem';
import { QuizContext } from '../../../context';
import s from './AnswersList.module.scss';

const AnswersList = () => {
	const { answers, answerState } = useContext(QuizContext);
	return (
		<ul className={s.AnswersList}>
			{answers.map((answer, index) => {
				return (
					<AnswerItem
						key={index}
						answer={answer}
						state={answerState ? answerState[answer.id] : null}
					/>
				);
			})}
		</ul>
	);
};

export default AnswersList;
