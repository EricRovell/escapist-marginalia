<script>
	import { page } from "$app/stores";
	import { Meta } from "@components";
</script>

<Meta
	title={$page.status}
	meta={{
		robots: "noindex, nofollow"
	}}
/>

<h1>{$page.status}: {$page.error.message}</h1>
