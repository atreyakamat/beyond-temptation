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
                cheese: {
                    DEFAULT: "#F4A261", // Cheese yellow - using value from Pizza Gradient start
                    dark: "#E76F51",
                },
                fry: {
                    DEFAULT: "#E9C46A", // Fry gold
                },
                shake: {
                    DEFAULT: "#8D6E63", // Chocolate brown
                    dark: "#5D4037",
                },
                accent: {
                    DEFAULT: "#FFC107", // Amber for text selection
                },
            },
        },
    },
    plugins: [],
};
export default config;
