import type { RenderArguments } from "@components/canvas";
import { vector, type Vector } from "@ericrovell/vector";

interface BoidOptions {
	forceLimit?: number;
	mass?: number;
	scale?: number;
	separation: number;
	speedLimit?: number;
	x: number;
	y: number;
}

interface BehaviourCoef {
	align: number;
	cohesion: number;
	perception: number;
	separate: number;
}

export class Boid {
	acceleration: Vector;
	forceLimit: BoidOptions["forceLimit"];
	mass: BoidOptions["mass"];
	position: Vector;
	scale: BoidOptions["scale"];
	separation: BoidOptions["separation"];
	speed: Vector;
	speedLimit: BoidOptions["speedLimit"];
	x: BoidOptions["x"];
	y: BoidOptions["y"];

	constructor({ forceLimit = 0.05, mass = 1, scale = 5, separation, speedLimit = 1.5, x, y }: BoidOptions) {
		this.acceleration = vector(0, 0);
		this.forceLimit = forceLimit;
		this.mass = mass;
		this.position = vector(x, y);
		this.scale = scale;
		this.separation = separation;
		this.speed = vector(0, 0).random().setMagnitude(Math.random() * speedLimit);
		this.speedLimit = speedLimit;
		this.x = x;
		this.y = y;
	}

	applyBehaviours(boids: Boid[], coef: BehaviourCoef): void {
		let count = 0;

		const alignForce = vector(0, 0);
		const cohesionForce = vector(0, 0);
		const separationForce = vector(0, 0);

		for (const boid of boids) {
			const dist = this.position.distance(boid.position);

			if (boid !== this && dist < coef.perception) {
				alignForce.addSelf(boid.speed);
				cohesionForce.addSelf(boid.position);
				separationForce.addSelf(
					// steering
					this.position.sub(boid.position).scaleSelf(dist ** 2, true)
				);

				count++;
			}
		}

		if (count) {
			alignForce
				.scaleSelf(count, true)
				.setMagnitudeSelf(this.speedLimit)
				.subSelf(this.speed)
				.limitSelf(this.forceLimit)
				.scaleSelf(coef.align);

			cohesionForce
				.scaleSelf(count, true)
				.subSelf(this.position)
				.setMagnitudeSelf(this.speedLimit * 0.75)
				.subSelf(this.speed)
				.limitSelf(this.forceLimit)
				.scaleSelf(coef.cohesion);

			separationForce
				.scaleSelf(count, true)
				.setMagnitudeSelf(this.speedLimit)
				.subSelf(this.speed)
				.limitSelf(this.forceLimit)
				.scaleSelf(coef.separate);
		}

		this.applyForces(alignForce, cohesionForce, separationForce);
	}

	applyForces(...forces: Vector[]): void {
		for (const force of forces) {
			this.acceleration.addSelf(
				force.scale(this.mass, true)
			);
		}
	}

	move(): void {
		this.position.addSelf(this.speed);
		this.speed.addSelf(this.acceleration);
		this.speed = this.speed.limit(this.speedLimit);
		// check for the case if the force has stopped
		this.acceleration.set(0, 0);
	}

	handleBorders(width: number, height: number, bound = false) {
		if (bound) {
			if (this.position.x > width || this.position.x < 0) {
				this.speed.x *= -1;
			}

			if (this.position.y > height || this.position.y < 0) {
				this.speed.y *= -1;
			}
		} else {
			// makes the canvas like infinite world alike round earth
			if (this.position.x < -this.scale) {
				this.position.x = width + this.scale;
			}
			if (this.position.y < -this.scale) {
				this.position.y = height + this.scale;
			}
			if (this.position.x > width + this.scale) {
				this.position.x = -this.scale;
			}
			if (this.position.y > height + this.scale) {
				this.position.y = -this.scale;
			}
		}
	}

	render({ context }: RenderArguments, showPerception = false, perception?: number): void {
		if (showPerception) {
			context.beginPath();
			context.strokeStyle = "rgb(200 200 200 / 0.2)";
			context.lineWidth = 0.5;
			context.arc(this.position.x, this.position.y, perception, 0, 2 * Math.PI, false);
			context.closePath();
			context.stroke();
		}

		const phi = this.speed.getPhi() + Math.PI / 2;

		context.fillStyle = "rgb(127 127 127)";
		context.strokeStyle = "rgb(200 200 200)";
		context.lineWidth = 1;

		context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(phi);
		context.beginPath();
		context.moveTo(0, -this.scale * 2);
		context.lineTo(-this.scale, this.scale * 2);
		context.lineTo(this.scale, this.scale * 2);
		context.closePath();
		context.restore();
		context.fill();
		context.stroke();
	}
}
