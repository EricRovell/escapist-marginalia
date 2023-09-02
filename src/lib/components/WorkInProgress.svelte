<script>
	import { SVG } from "@components";
	import { illustrationWip } from "@components/icons/illustrations";
</script>

<aside class="wrapper">
	<SVG
		data={illustrationWip}
	/>
	<p class="message">
		<slot>This page is not ready yet.</slot>
	</p>
</aside>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: min(65ch, 100%);
		height: fit-content;

		& > svg {
			aspect-ratio: 1 / 1;
			width: min(200px, 100%);
			height: fit-content;
		}
	}

	.message {
		text-align: center;
		text-wrap: balance;
	}
</style>
