import { AUTH_LOGOUT, AUTH_SUCCESS } from '../types';

const initialState = {
	token: null,
};

const handlers = {
	[AUTH_LOGOUT]: (state) => state,
	[AUTH_SUCCESS]: (state) => state,
	DEFAULT: (state) => state,
};

const authReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default [authReducer, initialState];
