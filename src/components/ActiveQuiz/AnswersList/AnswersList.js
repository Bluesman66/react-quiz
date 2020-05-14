import AnswerItem from './AnswerItem/AnswerItem';
import React from 'react';
import s from './AnswersList.module.scss';

const AnswersList = (props) => {
	return (
		<ul className={s.AnswersList}>
			{props.answers.map((answer, index) => {
				return (
					<AnswerItem
						key={index}
						answer={answer}
						onAnswerClick={props.onAnswerClick}
					/>
				);
			})}
		</ul>
	);
};

export default AnswersList;
