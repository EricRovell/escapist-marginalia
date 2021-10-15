# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.2.0 (2021-10-15)


### ⚠ BREAKING CHANGES

* **stores:** now supports `system` color theme; auto-subscription added to update `document` attribute.

### Features

* **api:** add sort query param ([8a19e8c](https://github.com/ericrovell/ericrovell.me/commit/8a19e8c9782b56e926a6844d363228ab437dd170))
* **api:** get blogposts categorized ([ef66a50](https://github.com/ericrovell/ericrovell.me/commit/ef66a504076f6bea6896d9f4f4884aa7272d7baa))
* **build:** updated aliases ([08ba12c](https://github.com/ericrovell/ericrovell.me/commit/08ba12ca6d2b46bcb8c0017fc90129f5aa643734))
* **component:** updated `ThemeSelector` with `system` theme state ([40208e5](https://github.com/ericrovell/ericrovell.me/commit/40208e5bc814ce9019d97500c4d277c90d9ef9a2))
* improve visuals for disabled links ([f0a1ec7](https://github.com/ericrovell/ericrovell.me/commit/f0a1ec7a3b60f9b3c3f86f7ca952209a5fd17e7f))
* improved `Footer` contents ([5e84147](https://github.com/ericrovell/ericrovell.me/commit/5e841472b8f180373d39408e545e2af92c0490f7))
* **MenuItem:** links disabled attribute ([380e61e](https://github.com/ericrovell/ericrovell.me/commit/380e61e300807b297791e3409ae15b6bd85c12f0))
* **route:** categorize posts in `blog` section ([6829787](https://github.com/ericrovell/ericrovell.me/commit/6829787cdeee8a475f1019cd967d9e0527483e7a))
* **routes:** move `timeline` to `index` page ([4529ac4](https://github.com/ericrovell/ericrovell.me/commit/4529ac43a76f31f301744dc6e77b3a8e88944e60))
* **stores:** improved theming store ([c3a7575](https://github.com/ericrovell/ericrovell.me/commit/c3a757546f0d643bfdd3d6f833047bd2c4927385))


### Bug Fixes

* **stores:** expose `Theme` types ([2246fc3](https://github.com/ericrovell/ericrovell.me/commit/2246fc3dfbb732f1565ac4f027952d6232de1c90))
* type cast ([7bd7b08](https://github.com/ericrovell/ericrovell.me/commit/7bd7b08ed1532b62d5d8f0061468a0d2b798b355))

## 0.5.0 (2021-10-03)

- Improve `project-euler` posts with new dedicated layout, the problem description stands out better now;

## 0.4.0 (2021-09-26)

- Remove `Math` component in favor of math preprocessing settings, thanks to this [issue](https://github.com/pngwn/MDsveX/issues/302);

## 0.3.0 (2021-09-12)

- [fix]: revert blogpost headings styles partialy as it breaks the layout for small screens;
- [chore]: removed css modules preprocess, using vite css modules instead;
- [chore]: moved styles from blogpost layout to module (no `:global()` hell anymore);
- [fix]: `Card` component empty footer slot case;
- [feature]: simple `Timeline` component;

## 0.2.0 (2021-09-05)

- [visuals]: blogpost layout better headings styles;

## 0.1.0 (2021-08-27)

- First deployment;