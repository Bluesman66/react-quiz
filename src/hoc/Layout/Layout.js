import { Drawer, MenuToggle } from '../../components';
import React, { useState } from 'react';

import s from './Layout.module.scss';

const Layout = ({ children }) => {
	const [menu, setMenu] = useState(false);

	const toggleMenuHandler = () => {
		setMenu((menu) => !menu);
	};

	return (
		<div className={s.Layout}>
			<Drawer isOpen={menu} />
			<MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
