import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        H1: "64px",
        "body-small": "14px",
      },
      lineHeight: {
        H1: "80px",
        "body-small": "24px",
      },
      backgroundColor: {
        Primary: "#2BD17E",
        Background: "#093545",
        Error: "#EB5757",
        Input: "#224957",
        Card: "#092C39",
      },
    },
  },
  plugins: [],
};
export default config;
