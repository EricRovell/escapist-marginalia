<aside class="wrapper">
	<svg viewBox="0 0 100 100">
		<title>Work in Progress</title>
		<path fill="#ff824c" d="M72.43,60.06,59.62,42.16V24.27L54.48,9.92A2,2,0,0,0,52.59,8.6H47.41A2,2,0,0,0,46,9.19V79.64H78.05V75.73Z" />
		<path fill="#ff9a4c" d="M46,9.19a1.92,1.92,0,0,0-.47.73L40.38,24.27V42.16L27.57,60.06,22,75.73v3.91H71.44l-25-69.72A1.81,1.81,0,0,0,46,9.19Z" />
		<path fill="#fbf0a8" d="M64.42,60.06h8L59.62,24.27h-8L46.69,42.16Z" />
		<path fill="#fffbdb" d="M51.61,24.27H40.38L27.57,60.06H64.42Z" />
		<path fill="#e85241" d="M80.63,75.73H74L64.83,87.48h20V83.56L82.52,77A2,2,0,0,0,80.63,75.73Z" />
		<path fill="#fc6749" d="M74,75.73H19.37A2,2,0,0,0,17.48,77l-2.34,6.52v3.92H76.85V83.56Z" />
		<path fill="#4c5a80" d="M96,83.56H88V91.4h8a3.92,3.92,0,1,0,0-7.84Z" />
		<path fill="#5c6b96" d="M92,87.48a4,4,0,0,0-4-3.92H4A3.92,3.92,0,1,0,4,91.4H88A4,4,0,0,0,92,87.48Z" />
	</svg>
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
