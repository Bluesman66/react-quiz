import React, { useState } from 'react';

import { MenuToggle } from '../../components';
import s from './Layout.module.scss';

const Layout = ({ children }) => {
	const [menu, setMenu] = useState(false);

	const toggleMenuHandler = () => {
		setMenu((menu) => !menu);
	};

	return (
		<div className={s.Layout}>
			<MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
