import { Auth, Quiz, QuizCreator, QuizList } from './containers';
import { Route, Switch } from 'react-router-dom';

import { Layout } from './hoc';
import { QuizState } from './context';
import React from 'react';

function App() {
	return (
		<QuizState>
			<Layout>
				<Switch>
					<Route path="/auth" component={Auth} />
					<Route path="/quiz-creator" component={QuizCreator} />
					<Route path="/quiz/:id" component={Quiz} />
					<Route path="/" component={QuizList} />
				</Switch>
			</Layout>
		</QuizState>
	);
}

export default App;
