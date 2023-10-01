import type { Validator } from "@types";

/**
 * Validates the input field value.
 */
export const validate = <T>(value: T, ...validators: Validator<T>[]) => {
	const state = {
		dirty: false,
		valid: true,
		message: ""
	};

	if (!validators || !validators.length) {
		return state;
	}

	for (const validator of validators) {
		const result = validator(value);
		if (!result.valid) {
			return {
				...result,
				dirty: true
			};
		}
	}

	return {
		...state,
		dirty: true
	};
};
