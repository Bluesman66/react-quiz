import { Button } from '../../components';
import React from 'react';
import s from './Auth.module.scss';

const Auth = () => {
	const login = () => {};

	const register = () => {};

	const submit = (event) => {
		event.preventDefault();
	};

	return (
		<div className={s.Auth}>
			<div>
				<h1>Authorization</h1>
				<form onSubmit={submit} className={s.AuthForm}>
					<input type="text" />
					<input type="text" />
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
