import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF3F7",
          100: "#D8E2EC",
          200: "#B0C4D8",
          300: "#7FA0BF",
          400: "#5580A5",
          500: "#3A6388",
          600: "#2D4F70",
          700: "#1F3A5F",
          800: "#162B4A",
          900: "#0E1D35",
          950: "#070F1E",
        },
        sky: {
          50: "#F2F7FA",
          100: "#E5EFF5",
          200: "#D4E0E8",
          300: "#A8C8DC",
          400: "#7FB0CC",
          500: "#5A96B8",
          600: "#3F7A9E",
          700: "#2E5F7E",
          800: "#204660",
          900: "#153045",
        },
        sail: {
          50: "#FDFCF9",
          100: "#FAF7F0",
          200: "#F5EFE0",
          300: "#ECE2CC",
          400: "#D8CCAE",
        },
        horizon: {
          50: "#F5F8FA",
          100: "#EBF0F4",
          200: "#D4E0E8",
          300: "#B8CCD8",
          400: "#97B3C5",
        },
        ochre: {
          50: "#FDF7F0",
          100: "#F9ECDC",
          200: "#F0D4B5",
          300: "#E5B88A",
          400: "#D4A574",
          500: "#C08B58",
          600: "#A57040",
          700: "#865830",
          800: "#694425",
          900: "#50331C",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        brand: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
