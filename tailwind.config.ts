import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: { extend: {
    colors: { ink: "#080808", ivory: "#F5F5F2", silver: "#BFC1C4", graphite: "#292929" },
    fontFamily: { serif: ["var(--f-serif)", "serif"], sans: ["var(--f-sans)", "sans-serif"], fa: ["var(--f-fa)", "Tahoma", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
