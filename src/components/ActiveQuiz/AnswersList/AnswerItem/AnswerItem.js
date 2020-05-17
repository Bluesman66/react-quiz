import React, { useContext } from 'react';

import { QuizContext } from '../../../../context';
import s from './AnswerItem.module.scss';

const AnswerItem = (props) => {
	const { answerClick: answerClick } = useContext(QuizContext);

	const cls = [s.AnswerItem];
	if (props.state) {
		cls.push(s[props.state]);
	}

	return (
		<li
			className={cls.join(' ')}
			onClick={() => answerClick(props.answer.id)}
		>
			{props.answer.text}
		</li>
	);
};

export default AnswerItem;
