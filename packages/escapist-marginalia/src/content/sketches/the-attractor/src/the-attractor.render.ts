import { randInt } from "utils/random";

import type { Renderer, SketchConstructor } from "sketch";

import { makeAttractor, makeParticle } from "./attractor";
import { useModel } from "./the-attractor.model";

export const sketch: SketchConstructor = () => () => {
	const { model } = useModel();

	const hueShift = randInt(0, 360);
	const attractors: ReturnType<typeof makeAttractor>[] = [];
	const particles: ReturnType<typeof makeParticle>[] = [];

	const cleanup = () => {
		attractors.length = 0;
		particles.length = 0;
	};

	const setup: Renderer = ({ context, height, width }) => {
		cleanup();

		context.lineWidth = 1;

		for (let i = 0; i < model.attractors; i++) {
			attractors.push(makeAttractor(width, height));
		}

		for (let i = 0; i < model.particles; i++) {
			const particle = makeParticle(width, height, model.lifetime);
			// to avoid too many deaths / births in first generations
			particle.lifetime = randInt(0, model.lifetime);
			particles.push(particle);
		}
	};

	const draw: Renderer = ({ context, height, width }) => {
		for (let k = 0; k < particles.length; k++) {
			let particle = particles[k];

			if (particle.lifetime <= 0) {
				particle = makeParticle(width, height, model.lifetime);
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
		setup
	};
};
