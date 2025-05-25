import { createContext, type ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { isNullable } from "utils/validators";

interface State {
	fullscreen: boolean;
	loop: boolean;
	refCanvas: HTMLCanvasElement | null;
	stopped: boolean;
}

function createState() {
	const [ state, setState ] = createStore<State>({
		fullscreen: false,
		loop: false,
		refCanvas: null,
		stopped: false
	});

	const setCanvasRef = (ref: HTMLCanvasElement) => setState("refCanvas", ref);

	const handleTogglePlay = () => {
		setState("loop", value => !value);
	};

	const handlePlayState = (state: boolean) => setState("loop", state);

	const isPaused = () => !state.loop;

	const handleFullscreen = () => {
		setState("fullscreen", value => !value);
	};

	const handleIntersect = (entry: IntersectionObserverEntry) => {
		if (!state.stopped) {
			setState({ loop: entry.isIntersecting });
		}
	};

	function handleDownload() {
		if (!state.refCanvas) {
			return;
		}

		const link = document.createElement("a");
		link.download = "canvas.png";
		link.href = state.refCanvas.toDataURL();
		link.click();
	}

	return {
		handleDownload,
		handleFullscreen,
		handleIntersect,
		handlePlayState,
		handleTogglePlay,
		isPaused,
		setCanvasRef,
		setState,
		state
	};
}

const SketchContext = createContext<ReturnType<typeof createState>>();

export function SketchProvider(props: ParentProps) {
	const state = createState();

	return (
		<SketchContext.Provider value={state}>
			{props.children}
		</SketchContext.Provider>
	);
}

export function useSketch() {
	const value = useContext(SketchContext);

	if (isNullable(value)) {
		throw new Error("useSketch must be used within a SketchContext.Provider");
	}

	return value;
}
