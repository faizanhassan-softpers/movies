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
        H2: "48px",
        "body-small": "14px",
        "body-regular": "16px",
      },
      lineHeight: {
        H1: "80px",
        H2: "56px",
        "body-small": "24px",
        "body-regular": "24px",
      },
      backgroundColor: {
        Primary: "#2BD17E",
        Background: "#093545",
        Error: "#EB5757",
        Input: "#224957",
        Card: "#092C39",
      },
      colors: {
        Input: "#224957",
        Background: "#093545",
      },
    },
  },
  plugins: [],
};
export default config;
