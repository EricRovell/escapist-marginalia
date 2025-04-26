/* eslint-disable solid/reactivity */

import { createSignal, Show, splitProps } from "solid-js";
import { createStore } from "solid-js/store";

import { setAttr } from "../../utils";
import { Button } from "../button/button";
import { Canvas, type CanvasProps } from "../canvas";
import { IconDownload, IconPause, IconPlay, IconReset, IconStop } from "../icon";
import { useIntersectionObserver, useResizeObserver } from "./sketch.hooks";

import type { Sketch } from "../canvas/canvas.types";
import type { CreateSketch } from "./sketch.types";

import styles from "./sketch.module.css";

interface SketchProps extends Omit<CanvasProps, "draw" | "height" | "setup" | "width"> {
	createSketch: CreateSketch;
	onReset?: VoidFunction;
}

export function Sketch(allProps: SketchProps) {
	const [ props, rest ] = splitProps(allProps, [ "loop", "onResize", "onReset", "createSketch" ]);

	const [ ref, setRef ] = createSignal<HTMLCanvasElement>();

	const [ store, setStore ] = createStore({
		height: 300,
		loop: props.loop,
		stopped: props.loop,
		width: 300
	});

	const handlePause = () => setStore({ loop: false, stopped: true });

	const handlePlay = (state?: boolean) => {
		if (typeof state !== "boolean") {
			setStore("loop", state => !state);
		} else {
			setStore("loop", state);
		}

		setStore(state => ({ stopped: !state.loop }));
	};

	const [ sketch, setSketch ] = createSignal(props.createSketch(undefined, handlePause));

	const handleReset = () => {
		setSketch(props.createSketch(undefined, handlePause));
		props.onReset?.();
	};

	const handleStop = () => {
		handleReset();
		setStore({
			loop: false,
			stopped: true
		});
	};

	useResizeObserver(ref, ({ height, width }) => {
		requestAnimationFrame(() => {
			setStore({ height, width });
			props.onResize?.();
			handleReset();
		});
	});

	useIntersectionObserver(ref, entry => {
		if (!store.stopped) {
			setStore({ loop: entry.isIntersecting });
		}
	}, { threshold: 0.65 });

	function handleDownload() {
		const canvas = ref();

		if (!canvas) {
			return;
		}

		const link = document.createElement("a");
		link.download = "canvas.png";
		link.href = canvas.toDataURL();
		link.click();
	}

	const isPaused = () => !store.loop;

	return (
		<article class={styles.root}>
			<figure class={styles.figure}>
				<Canvas
					class={styles.canvas}
					data-paused={setAttr(isPaused())}
					ondblclick={() => handlePlay()}
					ref={setRef}
					{...rest}
					{...store}
					{...sketch}
				/>
			</figure>
			<fieldset class={styles.controls}>
				<Button appearance="outline" icon onClick={handleReset}>
					<IconReset />
				</Button>
				<Button appearance="outline" icon onClick={() => handlePlay()} title={store.loop ? "Pause" : "Play"}>
					<Show when={store.loop} fallback={<IconPlay />}>
						<IconPause />
					</Show>
				</Button>
				<Button appearance="outline" icon onClick={handleStop}>
					<IconStop />
				</Button>
				<Button appearance="outline" disabled={store.stopped} icon onClick={handleDownload}>
					<IconDownload />
				</Button>
			</fieldset>
		</article>
	);
}
