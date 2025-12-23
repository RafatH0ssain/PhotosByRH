import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
      },
      fontFamily: {
        anton: ["var(--font-anton)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;