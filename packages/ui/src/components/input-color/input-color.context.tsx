import { createContext, createUniqueId, type ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { isNullable } from "utils/validators";

function createState() {
	const pickerID = createUniqueId();
	const swatchID = createUniqueId();

	const [ model, setModel ] = createStore({ h: 0, l: 50, o: 100, s: 50 });

	return {
		model,
		pickerID,
		setModel,
		swatchID
	};
}

const InputColorContext = createContext<ReturnType<typeof createState>>();

export function InputColorProvider(props: ParentProps) {
	const state = createState();

	return (
		<InputColorContext.Provider value={state}>
			{props.children}
		</InputColorContext.Provider>
	);
}

export function useColorContext() {
	const value = useContext(InputColorContext);

	if (isNullable(value)) {
		throw new Error("useColorContext must be used within a InputColorContext.Provider");
	}

	return value;
}
