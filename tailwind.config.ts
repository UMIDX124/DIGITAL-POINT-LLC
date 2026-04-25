import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * =================================================================
 * TAILWIND v4 CONFIG — thin shim.
 *
 * The canonical source of truth for design tokens is
 * `src/app/globals.css` under `@theme inline` and `:root`, ported
 * from divyanshagarwal.com on branch redesign/divyansh-taste.
 * Every token in globals.css carries the reference original value,
 * our adapted value, and a one-line rationale.
 *
 * This file is kept only to preserve the `content` glob and the
 * `tailwindcss-animate` plugin for tw-animate-css. Adding new token
 * entries here would be redundant — Tailwind v4 reads @theme directly.
 * =================================================================
 */

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [tailwindcssAnimate],
};

export default config;
