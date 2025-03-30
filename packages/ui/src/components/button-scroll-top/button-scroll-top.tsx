import { isNullable } from "utils/validators";

import { Button } from "../button/button";
import { IconArrowTop } from "../icon";

import styles from "./button-scroll-top.module.css";

const handleClick = () => {
	if (isNullable(globalThis.window)) {
		globalThis.scrollTo({ behavior: "smooth", top: 0 });
	}
};

/**
 * Component reference: https://moderncss.dev/pure-css-smooth-scroll-back-to-top/
 * 
 * Drawback: should not be used on short viewport as
 * the `overflow: hidden` breaks the `sticky` behavior.
 */
export function ButtonScrollTop() {
	return (
		<div class={styles.wrapper}>
			<Button appearance="ghost" class={styles.button} icon onClick={handleClick} variant="accent">
				<IconArrowTop aria-label="Scroll to top" class={styles.icon} />
			</Button>
		</div>
	);
}
