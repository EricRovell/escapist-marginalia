import type { Stages } from "./decimal-conversion-stages.helpers";

type MathBuilder = (steps: Stages[], radix: number) => string;

export const buildMathPowerInequalities: MathBuilder = (steps, radix) => {
	const x = steps.reduce((acc, curr) => {
		const [ value, , power ] = curr;
		return acc + String.raw`${radix}^${power} &\leq ${value} &\leq ${radix}^${power + 1}\\`;
	}, "");

	return String.raw`
		\begin{aligned}
		${x}
		\end{aligned}
	`;
};

export const buildMathDifferences: MathBuilder = (steps, radix) => {
	const x = steps.reduce((acc, curr) => {
		const [ value, rank, power ] = curr;
		return acc + String.raw`${value} &- {\color{#7A82E3}${rank}} \cdot ${radix}^${power}\\`;
	}, "");

	return String.raw`
		\begin{aligned}
		${x}
		\end{aligned}
	`;
};

export const buildMathRanks = (ranks: number[], radix: number): string => {
	const powers = ranks.
		map((value, index) => String.raw`${radix}^${ranks.length - index - 1}`)
		.join("&");

	return String.raw`
		\begin{array}{${Array(ranks.length).fill("c").join(":")}}
		${powers}\\ \hline
		${ranks.join("&")}\\
		\end{array}
	`;
};
