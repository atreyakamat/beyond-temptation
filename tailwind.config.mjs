/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Café color scheme - Yellow & Black Theme
				primary: '#000000', // Pure black
				secondary: '#ffffff', // White background
				accent: '#FFD700', // Gold/Yellow accent
				'accent-light': '#FFF4B7', // Light yellow
				'accent-dark': '#B8860B', // Dark golden rod
				'text-light': '#666666', // Light gray text
				'yellow': '#FFD700',
				'black': '#000000',
			},
			fontFamily: {
				sans: ['"Plus Jakarta Sans"', '"Noto Sans"', 'sans-serif'],
				serif: ['Georgia', 'serif'],
			},
			container: {
				center: true,
				padding: '1rem',
			}
		},
	},
	plugins: [],
}
