import React, { useState } from 'react';

import { Button } from '../../components';
import { Input } from '../../components';
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

	const change = (event, controlName) => {
		console.log(`${controlName}: ${event.target.value}`);
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
