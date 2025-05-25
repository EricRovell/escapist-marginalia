import { Show } from "solid-js";
import { Button } from "ui";
import { IconDownload, IconFullscreen, IconPause, IconPlay, IconReset, IconStop } from "ui/icons";

import { useSketch } from "./sketch.context";

import styles from "./sketch.module.css";

interface Props {
	onReset?: VoidFunction;
	onStop?: VoidFunction;
}

export function SketchControls(props: Props) {
	const { handleDownload, handleFullscreen, handleTogglePlay, state } = useSketch();

	return (
		<fieldset class={styles.controls}>
			<Button appearance="outline" icon onClick={props.onReset}>
				<IconReset />
			</Button>
			<Button appearance="outline" icon onClick={handleTogglePlay} title={state.loop ? "Pause" : "Play"}>
				<Show when={state.loop} fallback={<IconPlay />}>
					<IconPause />
				</Show>
			</Button>
			<Button appearance="outline" icon onClick={props.onStop}>
				<IconStop />
			</Button>
			<Button appearance="outline" disabled={state.stopped} icon onClick={handleDownload}>
				<IconDownload />
			</Button>
			<Button appearance="outline" disabled icon onClick={handleFullscreen}>
				<IconFullscreen />
			</Button>
		</fieldset>
	);
}
