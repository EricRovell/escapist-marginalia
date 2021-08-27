export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link";

export interface Project {
	name: string;
	repository: string;
	description: string;
	npm: string;
}