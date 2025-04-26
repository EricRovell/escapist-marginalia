import { Sketch } from "ui";

import { createSketch } from "./digital-rain.render";

export default () => (
	<>
		<Sketch createSketch={createSketch} />
		<form
			style={{
				background: "rgb(13 18 21)",
				"grid-area": "controls",
				height: "50vh",
				width: "100%"
			}}
		/>
	</>
);
