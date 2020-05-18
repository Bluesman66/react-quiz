import React, { useState } from 'react';

import { Button } from '../../components';
import { Input } from '../../components';
import is from 'is_js';
import s from './Auth.module.scss';

const Auth = () => {
	const [formControls, setFormControls] = useState({
		email: {
			value: '',
			type: 'email',
			label: 'Email',
			error: 'Please enter correct e-mail',
			valid: false,
			touched: false,
			validation: {
				required: true,
				email: true,
			},
		},
		password: {
			value: '',
			type: 'password',
			label: 'Password',
			error: 'Please enter correct password',
			valid: false,
			touched: false,
			validation: {
				required: true,
				minLength: 6,
			},
		},
	});

	const validateControl = (value, validation) => {
		if (!validation) return true;

		let isValid = true;

		if (validation.required) {
			isValid = value.trim().length > 0 && isValid;
		}

		if (validation.email) {
			isValid = is.email(value) && isValid;
		}

		if (validation.minLength) {
			isValid = value.trim().length >= validation.minLength && isValid;
		}

		return isValid;
	};

	const change = (event, controlName) => {
		const formControlsClone = { ...formControls };
		const control = { ...formControlsClone[controlName] };

		control.value = event.target.value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);

		formControlsClone[controlName] = control;

		setFormControls(formControlsClone);
	};

	const login = () => {};

	const register = () => {};

	const submit = (event) => {
		event.preventDefault();
	};

	const renderInputs = () => {
		return Object.keys(formControls).map((controlName, index) => {
			const control = formControls[controlName];
			return (
				<Input
					key={controlName + index}
					value={control.value}
					type={control.type}
					label={control.label}
					error={control.error}
					valid={control.valid}
					touched={control.touched}
					shouldValidate={!!control.validation}
					onChange={(event) => change(event, controlName)}
				/>
			);
		});
	};

	return (
		<div className={s.Auth}>
			<div>
				<h1>Authorization</h1>
				<form onSubmit={submit} className={s.AuthForm}>
					{renderInputs()}
					<Button type="success" onClick={login}>
						Log In
					</Button>
					<Button type="primary" onClick={register}>
						Register
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Auth;
