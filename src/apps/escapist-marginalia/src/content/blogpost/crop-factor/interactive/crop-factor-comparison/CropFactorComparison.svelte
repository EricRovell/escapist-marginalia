<script lang="ts">
	import { getContext, onDestroy } from "svelte";

	import { InputSelect } from "@components";
	import { uniqueID } from "$lib/stores";
	import { cropFactorData } from "./crop-factor-data";
	import styles from "./crop-factor-comparison.module.css";

	export let imageSrc = "https://storage.yandexcloud.net/escapist-marginalia/writing/crop-factor-comparison.jpg";

	const t = getContext<Record<string, string>>("t")["crop-factor-comparison"];
	const maskID = uniqueID.get();
	const padding = 1;

	let viewBox = {
		x: -18 - padding,
		y: -12 - padding,
		width: 36 + 2 * padding,
		height: 24 + 2 * padding
	};

	let reference = {
		x: -18,
		y: -12,
		width: 36,
		height: 24,
		cf: 1,
		name: "35mm full-frame"
	};

	let compared = {
		...reference
	};

	const handleChange = (e: Event) => {
		const target = e.target as HTMLSelectElement;
		const { name, value } = target;

		const { name: choiceName, width, height, cf } = cropFactorData.find(item => String(item.cf) === value);
		const view = {
			x: -width / 2,
			y: -height / 2,
			width,
			height,
			cf,
			name: choiceName
		};

		if (name === "crop-factor-reference") {
			reference = view;
		} else {
			compared = view;
		}

		const scale = Math.max(reference.height, compared.height) / 24;

		viewBox = {
			x: -18 * scale - padding,
			y: -12 * scale - padding,
			width: 36 * scale + 2 * padding,
			height: 24 * scale + 2 * padding
		};
	};

	onDestroy(() => {
		uniqueID.remove(maskID);
	});
</script>

<section class="interactive wide">
	<h3>
		{t["title"]}
	</h3>
	<svg
		class="{styles.root}"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="{viewBox.x} {viewBox.y} {viewBox.width} {viewBox.height}"
	>
		<defs>
			<mask id="{maskID}">
				<rect
					class="{styles.mask}"
					x="{compared.x}"
					y="{compared.y}"
					width="{compared.width}"
					height="{compared.height}"
				/>
			</mask>
		</defs>
		<image
			class="{styles.projection}"
			x="{reference.x}"
			y="{reference.y}"
			width="{reference.width}"
			height="{reference.height}"
			href="{imageSrc}"
			style="filter: blur(0.5px);"
			preserveAspectRatio="xMidYMid slice"
		/>
		<image
			class="{styles.projection}"
			x="{reference.x}"
			y="{reference.y}"
			width="{reference.width}"
			height="{reference.height}"
			href="{imageSrc}"
			preserveAspectRatio="xMidYMid slice"
			mask="url(#{maskID})"
		/>
		<rect
			class="{styles.compared}"
			x="{reference.x}"
			y="{reference.y}"
			width="{reference.width}"
			height="{reference.height}"
			stroke="yellow"
			stroke-width="0.1px"
			stroke-dasharray="0.5px"
			fill="none"
		/>
		<rect
			class="{styles.compared}"
			x="{compared.x}"
			y="{compared.y}"
			width="{compared.width}"
			height="{compared.height}"
			stroke="yellow"
			stroke-width="0.1px"
			stroke-dasharray="0.5px"
			fill="none"
		/>
		<text
			class="{styles.text}"
			x="{reference.x + reference.height / 20}"
			y="{reference.y + reference.height / 12}"
			style="font-size: {reference.height / 20}px"
			fill="yellow"
		>
			{reference.name}
		</text>
		{#if reference.name !== compared.name}
			<text
				class="{styles.text}"
				x="{compared.x + compared.height / 20}"
				y="{-compared.y - compared.height / 20}"
				style="font-size: {compared.height / 20}px"
				fill="yellow"
			>
				{compared.name}
			</text>
		{/if}
	</svg>
	<form
		class="{styles.form}"
		on:change="{handleChange}"
		on:submit|preventDefault
	>
		<InputSelect
			name="crop-factor-reference"
			options="{cropFactorData.map(item => ({
				label: item.name,
				value: String(item.cf),
				selected: item.cf === 1.0
			}))}"
		>
			{t["reference"]}
		</InputSelect>
		<InputSelect
			name="crop-factor-compared"
			options="{cropFactorData.map(item => ({
				label: item.name,
				value: String(item.cf),
				selected: item.cf === 1.0
			}))}"
		>
			{t["comparable"]}
		</InputSelect>
	</form>
</section>
