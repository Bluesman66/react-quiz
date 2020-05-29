import { Auth, Quiz, QuizCreator, QuizList } from './containers';
import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { Layout } from './hoc';
import { Logout } from './components';
import { QuizContext } from './context';
import { autoLoginAction } from './context/actions/auth';

function App() {
	const { auth, dispatch } = useContext(QuizContext);
	const isAuthenticated = !!auth.token;

	useEffect(() => {
		dispatch(autoLoginAction());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let routs = (
		<Switch>
			<Route path="/auth" component={Auth} />
			<Route path="/quiz/:id" component={Quiz} />
			<Route path="/" component={QuizList} />
			<Redirect to="/" />
		</Switch>
	);

	if (isAuthenticated) {
		routs = (
			<Switch>
				<Route path="/quiz-creator" component={QuizCreator} />
				<Route path="/quiz/:id" component={Quiz} />
				<Route path="/logout" component={Logout} />
				<Route path="/" component={QuizList} />
				<Redirect to="/" />
			</Switch>
		);
	}

	return <Layout>{routs}</Layout>;
}

export default withRouter(App);
