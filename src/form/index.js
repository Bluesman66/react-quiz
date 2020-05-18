const createControl = (config, validation) => {
	return {
		...config,
		validation,
		valid: !validation,
		touched: false,
		value: '',
	};
};

const validate = (value, validation = null) => {
	if (!validation) {
		return true;
	}

	let isValid = true;

	if (validation.required) {
		isValid = value.trim().length > 0 && isValid;
	}

	return isValid;
};

const validateForm = (formControls) => {
	let isFormValid = true;

	for (let control in formControls) {
		if (formControls.hasOwnProperty(control)) {
			isFormValid = formControls[control].valid && isFormValid;
		}
	}

	return isFormValid;
};

export { createControl, validate, validateForm };
