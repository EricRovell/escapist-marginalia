import { createSignal, Show, splitProps } from "solid-js";
import { Dialog } from "ui";
import { setAttribute } from "utils";

import { Canvas, type CanvasProps } from "../canvas";
import { useSketch } from "./sketch.context";
import { SketchControls } from "./sketch.controls";

import type { Sketch } from "../canvas/canvas.types";
import type { CreateSketch } from "./sketch.types";

import styles from "./sketch.module.css";

interface SketchProps extends Omit<CanvasProps, "draw" | "height" | "setup" | "width"> {
	createSketch: CreateSketch;
	hideControls?: boolean;
}

export function Sketch(allProps: SketchProps) {
	const [ props, rest ] = splitProps(allProps, [ "loop", "onResize", "onReset", "createSketch", "hideControls" ]);
	const [ sketch, setSketch ] = createSignal(() => props.createSketch());

	const {
		handleIntersect,
		handleTogglePlay,
		isPaused,
		setCanvasRef,
		setState,
		state
	} = useSketch();

	const handleReset = () => {
		// eslint-disable-next-line solid/reactivity
		setSketch(() => () => props.createSketch());
	};

	const handleStop = () => {
		handleReset();

		setState({
			loop: false,
			stopped: true
		});
	};

	return (
		<article class={styles.root}>
			<figure class={styles.figure}>
				<Canvas
					class={styles.canvas}
					data-paused={setAttribute(isPaused())}
					ondblclick={handleTogglePlay}
					onIntersect={handleIntersect}
					ref={setCanvasRef}
					{...rest}
					{...state}
					loop={!state.fullscreen && state.loop}
					{...sketch()()}
				/>
			</figure>
			<Show when={!props.hideControls}>
				<SketchControls
					onReset={handleReset}
					onStop={handleStop}
				/>
			</Show>
			<Dialog onClose={() => setState("fullscreen", false)} open={state.fullscreen}>
				<div style={{ height: "100vh", position: "relative", width: "100%" }}>
					<Show when={state.fullscreen}>
						<Canvas
							{...sketch()()}
							loop={true}
						/>
					</Show>
				</div>
			</Dialog>
		</article>
	);
}
