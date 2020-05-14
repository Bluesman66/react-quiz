import React, { useContext } from 'react';

import { QuizContext } from '../../../../context';
import s from './AnswerItem.module.scss';

const AnswerItem = (props) => {
	const { getAnswerId } = useContext(QuizContext);
	return (
		<li
			className={s.AnswerItem}
			onClick={() => getAnswerId(props.answer.id)}
		>
			{props.answer.text}
		</li>
	);
};

export default AnswerItem;
