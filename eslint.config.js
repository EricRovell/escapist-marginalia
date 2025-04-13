/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import solid from "eslint-plugin-solid/configs/typescript";

export default tseslint.config(
	{
		rules: {
			...eslint.configs.recommended.rules
		}
	},
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		ignores: [
			"**/dist",
			"**/dist-ru",
			"**/node_modules",
			"**/.astro",
		]
	},
	{
		languageOptions: {
			globals: {
				"__dirname": true,
				"DateLike": true,
				"Nullable": true,
				"Nullish": true,
				"Undefinable": true
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				},
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: "latest",
				parserOptions: {
					projectService: true,
					tsconfigRootDir: import.meta.dirname,
				},
				project: [
					"./tsconfig.json",
					"./packages/**/tsconfig.json",
				],
			}
		}
	},
	{
		files: ["**/*.{ts,tsx}"],
		...solid,
		languageOptions: {
			parser: tseslint.parser
		},
	},
	{
		files: [ "**/*.{ts,tsx}" ],
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			perfectionist: perfectionist,
		},
		languageOptions: {
			parser: tseslint.parser
		},
		rules: {
			"perfectionist/sort-array-includes": "error",
			"perfectionist/sort-classes": "error",
			"perfectionist/sort-enums": "error",
			"perfectionist/sort-exports": "error",
			"perfectionist/sort-imports": [
				"error", {
					ignoreCase: true,
					type: "alphabetical",
					order: "asc",
					groups: [
						[ "builtin", "external" ],
						[ "builtin-type", "external-type" ],
						[ "internal" ],
						[ "parent", "sibling" ],
						[ "side-effect" ],
						[ "internal-type", "parent-type", "sibling-type", "index-type" ],
						[ "side-effect-style" ],
						[ "style" ],
						"unknown"
					],
					newlinesBetween: "always",
					internalPattern: [
						"^~/.*"
					]
				}
			],
			"perfectionist/sort-interfaces": "error",
			"perfectionist/sort-jsx-props": [ "error", {
				ignorePattern: [ "Meta", "Show" ],
			}],
			"perfectionist/sort-maps": "error",
			"perfectionist/sort-named-imports": "error",
			"perfectionist/sort-named-exports": "error",
			"perfectionist/sort-object-types": "error",
			"perfectionist/sort-objects": "error",
			"perfectionist/sort-intersection-types": "error",
			"perfectionist/sort-union-types": "error",
			"no-self-assign": "off",
			"no-console": [ "error", { "allow": [ "warn", "error" ] }],
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unused-vars": [
				"error", { "argsIgnorePattern": "_" }
			],
			"@typescript-eslint/consistent-type-definitions": "off",
			"@typescript-eslint/strict-boolean-expressions": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-confusing-void-expression": [ "error", {
				ignoreArrowShorthand: true
			}],
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/restrict-plus-operands": "off",
			"@typescript-eslint/prefer-for-of": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"comma-dangle": ["error", {
				"arrays": "never",
				"objects": "never",
				"imports": "never",
				"exports": "never"
			}],
			"indent": [ "error", "tab", { "SwitchCase": 1 } ],
			"linebreak-style": 0,
			"quotes": [ "error", "double" ],
			"semi": [ "error", "always" ],
			"no-var": "error",
			"curly": "error"
		}
	}
);
