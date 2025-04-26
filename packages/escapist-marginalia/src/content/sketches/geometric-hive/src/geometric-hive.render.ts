import { randBool, randItem } from "utils/random";

import type { CreateSketch, Renderer } from "ui";

import { DEFAULT_OPTIONS, type Options } from "./geometric-hive.options";
import { Particle, type Position } from "./particle";

export const createSketch: CreateSketch = (options: Options = DEFAULT_OPTIONS) => {
	const particles: Particle[] = [];
	const holes: Position[] = [];
	let columns: number;
	let rows: number;

	const setup: Renderer = ({ height, width }) => {
		Particle.size = options["particle-size"];
		Particle.speedBase = options["particle-speed-base"];

		columns = Math.floor(width / options["particle-size"]);
		rows = Math.floor(height / options["particle-size"]);

		for (let x = 0; x < columns; x++) {
			for (let y = 0; y < rows; y++) {
				const position: Position = {
					x: x * options["particle-size"],
					y: y * options["particle-size"]
				};

				if (randBool(options["gap-frequency"])) {
					particles.push(new Particle({ gap: options["particle-gap"], position }));
				} else {
					holes.push(position);
				}
			}
		}
	};

	const draw: Renderer = ({ context, height, width }) => {
		context.fillStyle = options.background;
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
		setup,
		update(newOptions?: Options) {
			options = {
				...options,
				...newOptions
			};
		}
	};
};
