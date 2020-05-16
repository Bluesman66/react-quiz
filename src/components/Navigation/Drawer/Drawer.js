import React, { Fragment } from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import s from './Drawer.module.scss';

const links = [1, 2, 3];

const Drawer = (props) => {
	const renderLinks = () => {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<a href="/">Link {link}</a>
				</li>
			);
		});
	};

	const cls = [s.Drawer];

	if (!props.isOpen) {
		cls.push(s.close);
	}

	return (
		<Fragment>
			<nav className={cls.join(' ')}>
				<ul>{renderLinks()}</ul>
			</nav>
			{props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
		</Fragment>
	);
};

export default Drawer;
