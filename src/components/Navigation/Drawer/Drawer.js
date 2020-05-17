import React, { Fragment } from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';
import s from './Drawer.module.scss';

const links = [
	{ to: '/', label: 'Quiz List', exact: true },
	{ to: '/auth', label: 'Authorization', exact: false },
	{ to: '/quiz-creator', label: 'Create Quiz', exact: false },
];

const Drawer = (props) => {
	const renderLinks = () => {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink to={link.to} exact={link.exact} activeClassName={s.active} onClick={props.onClose}>
						{link.label}
					</NavLink>
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
