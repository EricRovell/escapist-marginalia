import { randInt, randFloat } from "$lib/utils/random";

export interface Position {
	x: number;
	y: number;
}

interface ParticleOptions {
	from?: Position;
	gap?: number;
	hue?: number;
	position: Position;
	moving?: boolean;
	speed?: number;
	to?: Position;
}

export class Particle {
	from?: Position;
	gap?: number;
	hue?: number;
	position: Position;
	moving?: boolean;
	speed?: number;
	to?: Position;

	static size = 15;
	static speedBase = 0.05;
	static PRECISION = 1;

	constructor({ gap, position, moving, speed, hue }: ParticleOptions) {
		this.from = { x: 0, y: 0 };
		this.gap = gap ?? 0.5;
		this.hue = hue ?? randInt(0, 360);
		this.moving = moving ?? false;
		this.position = position;
		this.speed = speed ?? (Particle.speedBase + randFloat(0, 0.01));
		this.to = { x: 0, y: 0 };
	}

	isNearHole(hole: Position): boolean {
		const predicates = [
			!this.moving,
			this.position.x >= hole.x - Particle.size,
			this.position.x <= hole.x + Particle.size,
			this.position.y >= hole.y - Particle.size,
			this.position.y <= hole.y + Particle.size,
			((this.from.x !== hole.x) || (this.from.y !== hole.y))
		];

		return predicates.every(result => result);
	}

	move() {
		const x = this.to.x;
		const y = this.to.y;

		this.position.x += (x - this.position.x) * this.speed;
		this.position.y += (y - this.position.y) * this.speed;

		if (
			(Math.abs(this.position.x - x) < Particle.PRECISION) &&
			(Math.abs(this.position.y - y) < Particle.PRECISION)
		) {
			this.position.x = x;
			this.position.y = y;
			this.moving = false;

			// finished moving
			return true;
		}

		return false;
	}

	render(context: CanvasRenderingContext2D) {
		context.beginPath();
		const visibleSize = Particle.size / this.gap;
		const shift = (Particle.size - visibleSize) / 2;
		context.rect(
			this.position.x + shift,
			this.position.y + shift,
			visibleSize,
			visibleSize
		);
		context.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
		context.fill();
		//context.closePath();
	}
}
