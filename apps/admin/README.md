# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## TypeScript

New files should be written in TypeScript (`.ts`/`.tsx`). Existing `.jsx` files are converted opportunistically when they're touched for other reasons — there is no scheduled full migration.

`allowJs`/`checkJs: false` in `tsconfig.json` mean untouched `.jsx` files aren't type-checked yet; run `npm run typecheck` to check only the `.ts`/`.tsx` files that exist so far (`npm run build` alone won't catch type errors — Vite's build transpiles with esbuild, which strips types without validating them).
