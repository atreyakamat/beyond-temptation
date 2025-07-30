/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Café color scheme - Updated to match the new design
				primary: '#171412', // Dark text color
				secondary: '#ffffff', // White background
				accent: '#edd5c4', // Cream/beige accent
				'accent-light': '#f4f2f1', // Light cream
				'accent-dark': '#827368', // Muted brown
				'text-light': '#827368', // Muted text color
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
