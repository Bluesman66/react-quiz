import React, { Fragment } from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';
import s from './Drawer.module.scss';

const Drawer = (props) => {
	const renderLinks = (links) => {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink
						to={link.to}
						exact={link.exact}
						activeClassName={s.active}
						onClick={props.onClose}
					>
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

	const links = [{ to: '/', label: 'Quiz List', exact: true }];

	if (props.isAuthenticated) {
		links.push({ to: '/quiz-creator', label: 'Create Quiz', exact: false });
		links.push({ to: '/logout', label: 'Log Out', exact: false });
	} else {
		links.push({ to: '/auth', label: 'Authorization', exact: false });
	}

	return (
		<Fragment>
			<nav className={cls.join(' ')}>
				<ul>{renderLinks(links)}</ul>
			</nav>
			{props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
		</Fragment>
	);
};

export default Drawer;
