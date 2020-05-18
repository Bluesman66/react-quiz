const createControl = (config, validation) => {
	return {
		...config,
		validation,
		valid: !validation,
		touched: false,
		value: '',
	};
};

export default createControl;
