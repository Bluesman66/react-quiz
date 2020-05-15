import React, { useContext } from 'react';

import { QuizContext } from '../../../../context';
import s from './AnswerItem.module.scss';

const AnswerItem = (props) => {
	const { onAnswerClick } = useContext(QuizContext);

	const cls = [s.AnswerItem];
	if (props.state) {
		cls.push(s[props.state]);
	}

	return (
		<li
			className={cls.join(' ')}
			onClick={() => onAnswerClick(props.answer.id)}
		>
			{props.answer.text}
		</li>
	);
};

export default AnswerItem;
