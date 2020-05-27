import authReducer from './auth';
import combineReducers from 'react-combine-reducers';
import createReducer from './create';
import quizReducer from './quiz';

const [rootReducer, rootInitialState] = combineReducers({
	quiz: quizReducer,
	create: createReducer,
	auth: authReducer,
});

export { rootReducer, rootInitialState };
