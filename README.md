# Temper Works test

Front-end small application to render posts from [jsonplaceholder](https://jsonplaceholder.typicode.com/), reorder posts and travel back in time.

## Information and Tech Stack

- TypeScript
- Vue 3
- Pinia
- Tailwind CSS
- Vue Test Utils
- Vite
- ViTest

To run this application, fork or clone this repository, `cd` into the project folder and run `npm i` then `npm run dev`. That's it :D.

**Scripts included**

- `npm run dev`: Starts the project using Vite in development mode
- `npm run build`: Builds the project
- `npm run preview`: Starts Vite in preview mode
- `npm run lint:script`: Applies eslint rules to project files
- `npm run test`: Runs all tests
- `npm run test:unit`: Runs all tests in jsdom environment

---

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
