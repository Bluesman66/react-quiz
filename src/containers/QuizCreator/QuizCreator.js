import { Button, Input, Select } from '../../components';
import React, { useContext, useState } from 'react';
import { createControl, validate, validateForm } from '../../form';
import {
	createQuizQuestionAction,
	finishCreateQuizAction,
} from '../../context/actions/create';

import { Auxiliary } from '../../hoc';
import { QuizContext } from '../../context';
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
	const { create, dispatch } = useContext(QuizContext);
	const { quiz } = create;

	const [formValid, setFormValid] = useState(false);
	const [correctAnswerId, setCorrectAnswerId] = useState(1);
	const [formControls, setFormControls] = useState(createFormControls());

	const submit = (event) => {
		event.preventDefault();
	};

	const addQuestion = (event) => {
		event.preventDefault();

		const { question, option1, option2, option3, option4 } = formControls;

		const questionItem = {
			question: question.value,
			id: quiz.length + 1,
			correctAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id },
			],
		};

		dispatch(createQuizQuestionAction(questionItem));

		setFormValid(false);
		setCorrectAnswerId(1);
		setFormControls(createFormControls());
	};

	const createQuiz = async (event) => {
		event.preventDefault();

		setFormValid(false);
		setCorrectAnswerId(1);
		setFormControls(createFormControls());

		dispatch(finishCreateQuizAction());
	};

	const change = (value, controlName) => {
		const formControlsClone = { ...formControls };
		const control = { ...formControlsClone[controlName] };

		control.touched = true;
		control.value = value;
		control.valid = validate(control.value, control.validation);

		formControlsClone[controlName] = control;

		setFormControls(formControlsClone);
		setFormValid(validateForm(formControlsClone));
	};

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
					<Button type="primary" onClick={addQuestion} disabled={!formValid}>
						Add question
					</Button>
					<Button
						type="success"
						onClick={createQuiz}
						disabled={quiz.length === 0}
					>
						Create quiz
					</Button>
				</form>
			</div>
		</div>
	);
};

export default QuizCreator;
