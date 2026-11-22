import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['**/.astro/**', '**/.nitro/**', '**/.output/**', '**/.tanstack/**', '**/dist/**', '**/routeTree.gen.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  ...astro.configs.recommended,
];
