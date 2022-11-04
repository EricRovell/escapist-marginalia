import { radix } from "@ericrovell/radix";

export type Stages = [
	value: number,
	rank: number,
	power: number
];

export const getRanks = (input: number, outputRadix: number): number[] => {
	return radix(input)
		.setRadix(outputRadix)
		.getRanks() as number[];
};

/**
 * Generates decimal number conversion stages as: [ current number value, rank value, rank power ]
 */
export const getConversionStages = (input: number, outputRadix: number): Stages[] => {
	const ranks = getRanks(input, outputRadix);

	const result = [];

	for (let i = 0; i < ranks.length; i++) {
		if (ranks[i]) {
			const power = ranks.length - i - 1;
			result.push([ input, ranks[i], power ]);
			input -= ranks[i] * outputRadix ** power;
		}
	}

	return result;
};
