import React, { useContext, useEffect } from 'react';

import { QuizContext } from '../../context';
import { Redirect } from 'react-router-dom';
import { logoutAction } from '../../context/actions/auth';

const Logout = () => {
	const { dispatch } = useContext(QuizContext);

	useEffect(() => {
		dispatch(logoutAction());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Redirect to={'/'} />;
};

export default Logout;
