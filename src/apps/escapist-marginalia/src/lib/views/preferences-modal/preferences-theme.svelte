<script lang="ts" context="module">
	export type Theme = "auto" | "light" | "dark";
</script>

<script lang="ts">
	import { Icon, InputRadio } from "ui";
	import { iconMoon, iconSun, iconSunset } from "ui/icons";

	import { theme, type ThemeOptions } from "$lib/stores";

	const options = [
		{
			icon: iconSun,
			label: "Light",
			value: "light",
			checked: $theme.type === "user" && $theme.value === "light"
		},
		{
			icon: iconSunset,
			label: "System",
			value: "system",
			checked: $theme.type === "system"
		},
		{
			icon: iconMoon,
			label: "Dark",
			value: "dark",
			checked: $theme.type === "user" && $theme.value === "dark"
		}
	];

	const handleChange = (event: InputEvent) => {
		const target = event.target as HTMLInputElement;
		const value = target.value as ThemeOptions;
		theme.set(value);
	};
</script>

<InputRadio.Group
	name="theme"
	on:change={handleChange}
>
	<h4 slot="title">
		Theme
	</h4>
	{#each options as { checked, icon, label, value }}
		<InputRadio.Button
			{value}
			checked={checked}
		>
			<Icon path="{icon}" /> {label}
		</InputRadio.Button>
	{/each}
</InputRadio.Group>
