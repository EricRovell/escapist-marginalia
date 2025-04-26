import { Sketch } from "ui";

import { createSketch } from "./chaos-game.render";

export default () => (
	<>
		<Sketch
			createSketch={createSketch}
			style={{
				"grid-area": "sketch"
			}}
		/>
		<form
			style={{
				background: "rgb(13 18 21)",
				"grid-area": "controls",
				height: "80vh",
				width: "100%"
			}}
		/>
	</>
);
