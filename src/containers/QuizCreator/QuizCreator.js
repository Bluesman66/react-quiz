import { Button, Input, Select } from '../../components';
import React, { useContext } from 'react';
import { validate, validateForm } from '../../form';

import { Auxiliary } from '../../hoc';
import { BASE_URL } from '../../consts';
import { QuizContext } from '../../context';
import axios from 'axios';
import s from './QuizCreator.module.scss';

const QuizCreator = () => {
	const { quizCreator } = useContext(QuizContext);
	const {
		quiz,
		formValid,
		correctAnswerId,
		formControls,
		setQuizCreatorQuiz,
		setQuizCreatorFormValid,
		setQuizCreatorCorrectAnswerId,
		setQuizCreatorFormControls
	} = quizCreator;

	const submit = (event) => {
		event.preventDefault();
	};

	const setQuizCreatorProps = (quiz, formValid, correctAnswerId) => {
		setQuizCreatorQuiz(quiz);
		setQuizCreatorFormValid(formValid);
		setQuizCreatorCorrectAnswerId(correctAnswerId);
		setQuizCreatorFormControls();
	}

	const addQuestion = (event) => {
		event.preventDefault();

		const quizClone = quiz.concat();
		const index = quizClone.length + 1;

		const { question, option1, option2, option3, option4 } = formControls;

		const questionItem = {
			question: question.value,
			id: index,
			correctAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id },
			],
		};

		quizClone.push(questionItem);
		setQuizCreatorProps(quizClone, false, 1);
	};

	const createQuiz = async (event) => {
		event.preventDefault();
		try {
			await axios.post(`${BASE_URL}/quizes.json`, quiz);
			setQuizCreatorProps([], false, 1);
		} catch (error) {
			console.log(error);
		}
	};

	const change = (value, controlName) => {
		const formControlsClone = { ...formControls };
		const control = { ...formControlsClone[controlName] };

		control.touched = true;
		control.value = value;
		control.valid = validate(control.value, control.validation);

		formControlsClone[controlName] = control;

		setQuizCreatorFormControls(formControlsClone);
		setQuizCreatorFormValid(validateForm(formControlsClone));
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
		setQuizCreatorCorrectAnswerId(+event.target.value);
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
