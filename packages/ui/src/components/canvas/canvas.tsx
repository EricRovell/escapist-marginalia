import { createEffect, createSignal, type JSX, mergeProps, onCleanup, splitProps } from "solid-js";
import { classnames } from "utils";
import { isNullable } from "utils/validators";

import type { Setter} from "solid-js";

import { createRenderService } from "./canvas.service";

import type { Renderer } from "./canvas.types";

import styles from "./canvas.module.css";

export interface CanvasProps extends JSX.CanvasHTMLAttributes<HTMLCanvasElement> {
	autoclear?: boolean;
	draw?: Renderer;
	height?: number;
	loop?: boolean;
	onResize?: VoidFunction;
	pixelRatio?: number;
	ref?: Setter<HTMLCanvasElement | undefined>;
	setup?: Renderer;
	width?: number;
}

const DEFAULT_PROPS = {
	height: 150,
	pixelRatio: isNullable(globalThis.window) ? 1 : globalThis.devicePixelRatio,
	width: 300
};

export function Canvas(allProps: CanvasProps) {
	const mergedProps = mergeProps(DEFAULT_PROPS, allProps);
	const [ props, rest ] = splitProps(mergedProps, [
		"autoclear",
		"draw",
		"setup",
		"class",
		"children",
		"height",
		"loop",
		"pixelRatio",
		"width",
		"onResize",
		"ref"
	]);

	const [ ref, setRef ] = createSignal<HTMLCanvasElement>();
	const service = createRenderService();

	createEffect(() => {
		const context = ref()?.getContext("2d");

		if (!context) {
			return;
		}

		service.updateParams({
			autoclear: Boolean(props.autoclear),
			context,
			loop: Boolean(props.loop)
		});
	});

	createEffect(() => {
		service.updateParams({
			height: props.height,
			pixelRatio: props.pixelRatio,
			width: props.width
		});

		props.onResize?.();
	});

	createEffect(() => {
		service.register({
			draw: props.draw,
			setup: props.setup
		});
	});

	onCleanup(() => service.unregister());

	return (
		<canvas
			class={classnames(styles.canvas, props.class)}
			height={props.height * props.pixelRatio}
			ref={element => {
				setRef(element);
				props.ref?.(element);
			}}
			width={props.width * props.pixelRatio}
			{...rest}
		/>
	);
}
