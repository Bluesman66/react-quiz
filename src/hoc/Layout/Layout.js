import { Drawer, MenuToggle } from '../../components';
import React, { useContext, useState } from 'react';

import { QuizContext } from '../../context';
import s from './Layout.module.scss';

const Layout = ({ children }) => {
	const { auth } = useContext(QuizContext);
	const [menu, setMenu] = useState(false);

	const isAuthenticated = !!auth.token;

	const toggleMenu = () => {
		setMenu((menu) => !menu);
	};

	return (
		<div className={s.Layout}>
			<Drawer
				isOpen={menu}
				isAuthenticated={isAuthenticated}
				onClose={toggleMenu}
			/>
			<MenuToggle onToggle={toggleMenu} isOpen={menu} />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
