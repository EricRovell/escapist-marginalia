import { randBool, randItem } from "utils/random";

import type { Renderer, SketchConstructor } from "sketch";

import { useModel } from "./geometric-hive.model";
import { Particle, type Position } from "./particle";

export const sketch: SketchConstructor = () => () => {
	const { model } = useModel();

	const particles: Particle[] = [];
	const holes: Position[] = [];
	let columns: number;
	let rows: number;

	const setup: Renderer = ({ height, width }) => {
		Particle.size = model["particle-size"];
		Particle.speedBase = model["particle-speed-base"];

		columns = Math.floor(width / model["particle-size"]);
		rows = Math.floor(height / model["particle-size"]);

		for (let x = 0; x < columns; x++) {
			for (let y = 0; y < rows; y++) {
				const position: Position = {
					x: x * model["particle-size"],
					y: y * model["particle-size"]
				};

				if (randBool(model["gap-frequency"])) {
					particles.push(new Particle({ gap: model["particle-gap"], position }));
				} else {
					holes.push(position);
				}
			}
		}
	};

	const draw: Renderer = ({ context, height, width }) => {
		context.fillStyle = model.background;
		context.fillRect(0, 0, width, height);

		for (let i = 0; i < holes.length; i++) {
			const hole = holes[i];

			const particlesNearDots = particles.filter(particle => particle.isNearHole(hole));

			if (particlesNearDots.length) {
				const [ nextDot ] = randItem(particlesNearDots);

				nextDot.moving = true;
				nextDot.from.x = nextDot.position.x;
				nextDot.from.y = nextDot.position.y;
				nextDot.to.x = hole.x;
				nextDot.to.y = hole.y;

				holes.splice(i, 1);
			}
		}

		for (let i = 0; i < particles.length; i++) {
			const particle = particles[i];

			if (particle.moving) {
				const status = particle.move();

				if (status) {
					holes.push({
						x: particle.from.x,
						y: particle.from.y
					});
				}
			}

			particle.render(context);
		}
	};

	return {
		draw,
		setup
	};
};
