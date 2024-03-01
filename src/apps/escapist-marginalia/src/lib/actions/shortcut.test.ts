// @vitest-environment happy-dom
import { shortcut } from "./shortcut";
import { describe, it, vi, afterEach, beforeAll, afterAll, expect } from "vitest";

const dispatchKeydownEvent = (eventInitDict: KeyboardEventInit) => {
	window.dispatchEvent(new window.KeyboardEvent("keydown", eventInitDict));
};

describe("shortcut", function () {
	let element: HTMLElement;
	let action: ReturnType<typeof shortcut>;

	const spaceKeyCode = "Space";

	beforeAll(() => {
		element = document.createElement("div");
		document.body.appendChild(element);
	});

	afterAll(() => {
		element.remove();
	});

	afterEach(() => {
		action.destroy();
	});

	it("Fires callback when the callback provided", () => {
		const callback = vi.fn();
		action = shortcut(element, { code: spaceKeyCode, callback });
		dispatchKeydownEvent({ code: spaceKeyCode });
		expect(callback).toHaveBeenCalledOnce();
	});
	it("Clicks node when callback not provided", () => {
		const callback = vi.fn();
		action = shortcut(element, { code: spaceKeyCode });
		element.addEventListener("click", callback);
		dispatchKeydownEvent({ code: spaceKeyCode });
		expect(callback).toHaveBeenCalledOnce();
		element.removeEventListener("click", callback);
	});
	it("Does not fire callback when different key pressed", () => {
		const callback = vi.fn();
		action = shortcut(element, { code: spaceKeyCode, callback });
		dispatchKeydownEvent({ code: "KeyA" });
		expect(callback).toHaveBeenCalledTimes(0);
	});
	it("Handles the alt key", () => {
		const callback = vi.fn();
		action = shortcut(element, { code: spaceKeyCode, callback, alt: true });
		dispatchKeydownEvent({ code: spaceKeyCode, altKey: true });
		expect(callback).toHaveBeenCalledTimes(1);
	});
	it("Handles the shift key", () => {
		const callback = vi.fn();
		action = shortcut(element, { code: spaceKeyCode, callback, shift: true });
		dispatchKeydownEvent({ code: spaceKeyCode, shiftKey: true });
		expect(callback).toHaveBeenCalledTimes(1);
	});
	it("Handles ctrl and meta key", () => {
		const callback = vi.fn();
		action = shortcut(element, { code: spaceKeyCode, callback, control: true });
		dispatchKeydownEvent({ code: spaceKeyCode, ctrlKey: true });
		dispatchKeydownEvent({ code: spaceKeyCode, metaKey: true });
		expect(callback).toHaveBeenCalledTimes(2);
	});
	it("Updates key code", () => {
		const callback = vi.fn();
		action = shortcut(element, { code: spaceKeyCode, callback });
		action.update({ code: "KeyA", callback });
		dispatchKeydownEvent({ code: spaceKeyCode });
		dispatchKeydownEvent({ code: "KeyA" });
		expect(callback).toHaveBeenCalledTimes(1);
	});
	it("Does not fire callback when it is inactive", () => {
		const callback = vi.fn();
		action = shortcut(element, { code: spaceKeyCode, callback });
		dispatchKeydownEvent({ code: spaceKeyCode });
		action.update({ active: false, code: spaceKeyCode, callback });
		dispatchKeydownEvent({ code: spaceKeyCode });
		action.update({ code: spaceKeyCode, callback });
		dispatchKeydownEvent({ code: spaceKeyCode });
		expect(callback).toHaveBeenCalledTimes(2);
	});
});
