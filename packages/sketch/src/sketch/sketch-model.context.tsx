import { createContext, type ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { isNullable } from "utils/validators";

export function createModelContext<Model extends object>(defaultModel: Model) {

	function createState() {
		const [ model, setModel ] = createStore<Model>({ ...defaultModel });

		const resetModel = () => {
			setModel({ ...defaultModel });
		};

		return {
			model,
			resetModel,
			setModel
		};
	}

	const ModelContext = createContext<ReturnType<typeof createState>>();

	function ModelProvider(props: ParentProps) {
		const state = createState();

		return (
			<ModelContext.Provider value={state}>
				{props.children}
			</ModelContext.Provider>
		);
	}

	function useModel() {
		const value = useContext(ModelContext);

		if (isNullable(value)) {
			throw new Error("useModel must be used within a ModelContext.Provider");
		}

		return value;
	}

	return {
		ModelProvider,
		useModel
	};
}
