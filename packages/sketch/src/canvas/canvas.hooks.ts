import { createEffect, onCleanup } from "solid-js";

import type { Accessor } from "solid-js";

type ResizeHandler = ({ height, width }: { height: number; width: number, }) => void;

export function useResizeObserver(ref: Accessor<HTMLElement | undefined>, handler: ResizeHandler) {
	let observer: ResizeObserver | undefined = undefined;

	createEffect(() => {
		const canvas = ref();

		if (!canvas) {
			return;
		}

		observer = new ResizeObserver(entries => {
			for (const entry of entries) {
				handler({
					height: entry.borderBoxSize[0].blockSize,
					width: entry.borderBoxSize[0].inlineSize
				});
			}
		});

		observer.observe(canvas);
	});

	onCleanup(() => observer?.disconnect());
}

export function useIntersectionObserver(ref: Accessor<HTMLElement | undefined>, handler: (entry: IntersectionObserverEntry) => void, options: IntersectionObserverInit = {}) {
	let observer: IntersectionObserver | undefined = undefined;

	createEffect(() => {
		observer = new IntersectionObserver(entries => {
			for (const entry of entries) {
				handler(entry);
			}
		}, options);

		const canvas = ref();

		if (canvas) {
			observer.observe(canvas);
		}
	});

	onCleanup(() => observer?.disconnect());
}
