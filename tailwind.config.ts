import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "var(--light)",
        dark: "var(--dark)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        primary: "var(--primary)",
        danger: "var(--danger)",
        warning: "var(--warning)",
        success: "var(--success)",
        shadow: "var(--shadow)",
        sheen: "var(--sheen)",
      },
    },
  },
  plugins: [],
} satisfies Config;
