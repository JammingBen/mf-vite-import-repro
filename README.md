# Module Federation Vite - `import: false` Regression Reproduction

This repo reproduces a regression introduced in `@module-federation/vite` where shared modules
with `{ singleton: true, import: false }` throw at runtime when the remote is loaded by a host
that uses `@module-federation/runtime` directly (without the `@module-federation/vite` plugin).

## Error

```
Error: [Module Federation] Shared module vue3-gettext was imported before federation bootstrap finished.
```

## Reproducing

1. Install dependencies:

   ```
   cd host && pnpm install
   cd ../remote && pnpm install
   ```

2. Start the host:

   ```
   cd host && pnpm dev
   ```

3. In another terminal, start the remote:

   ```
   cd remote && pnpm dev
   ```

4. Open https://localhost:5173 in the browser - observe the error in the console.

## Setup

- **host/**: A Vite app that uses `@module-federation/runtime` directly to register shared
  modules (`vue`, `vue3-gettext`) and load a remote extension.
- **remote/**: A Vite app using `@module-federation/vite` that exposes a module which imports
  from `vue3-gettext`. Shared modules are declared with `{ singleton: true, import: false }`.
