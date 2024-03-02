import { randFloat, randBool, randInt } from "utils/random";
import type { Renderer } from "@components/canvas";
import { options as optionsDefault, type Options } from "./the-attractor.options";

const makeAttractor = (width: number, height: number) => ({
	x: randFloat(0.35 * width, 0.75 * width),
	y: randFloat(0.35 * height, 0.75 * height),
	radius: randFloat(50, 150) + randFloat(-50, 50),
	radialVelocityCoef: 0.001 * randFloat(0.7, 1.3),
	expAngularVelocityCoef: 10000 * randFloat(0.8, 1.2),
	expAngularVelocityMultCoef: 0.01 * randFloat(0.8, 1.2),
	direction: randBool() ? 1 : -1
});

const makeParticle = (width: number, height: number, lifetime: number) => ({
	x: randFloat(-100, width + 100),
	y: randFloat(-100, height + 100),
	saturation: randInt(50, 100),
	lightness: randInt(30, 80),
	lifetime: randFloat(lifetime * 0.8, lifetime * 1.2)
});

export const sketch = (options: Options = optionsDefault) => {
	const hueShift = randInt(0, 360);
	const attractors: ReturnType<typeof makeAttractor>[] = [];
	const particles: ReturnType<typeof makeParticle>[] = [];

	const setup: Renderer = ({ context, width, height }) => {
		context.lineWidth = 1;

		for (let i = 0; i < options.attractors; i++) {
			attractors.push(makeAttractor(width, height));
		}

		for (let i = 0; i < options.particles; i++) {
			const particle = makeParticle(width, height, options.lifetime);
			// to avoid too many deaths / births in first generations
			particle.lifetime = randInt(0, options.lifetime);
			particles.push(particle);
		}
	};

	const draw = ({ context, width, height }) => {
		for (let k = 0; k < particles.length; k++) {
			let particle = particles[k];

			if (particle.lifetime <= 0) {
				particle = makeParticle(width, height, options.lifetime);
				particles[k] = particle;
			}

			const previousPosition = {
				x: particle.x,
				y: particle.y
			};

			attractors.forEach(attractor => {
				const deltaX = previousPosition.x - attractor.x;
				const deltaY = previousPosition.y - attractor.y;
				let distance = Math.hypot(deltaX, deltaY);

				if (distance < 0.001) {
					distance = 0.001;
				}

				const sin = deltaY / distance;
				const cos = deltaX / distance;

				const deltaR = distance - attractor.radius;
				const angularVelocity = attractor.expAngularVelocityMultCoef * Math.exp(- deltaR * deltaR / attractor.expAngularVelocityCoef) * attractor.direction;
				const radialVelocity = - deltaR * attractor.radialVelocityCoef;

				particle.x += radialVelocity * cos - angularVelocity * distance * sin;
				particle.y += radialVelocity * sin + angularVelocity * distance * cos;
			});

			particle.lifetime--;

			const speed = Math.hypot(previousPosition.x - particle.x, previousPosition.y - particle.y) ;
			let hue = Math.min(speed * 100, 300);
			hue = (hue + hueShift) % 360;

			context.beginPath();
			context.moveTo(previousPosition.x, previousPosition.y);
			context.lineTo(particle.x, particle.y);
			context.strokeStyle = `hsl(${hue}, ${particle.saturation}%, ${particle.lightness}%)`;
			context.stroke();
		}
	};

	return {
		draw,
		setup,
		update(newOptions: Options) {
			options = {
				...options,
				...newOptions
			};
		}
	};
};
