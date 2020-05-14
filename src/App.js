import { Layout } from './hoc';
import { Quiz } from './containers';
import { QuizState } from './context';
import React from 'react';

function App() {
	return (
		<QuizState>
			<Layout>
				<Quiz />
			</Layout>
		</QuizState>
	);
}

export default App;
