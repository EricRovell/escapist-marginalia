import { createEffect, createSignal, type JSX, mergeProps, onCleanup, splitProps } from "solid-js";
import { createStore } from "solid-js/store";
import { classnames } from "utils";
import { isNullable } from "utils/validators";

import { useIntersectionObserver, useResizeObserver } from "./canvas.hooks";
import { createRenderService } from "./canvas.service";

import type { Renderer } from "./canvas.types";

import styles from "./canvas.module.css";

export interface CanvasProps extends JSX.CanvasHTMLAttributes<HTMLCanvasElement> {
	autoclear?: boolean;
	draw?: Renderer;
	height?: number;
	loop?: boolean;
	onIntersect?: (entry: IntersectionObserverEntry) => void;
	onResize?: (size: { height: number, width: number }) => void;
	pixelRatio?: number;
	ref?: (ref: HTMLCanvasElement) => void;
	setup?: Renderer;
	width?: number;
}

const DEFAULT_PROPS = {
	pixelRatio: isNullable(globalThis.window) ? 1 : globalThis.devicePixelRatio
};

export function Canvas(allProps: CanvasProps) {
	const mergedProps = mergeProps(DEFAULT_PROPS, allProps);
	const [ props, rest ] = splitProps(mergedProps, [
		"autoclear",
		"draw",
		"setup",
		"class",
		"children",
		"loop",
		"onResize",
		"onIntersect",
		"ref"
	]);

	const [ ref, setRef ] = createSignal<HTMLCanvasElement>();

	const [ size, setSize ] = createStore({
		height: 150,
		pixelRatio: isNullable(globalThis.window) ? 1 : globalThis.devicePixelRatio,
		width: 300
	});

	const service = createRenderService();

	createEffect(() => {
		const context = ref()?.getContext("2d");

		if (!context) {
			return;
		}

		service.updateParams({
			autoclear: Boolean(props.autoclear),
			context
		});
	});

	createEffect(() => {
		service.setLoop(Boolean(props.loop));
	});

	createEffect(() => {
		service.updateParams({
			height: size.height,
			pixelRatio: size.pixelRatio,
			width: size.width
		});

		props.onResize?.({
			height: size.height,
			width: size.width
		});
	});

	createEffect(() => {
		service.register({
			draw: props.draw,
			setup: props.setup
		});
	});

	useResizeObserver(ref, size => {
		props.onResize?.(size);
		setSize("width", size.width);
		setSize("height", size.height);

		service.register({
			draw: props.draw,
			setup: props.setup
		});
	});

	useIntersectionObserver(ref, entry => {
		props.onIntersect?.(entry);
	}, { threshold: 0.65 });

	onCleanup(() => service.unregister());

	return (
		<canvas
			class={classnames(styles.canvas, props.class)}
			height={size.height * size.pixelRatio}
			ref={element => {
				setRef(element);
				props.ref?.(element);
			}}
			width={size.width * size.pixelRatio}
			{...rest}
		/>
	);
}
