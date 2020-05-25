import React, { useState } from 'react';

import { Button } from '../../components';
import { Input } from '../../components';
import axios from 'axios';
import is from 'is_js';
import s from './Auth.module.scss';

const Auth = () => {
	const [formValid, setFormValid] = useState(false);
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

	const validateForm = (formControls) => {
		let isFormValid = true;

		Object.keys(formControls).forEach((controlName) => {
			isFormValid = formControls[controlName].valid && isFormValid;
		});

		return isFormValid;
	};

	const change = (event, controlName) => {
		const formControlsClone = { ...formControls };
		const control = { ...formControlsClone[controlName] };

		control.value = event.target.value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);

		formControlsClone[controlName] = control;

		setFormControls(formControlsClone);
		setFormValid(validateForm(formControlsClone));
	};

	const login = async () => {
		const authData = {
			email: formControls.email.value,
			password: formControls.password.value,
			returnSecureToken: true,
		};
		try {
			const response = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
				AIzaSyDnmmD-gjpkSWDwRLfb8IUQ_ICWK7_kFnc`,
				authData
			);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const register = async () => {
		const authData = {
			email: formControls.email.value,
			password: formControls.password.value,
			returnSecureToken: true,
		};
		try {
			const response = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
				AIzaSyDnmmD-gjpkSWDwRLfb8IUQ_ICWK7_kFnc`,
				authData
			);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

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
					<Button type="success" onClick={login} disabled={!formValid}>
						Log In
					</Button>
					<Button type="primary" onClick={register} disabled={!formValid}>
						Register
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Auth;
