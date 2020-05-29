import { AUTH_LOGOUT, AUTH_SUCCESS } from '../types';

const initialState = {
	token: null,
};

const handlers = {
	[AUTH_SUCCESS]: (state, { payload }) => ({
		...state,
		token: payload,
	}),
	[AUTH_LOGOUT]: (state) => ({
		...state,
		token: null,
	}),
	DEFAULT: (state) => state,
};

const authReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default [authReducer, initialState];
