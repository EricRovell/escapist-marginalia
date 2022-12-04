import type { RenderArguments } from "@components/canvas";
import { vector, type Vector } from "@ericrovell/vector";

interface BoidOptions {
	forceLimit: number;
	mass: number;
	scale: number;
	separation: number;
	speedLimit: number;
	x: number;
	y: number;
}

interface BehaviourCoef {
	align: number;
	cohesion: number;
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

	constructor({ forceLimit, mass, scale, separation, speedLimit, x, y }: BoidOptions) {
		this.acceleration = vector(0, 0);
		this.forceLimit = forceLimit;
		this.mass = mass;
		this.position = vector(x, y);
		this.scale = scale;
		this.separation = separation;
		this.speed = vector(0, 0);
		this.speedLimit = speedLimit;
		this.x = x;
		this.y = y;
	}

	applyBehaviours(boids: Boid[], coef: BehaviourCoef): void {
		const separateForce = this.separate(boids);
		const alignForce = this.align(boids);
		const cohesionForce = this.cohesion(boids);

		// making forces stronger via sliders
		alignForce.scaleSelf(coef.align);
		cohesionForce.scaleSelf(coef.cohesion);
		separateForce.scaleSelf(coef.separate);

		this.applyForce(separateForce);
		this.applyForce(alignForce);
		this.applyForce(cohesionForce);
	}

	applyForce(force: Vector): void {
		this.acceleration.addSelf(force.scale(1 / this.mass));
	}

	move(): void {
		this.speed.addSelf(this.acceleration);
		this.speed = this.speed.limit(this.speedLimit);
		this.position.addSelf(this.speed);
		// check for the case if the force has stopped
		this.acceleration.set(0, 0);
	}

	// Method checks for nearby boids and steers away
	separate(boids: Boid[]): Vector {
		let sum = vector(0, 0);
		let count = 0;

		// For every boid in the system, check if it is too close
		for (let i = 0; i < boids.length; i++) {
			const distance = this.position.distance(boids[i].position);
			if (distance > 0 && distance < this.separation) {
				// Calculate vector pointing away from neighbour
				const steerAway = this.position.sub(boids[i].position);
				steerAway.normalizeSelf();

				// Weight by distance
				if (distance) {
					steerAway.scaleSelf(1 / distance);
				}

				sum.addSelf(steerAway);
				count++;
			}
		}

		// Average from all close neighbours
		if (count > 0) {
			sum.scaleSelf(1 / count);
			// Our desired vector is the average scaled to maxSpeed
			sum.normalizeSelf();
			sum.scaleSelf(this.speedLimit);
			// Steering = Desired - Velocity
			sum.subSelf(this.speed);
			sum = sum.limit(this.forceLimit);
		}

		return sum;
	}

	align(boids: Boid[]): Vector {
		const neighbourDist = 50;
		const sum = vector(0, 0);
		let count = 0;

		for (let i = 0; i < boids.length; i++) {
			const distance = this.position.distance(boids[i].position);
			if (distance > 0 && distance < neighbourDist) {
				// velocity vector sum of all close neighbours makes it align
				sum.addSelf(boids[i].speed);
				count++;
			}
		}

		if (count > 0) {
			sum.scaleSelf(1 / count);
			sum.normalizeSelf();
			sum.scaleSelf(this.speedLimit);

			const steer = sum
				.sub(this.speed)
				.limit(this.forceLimit);

			return steer;
		} else {
			// no one close around => zero force
			return vector(0, 0);
		}
	}

	cohesion(boids: Boid[]): Vector {
		const neighborDist = 50;
		const sum = vector(0, 0);
		let count = 0;

		for (let i = 0; i < boids.length; i++) {
			const distance = this.position.distance(boids[i].position);
			if ((distance > 0) && (distance < neighborDist)) {
				sum.addSelf(boids[i].position);
				count++;
			}
		}

		if (count > 0) {
			// no normalizing => makes force stroger => makes gap closer
			sum.scaleSelf(1 / count);
			return this.seek(sum);
		} else {
			return vector(0, 0);
		}
	}

	// makes seek the desired target
	seek(target: Vector): Vector {
		// Steering = Desired - Velocity
		let desired = target.subSelf(this.position);
		desired = desired.setMagnitude(this.speedLimit);

		let steering = desired.subSelf(this.speed);
		steering = steering.limit(this.forceLimit);

		return steering;
	}

	handleBorders(width: number, height: number) {
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

	render({ context, width, height }: RenderArguments) {
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

		this.handleBorders(width, height);
	}
}
