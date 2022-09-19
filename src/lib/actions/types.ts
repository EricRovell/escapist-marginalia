export interface ActionReturn<Parameter> {
	update?: (parameter: Parameter) => void;
	destroy?: () => void;
}

export interface Action<Parameter = void, Return = ActionReturn<Parameter>> {
	<Node extends HTMLElement>(node: Node, parameter: Parameter): Return;
}

export interface ActionReturnAsync<Parameter> {
	update?: (parameter: Parameter) => Promise<void>;
	destroy?: () => void;
}

export interface ActionAsync<Parameter = void, Return = ActionReturnAsync<Parameter>> {
	<Node extends HTMLElement>(node: Node, parameter: Parameter): Return;
}
