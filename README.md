# x-design

<p align="center">
  <img height="200" src="src/assets/images/app-initializer/logo--dark.svg" width="200">
</p>

---

# 📖 Table of Contents

- [📌 The first step : Installation](#Installation)
  - [📦 Node Modules ](#node-modules)
  - [🛠️ Lint ](#lint)
  - [🌲 env ](#env)
- [🚀 Launch](#Launch)
- [🪗 Launch Unit Tests](#Launch-Unit-Tests)
- [🖥️ Pre Commit](#Pre-Commit)
- [📖 Libraries](#Libraries)
- [🎹 Dev Mode](#Dev-Mode)
- [📥 Material Icon Theme](#Material-Icon-Theme)
- [🚧 Build](#Build)

<br />
<br />

## 📌 Installation

🚨🚨🚨<b> Recommend you to use this version Node `v24.9.0`</b>🚨🚨🚨

### 📦 node modules

```
npm install or npm i
```

### 🛠️ lint

Commit lint required global for commit

```
npm install -g @commitlint/cli @commitlint/config-conventional
```

### 🌲 env

Make sure that you generate file `.env` from file `.env.default`

## 🚀 Launch

```
npm start
```

<br />

## 🪗 Launch Unit Tests

```
npm run test
```

<br />

## 🖥️ Pre Commit

Before commit are call actions:

- branch name lint
- style lint
- eslint ts
- eslint tsx
- prettier
- commit syntax

Before push are call actions:

- unit test

If you need skip tests, after the commit message you have to put command:

```
git commit -m "<message>" --no-verify
```

<br />

## 📖 Libraries

<div>
  <img src="readme-assets/react.svg" style="vertical-align:top; margin:6px 15px;">
  <img src="readme-assets/css3.svg" style="vertical-align:top; margin:6px 15px;">
  <img src="readme-assets/html.svg" style="vertical-align:top; margin:6px 15px;">
  <img src="readme-assets/sass.svg" style="vertical-align:top; margin:6px 15px;">
  <img src="readme-assets/visualstudio-code.svg" style="vertical-align:top; margin:6px 15px;">
</div>

---

- react - https://pl.reactjs.org/docs/getting-started.html
- sass - https://sass-lang.com/
- lodash - https://lodash.com/docs/4.17.15
- redux - https://redux.js.org/
- react-testing-library - https://testing-library.com/docs/react-testing-library/intro/
- prettier - https://prettier.io/
- eslint - https://eslint.org/
- husky - https://github.com/typicode/husky
- commit-lint - https://commitlint.js.org/#/
- style-lint - https://stylelint.io/
- redux-saga - https://redux-saga.js.org/

<br />

## 📥 Material Icon Theme

After install `Material Icon Theme` you can pass custom folder

You need to move two assets from:

```
src/assets/tv-chart/*
```

To

```
.vscode
 ┗ extensions
   ┗ icons
     ┗ folder-sample-open.svg
     ┗ folder-sample.svg
```

<br />

## 🚧 Build

To build you have to run the follow command

```
npm run build
```

<p align="center">
  <img src="readme-assets/webpack.gif">
</p>

$${\color{yellow} 🙌 Here-you-are! You-can-run-your-production-version 🙌}$$

```
serve -s build
```
