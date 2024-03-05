// @vitest-environment happy-dom
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { clickOutside } from "../src/actions/click-outside";

describe("click-outside action", function () {
	let target: HTMLElement;
	let sibling: HTMLElement;
	let action: ReturnType<typeof clickOutside>;

	beforeAll(function () {
		target = document.createElement("button");
		target.setAttribute("data-type", "target");
		sibling = document.createElement("div");
		sibling.setAttribute("data-type", "sibling");
		document.body.appendChild(target);
		document.body.appendChild(sibling);
	});

	afterAll(function () {
		target.remove();
		sibling.remove();
	});

	afterEach(function () {
		action.destroy();
	});

	it("Activates callback on outside click", () => {
		const callback = vi.fn();
		action = clickOutside(target, { active: true, callback });

		sibling.click();
		expect(callback).toHaveBeenCalledOnce();
	});

	it("Does not activate callback when disabled", () => {
		const callback = vi.fn();
		action = clickOutside(target, { active: false, callback });

		sibling.click();
		expect(callback).toHaveBeenCalledTimes(0);
	});

	// TODO: happy-dom `contains` implementation seems to be wrong:
	// it does not return `true` when the same node passed as parameter.
	/* it("Does not activate callback when the element clicked", () => {
		const callback = vi.fn();
		action = clickOutside(target, { active: true, callback });

		target.click();
		expect(callback).toHaveBeenCalledTimes(0);
	}); */

	it("Updates parameters", () => {
		const callback = vi.fn();
		action = clickOutside(target, { active: true, callback });
		action.update({ active: false, callback });

		sibling.click();
		expect(callback).toHaveBeenCalledTimes(0);
	});
});
