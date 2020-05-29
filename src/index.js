import './index.scss';

import * as serviceWorker from './serviceWorker';

import React, { StrictMode } from 'react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuizState } from './context';
import ReactDOM from 'react-dom';

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<QuizState>
				<App />
			</QuizState>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
