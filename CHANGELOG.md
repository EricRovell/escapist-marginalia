# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.6.0](https://github.com/ericrovell/ericrovell.me/compare/v0.5.0...v0.6.0) (2021-11-29)


### ⚠ BREAKING CHANGES

* `Timeline` now consists of the parts instead: Container, Section, Item.

### Features

* `Gallery` component ([b1ec9c5](https://github.com/ericrovell/ericrovell.me/commit/b1ec9c532e866d79dc7b68d9941026009315cfab))
* `Image` component ([d7c359a](https://github.com/ericrovell/ericrovell.me/commit/d7c359ada80b8d179e6929365429bd8862c01a17))
* **component:** `CheckboxGroup` component ([94e1ad6](https://github.com/ericrovell/ericrovell.me/commit/94e1ad6474e2ef1fa4238f99042ec6b77779a786))
* **component:** implement `TOC` ([48752b9](https://github.com/ericrovell/ericrovell.me/commit/48752b98f02995865e698dce010a1022bbbebb57))
* dynamic blogpost rendering page component ([d87e8b7](https://github.com/ericrovell/ericrovell.me/commit/d87e8b79471506e103cee5b9ae5d0cd9622d9d7b))
* gallery metadata ([105b9c4](https://github.com/ericrovell/ericrovell.me/commit/105b9c45515a1b0fd905faf0631d3f260059d193))
* gallery route ([b3392ea](https://github.com/ericrovell/ericrovell.me/commit/b3392ea3c25493a63329624e85744abf72fcb3f7))
* **i18n:** update dicts ([6e091fe](https://github.com/ericrovell/ericrovell.me/commit/6e091fe497e20b3303c48b7d093e6b14b9bca524))
* implement custom `toc` plugin ([9be537d](https://github.com/ericrovell/ericrovell.me/commit/9be537d8f2922676fb3d0c32ef0fcf255607102d))
* improve `Link` a11y styles ([aa511e5](https://github.com/ericrovell/ericrovell.me/commit/aa511e5ddcf08918c7e208c574011ccc8851c2c8))
* improved `Timeline` by breaking into sections. ([30dfd82](https://github.com/ericrovell/ericrovell.me/commit/30dfd8257d4f5e1a5e754e7d31670442f8d3f58b))
* **layout:** `ContentFilter` layout component ([5b61ef1](https://github.com/ericrovell/ericrovell.me/commit/5b61ef1cef7d3dec42831169e09ea701b024d811))
* remove `Timeline` hardcoded size, move it to layout ([098b5f6](https://github.com/ericrovell/ericrovell.me/commit/098b5f6319c454ac8cbd02fb586d3aa2c700905d))
* simplistic (yet) custom error page ([218ceb1](https://github.com/ericrovell/ericrovell.me/commit/218ceb1761c12f43ff5ff2361a81f331e77488b3))
* **styles:** pages style modules ([3e562db](https://github.com/ericrovell/ericrovell.me/commit/3e562db84464ece1901f45096f480978b0204f62))
* **styles:** remove unused tokens; new link tokens ([72c86db](https://github.com/ericrovell/ericrovell.me/commit/72c86db5dec80e7504364943c61d73df53fede60))
* update `Card` typography styles ([3361879](https://github.com/ericrovell/ericrovell.me/commit/336187923c950cb8e773dc96da1eb91798407bbd))
* use `TOC`, update layout ([98384b1](https://github.com/ericrovell/ericrovell.me/commit/98384b11298d6dea4a99125b08e336ed1a087d39))
* use updated `Timeline` to render posts by group ([26418d9](https://github.com/ericrovell/ericrovell.me/commit/26418d964a53b31034ef336f8e29927829e35e5c))
* using `ContentFilter` layout and page styles modules ([b9e3586](https://github.com/ericrovell/ericrovell.me/commit/b9e358622acf416051c9ef8ac42050d16a4b504b))


### Bug Fixes

* **content:** remove unnecessary parentheses ([0e2f33e](https://github.com/ericrovell/ericrovell.me/commit/0e2f33e4327f292b3d130d2fbfd2b1edd8d6104a))
* do not let focus disabled menu items ([c71da22](https://github.com/ericrovell/ericrovell.me/commit/c71da22bce0b2a123a0658dd46e51d2e6145ac64))
* each page should include it's own padding ([ff04b36](https://github.com/ericrovell/ericrovell.me/commit/ff04b3622685bd82f3c460490c0fcc69df98eb53))
* empty target is not included at attr ([494fd80](https://github.com/ericrovell/ericrovell.me/commit/494fd804a700c5f86c2648262b50a7f7d0eea485))
* set `inline` as it should be for `time` ([31a1e36](https://github.com/ericrovell/ericrovell.me/commit/31a1e36b6e44c7909352d86f7e6ddfd17acd07b5))
* **styles:** fixed aside element height ([befed0a](https://github.com/ericrovell/ericrovell.me/commit/befed0af50db6bc69bb2fca72a03c0d9cd00cd47))
* **styles:** missing aside element's class ([84bb104](https://github.com/ericrovell/ericrovell.me/commit/84bb104abd65444e675cca3ee1d03a0e451b0b31))
* temproral fix for prerendering route without index ([419556e](https://github.com/ericrovell/ericrovell.me/commit/419556e8a00bec7e5474315ba4fe179d986267bd))

## [0.5.0](https://github.com/ericrovell/ericrovell.me/compare/v0.4.0...v0.5.0) (2021-11-15)


### Features

* `Code` custom md component for syntax highlight ([a16af02](https://github.com/ericrovell/ericrovell.me/commit/a16af02b706d9b75bb11fcc3fc4058fbeb4af73a))
* `Link` component ([16669c7](https://github.com/ericrovell/ericrovell.me/commit/16669c7733cdadc8259c0b0dd3218e595a0b34b4))
* add i18n package ([4586f54](https://github.com/ericrovell/ericrovell.me/commit/4586f54af40c47bcb9fc3d2f45678254c429e732))
* added paths ([9381fd2](https://github.com/ericrovell/ericrovell.me/commit/9381fd20b9fc844a45d40dd3e097d706a2f7a177))
* **component:** `LangSelect` component ([6d6898c](https://github.com/ericrovell/ericrovell.me/commit/6d6898c77e2a282282ff2a9e792d44e33f0a2d0d))
* **component:** make `LangSelect` semantic and improve accessibility ([93c5b81](https://github.com/ericrovell/ericrovell.me/commit/93c5b814f1b27864d2317165f14f0b3e083b25b8))
* i18n module ([505ae2f](https://github.com/ericrovell/ericrovell.me/commit/505ae2fb98b5c7f749946a8dab2669baece5505c))
* **i18n:** async dict loading ([1a06e0e](https://github.com/ericrovell/ericrovell.me/commit/1a06e0eaae6b752d47c386e5af353f5be892889b))
* **i18n:** locale dicts ([d06caee](https://github.com/ericrovell/ericrovell.me/commit/d06caeed5c76efdfc4a62cbed0b740d4f6448461))
* **i18n:** sync current lang pages ([32fc3b8](https://github.com/ericrovell/ericrovell.me/commit/32fc3b8aa3d50ba7c5a282ba955be3ed9bbc2251))
* **i18n:** timeline localization ([3a032e1](https://github.com/ericrovell/ericrovell.me/commit/3a032e10a3bc4422e3ae5c23c38d1ed03c95c13a))
* **i18n:** update dict ([03113af](https://github.com/ericrovell/ericrovell.me/commit/03113afb90d1c60045ae58e0a1688776d6f693c6))
* **i18n:** update paths and add translations ([b637652](https://github.com/ericrovell/ericrovell.me/commit/b637652de8d0a18b1128b7e827397c78ff5db53c))
* **i18n:** updated i18n dicts ([f1f525e](https://github.com/ericrovell/ericrovell.me/commit/f1f525ecad8e8ddf405b636347fbc5d88fbc5e89))
* refactored blogpost layouts & references section ([f1aa200](https://github.com/ericrovell/ericrovell.me/commit/f1aa200e782b92135b9a1772623b6f718b0f91e5))
* **routing:** add [lang] param for i18n routing ([1697405](https://github.com/ericrovell/ericrovell.me/commit/169740598080145afa08a1c0369c668dba5f9761))
* **styles:** update `Masthead` responsiveness ([a7492f2](https://github.com/ericrovell/ericrovell.me/commit/a7492f23b4623c41ff50f1f29fbcf24788e98149))
* update paths according to lang ([0c7fdfa](https://github.com/ericrovell/ericrovell.me/commit/0c7fdfada2d6ca131568d3ebbca14c0b44bccb44))
* updated footer contents ([9d3cda6](https://github.com/ericrovell/ericrovell.me/commit/9d3cda6cdb7ef575f5a4b9c697b98f697cfd0083))


### Bug Fixes

* expose `Link` component export ([e520c75](https://github.com/ericrovell/ericrovell.me/commit/e520c758fded33f402c3d0a98ea9155dd284731b))
* lang store path ([28ee76a](https://github.com/ericrovell/ericrovell.me/commit/28ee76aa43264df6bd55e7a8150a5a29fd970923))
* **styles:** align control section items ([7b749a1](https://github.com/ericrovell/ericrovell.me/commit/7b749a121af37fdd00bcb6fb850bbeaedddf2e42))
* **styles:** controls section gap spacing ([87381c0](https://github.com/ericrovell/ericrovell.me/commit/87381c05f46f1a5deb90b2c753c8dbaae07f3a25))

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