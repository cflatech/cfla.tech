import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      main: "#708090",
      sub: "#b0c4de",
      accent: "#00B5AD",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
export default config;
