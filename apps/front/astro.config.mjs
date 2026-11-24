import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.cfla.tech',
  output: 'static',
  vite: {
    server: {
      proxy: {
        '^/api/v1/public/site(?:[?]|$)': 'http://127.0.0.1:8787',
      },
    },
  },
});
