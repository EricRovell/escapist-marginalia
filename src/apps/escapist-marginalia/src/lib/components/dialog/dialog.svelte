<script lang="ts">
	import { afterUpdate, createEventDispatcher } from "svelte";
	import { preventPageScroll } from "utils";

	import { Button } from "../button";
	import { Icon } from "../icon";
	import { iconCancel } from "@icons";
	import styles from "./dialog.module.css";
	import { clickOutside, shortcut } from "../../actions";

	export let className = "";
	export let element: HTMLDialogElement | undefined = undefined;
	export let open = false;

	const dispatch = createEventDispatcher();

	const handleOpen = () => {
		open = true;
		element.showModal();
		dispatch("open");
	};

	const handleClose = () => {
		open = false;
		element.close();
		dispatch("close");
	};

	afterUpdate(() => {
		open
			? handleOpen()
			: handleClose();

		preventPageScroll(open);
		
		if (open) {
			document.documentElement.setAttribute("inert", "inert");
		} else {
			document.documentElement.removeAttribute("inert");
		}
	});
</script>

<dialog
	bind:this={element}
	class="{styles.dialog} {className}"
	on:close
	use:shortcut={{
		active: open,
		code: "Escape",
		callback: handleClose
	}}
>
	<div class={styles.wrapper}>
		<aside
			class={styles.modal}
			use:clickOutside={{ active: open, callback: handleClose }}
		>
			<header>
				<slot name="title" />
				<Button on:click={handleClose} type="button" icon appearance="ghost">
					<Icon path="{iconCancel}" />
				</Button>
			</header>
			<div class={styles.content}>
				<div>
					<slot />
				</div>
			</div>
		</aside>
	</div>
</dialog>
