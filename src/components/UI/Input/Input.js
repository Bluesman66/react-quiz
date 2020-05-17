import React from 'react';
import s from './Input.module.scss';

const isInvalid = ({ valid, touched, shouldValidate }) => {
	return !valid && shouldValidate && touched;
};

const Input = (props) => {
	const inputType = props.type || 'text';
	const cls = [s.Input];
	const htmlFor = `${inputType}-${Math.random()}`;

	if (isInvalid(props)) {
		cls.push(s.invalid);
	}

	return (
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				type={inputType}
				name
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			/>
			{isInvalid(props) ? (
				<span>{props.error || 'Please enter correct value'}</span>
			) : null}
		</div>
	);
};

export default Input;
