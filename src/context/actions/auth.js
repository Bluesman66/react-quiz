import { AUTH_LOGOUT, AUTH_SUCCESS } from '../types';

import axios from 'axios';

export function authAction(email, password, isLogin) {
	return async (dispatch) => {
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};

		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnmmD-gjpkSWDwRLfb8IUQ_ICWK7_kFnc`;

		if (isLogin) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnmmD-gjpkSWDwRLfb8IUQ_ICWK7_kFnc`;
		}

		const response = await axios.post(url, authData);
		const data = response.data;

		const expirationDate = new Date(
			new Date().getTime() + data.expiresIn * 1000
		);

		localStorage.setItem('token', data.idToken);
		localStorage.setItem('userId', data.localId);
		localStorage.setItem('expirationDate', expirationDate);

		dispatch(authSuccessAction(data.idToken));
		dispatch(autoLogoutAction(data.expiresIn));
	};
}

export function autoLogoutAction(time) {
	return (dispatch) => {
		const timeout = setTimeout(() => {
			dispatch(logoutAction());
			clearTimeout(timeout);
		}, time * 1000);
	};
}

export function logoutAction() {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('expirationDate');
	return {
		type: AUTH_LOGOUT,
	};
}

export function autoLoginAction() {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logoutAction());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logoutAction());
			} else {
				dispatch(authSuccessAction(token));
				dispatch(
					autoLogoutAction(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
}

export function authSuccessAction(token) {
	return {
		type: AUTH_SUCCESS,
		payload: token,
	};
}
