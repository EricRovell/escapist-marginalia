import { splitProps } from "solid-js";
import { Button, Dialog, type DialogProps } from "ui";
import { IconCancel } from "ui/icons";

import styles from "./modal-fullscreen.module.css";

export function ModalFullscreen(allprops: DialogProps) {
	const [ props, rest ] = splitProps(allprops, [ "children" ]);

	return (
		<Dialog {...rest}>
			<div class={styles.wrapper}>
				{props.children}
				<Button
					appearance="fill"
					class={styles.close}
					icon
					onClick={rest.onClose}
					variant="neutral"
				>
					<IconCancel />
				</Button>
			</div>
		</Dialog>
	);
}
