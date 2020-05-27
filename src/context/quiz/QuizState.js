import QuizContext from './QuizContext';
import React from 'react';
import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
import useEnhancedReducer from 'react-enhanced-reducer-hook';

const logMiddleware = ({ getState }) => {
	return (next) => (action) => {
		console.log('Prev State:', getState());
		console.log('Action:', action);
		next(action);
		console.log('Next State:', getState());
	};
};

const QuizState = ({ children }) => {
	const [state, dispatch] = useEnhancedReducer(...rootReducer, [
		thunk,
		logMiddleware,
	]);

	return (
		<QuizContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export default QuizState;
