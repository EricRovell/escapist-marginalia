<script lang="ts" context="module">
	import type { Sketch } from "@types";
</script>

<script lang="ts">
	import { Link } from "../link";
	import { Image } from "../image";
	import styles from "./card-sketch.module.css";

	export let cover: string;
	export let description: Sketch["description"];
	export let title: Sketch["title"];
	export let url: Sketch["url"];
</script>

<article class="surface-2 {styles["card"]}">
	<Link href="{url}">
		<figure>
			<Image alt="{description}" src="{cover}" width="{500}" height="{500}" />
			<figcaption>
				<h3>{title}</h3>
			</figcaption>
		</figure>
	</Link>
</article>
