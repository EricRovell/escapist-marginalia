# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.4.0](https://github.com/ericrovell/ericrovell.me/compare/v0.3.0...v0.4.0) (2021-11-08)


### ⚠ BREAKING CHANGES

* **style:** spacing tokens are renamed and using `rem` values to provide consistent spacing across the project.

### Features

* `blogpost` layout ([fce7945](https://github.com/ericrovell/ericrovell.me/commit/fce7945a66b22ceab7731ef99790d242de714b37))
* `groupBy` utility function ([097b480](https://github.com/ericrovell/ericrovell.me/commit/097b480158f97935eb73af572a7622efe3722ee9))
* **icons:** update project icons ([044ea25](https://github.com/ericrovell/ericrovell.me/commit/044ea25929edcd16918a8b5ea9be2d851ca24132))
* new blogpost, anagram hash check ([1196e98](https://github.com/ericrovell/ericrovell.me/commit/1196e986a979899860b76ae2b1ee58d40a546ef8))
* **style:** update spacing tokens ([9bacf9e](https://github.com/ericrovell/ericrovell.me/commit/9bacf9ec01ad6891fda45bc26cddc5ba5ef792fb))
* update blogpost style to include dd elements; remove math margin ([2d3c9ee](https://github.com/ericrovell/ericrovell.me/commit/2d3c9ee5ee6174f4f2a5641d9e11832362835a10))


### Bug Fixes

* **style:** update `Card` footer gap space token ([082f632](https://github.com/ericrovell/ericrovell.me/commit/082f632ec7c8ea4c2515eb8a0b9d7531eeead505))

## [0.3.0](https://github.com/ericrovell/ericrovell.me/compare/v0.2.0...v0.3.0) (2021-10-26)


### Features

* `fetchJSON` utility function ([5fa9897](https://github.com/ericrovell/ericrovell.me/commit/5fa9897adc01993fd8bee17c6edbcc7beb1df328))
* **api:** get ptojects list categorized ([8f8810c](https://github.com/ericrovell/ericrovell.me/commit/8f8810c6eb349c9098408f5dbbc510438919ae94))
* getting a list a projects core utility ([f6a779a](https://github.com/ericrovell/ericrovell.me/commit/f6a779aeda848667f52c5f3fa22e0f8bbd0fa011))
* **icon:** url icon ([540d1ba](https://github.com/ericrovell/ericrovell.me/commit/540d1ba96ee57fcbf9235f47e623cf8397436da7))


### Bug Fixes

* **styles:** better spacing and layout fixes ([fe273dd](https://github.com/ericrovell/ericrovell.me/commit/fe273dddf548e5f160a8ab6aca058802c8a6969c))

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