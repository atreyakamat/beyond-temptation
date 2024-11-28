/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#FFD700', // Bright yellow
				secondary: '#000000', // Black
				'yellow-light': '#FFE44D',
				'yellow-dark': '#FFB700',
			}
		},
	},
	plugins: [],
}
