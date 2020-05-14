import React from 'react';
import s from './Layout.module.scss';

const Layout = ({ children }) => {
	return (
		<div className={s.Layout}>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
