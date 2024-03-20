import { afterUpdate, getContext, onMount } from "svelte";
import type { RenderManager, LayerParams } from "./canvas.types";

export function useFigure(manager: RenderManager, params: LayerParams) {
	const { draw, id, setup } = params;

	manager.register(id, { draw, setup });

	return {
		update(nextParams: LayerParams) {
			params = nextParams;
			const { draw, id } = params;
			manager.register(id, { draw });
		},
		destroy() {
			manager.unregister(id);
		}
	};
}

export function useLayerAction(params: () => LayerParams) {
	const manager = getContext<RenderManager>("canvas");

	let action: ReturnType<typeof useFigure>;

	onMount(() => {
		action = useFigure(manager, params());
		return () => {
			action.destroy();
		};
	});

	afterUpdate(() => {
		action?.update(params());
	});
}