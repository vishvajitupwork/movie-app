import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        // Define your primary color
        primary: "#2BD17E",

        // Define your error color
        error: "#EB5757",

        // Define your background color
        background: "#093545",

        // Define your input color
        input: "#224957",
        card: "#092C39",
      },
    },
  },
  plugins: [],
};
export default config;
