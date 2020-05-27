import React, { useContext } from 'react';

import { QuizContext } from '../../../../context';
import { answerClickAction } from '../../../../context/actions/quiz';
import s from './AnswerItem.module.scss';

const AnswerItem = (props) => {
	const { dispatch } = useContext(QuizContext);

	const cls = [s.AnswerItem];
	if (props.state) {
		cls.push(s[props.state]);
	}

	return (
		<li
			className={cls.join(' ')}
			onClick={() => dispatch(answerClickAction(props.answer.id))}
		>
			{props.answer.text}
		</li>
	);
};

export default AnswerItem;
