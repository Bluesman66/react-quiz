import { Button, Input, Select } from '../../components';
import React, { useState } from 'react';

import { Auxiliary } from '../../hoc';
import createControl from '../../form';
import s from './QuizCreator.module.scss';

const createOptionControl = (number) => {
	return createControl(
		{
			label: `Variant ${number}`,
			error: 'Value can not be empty',
			id: number,
		},
		{ required: true }
	);
};

const createFormControls = () => {
	return {
		question: createControl(
			{
				label: 'Please enter question',
				error: 'Question can not be empty',
			},
			{ required: true }
		),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
	};
};

const QuizCreator = () => {
	const [quiz, setQuiz] = useState([]);
	const [correctAnswerId, setCorrectAnswerId] = useState(1);
	const [formControls, setFormControls] = useState(createFormControls());

	const submit = (event) => {
		event.preventDefault();
	};

	const addQuestion = () => {};

	const createQuiz = () => {};

	const change = (value, controlName) => {};

	const renderControls = () => {
		return Object.keys(formControls).map((controlName, index) => {
			const control = formControls[controlName];

			return (
				<Auxiliary key={controlName + index}>
					<Input
						value={control.value}
						label={control.label}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						error={control.error}
						onChange={(event) => change(event.target.value, controlName)}
					/>
					{index === 0 ? <hr /> : null}
				</Auxiliary>
			);
		});
	};

	const selectChange = (event) => {
		setCorrectAnswerId(+event.target.value);
	};

	const select = (
		<Select
			label="Please select correct answer"
			value={correctAnswerId}
			onChange={selectChange}
			options={[
				{ text: 1, value: 1 },
				{ text: 2, value: 2 },
				{ text: 3, value: 3 },
				{ text: 4, value: 4 },
			]}
		/>
	);

	return (
		<div className={s.QuizCreator}>
			<div>
				<h1>Quiz Creator</h1>
				<form onSubmit={submit}>
					{renderControls()}
					{select}
					<Button type="primary" onClick={addQuestion}>
						Add question
					</Button>
					<Button type="success" onClick={createQuiz}>
						Create quiz
					</Button>
				</form>
			</div>
		</div>
	);
};

export default QuizCreator;
