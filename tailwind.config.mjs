/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Beyond Temptation brand
				ink: '#000000',
				paper: '#FFFFFF',
				cream: '#FFF8D6',
				yellow: {
					DEFAULT: '#FFD60A',
					deep: '#F2B705',
					soft: '#FFF0A8',
				},
				tomato: '#FF3B1F',
				smoke: '#5C5C5C',
				// legacy aliases used by older pages — keep until they're removed
				primary: '#000000',
				secondary: '#FFFFFF',
				accent: '#FFD60A',
				'accent-light': '#FFF0A8',
				'accent-dark': '#B8860B',
				'text-light': '#666666',
			},
			fontFamily: {
				display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
				accent: ['"Instrument Serif"', 'Georgia', 'serif'],
				sans: ['Figtree', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
				serif: ['Georgia', 'serif'],
			},
			fontSize: {
				'display-xl': ['clamp(3.5rem, 12vw, 11rem)', { lineHeight: '0.86', letterSpacing: '-0.04em', fontWeight: '800' }],
				'display-lg': ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '0.92', letterSpacing: '-0.03em', fontWeight: '800' }],
				'display-md': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
			},
			boxShadow: {
				hard: '6px 6px 0 0 #000',
				'hard-sm': '3px 3px 0 0 #000',
				'hard-yellow': '6px 6px 0 0 #FFD60A',
			},
			keyframes: {
				marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
				wobble: {
					'0%,100%': { transform: 'rotate(-6deg)' },
					'50%': { transform: 'rotate(6deg)' },
				},
				spinSlow: { to: { transform: 'rotate(360deg)' } },
			},
			animation: {
				marquee: 'marquee 28s linear infinite',
				wobble: 'wobble 4s ease-in-out infinite',
				'spin-slow': 'spinSlow 18s linear infinite',
			},
			container: { center: true, padding: '1rem' },
		},
	},
	plugins: [],
}
