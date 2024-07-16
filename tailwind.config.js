/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				blue: {
					100: '#03a9f5',
					200: '#0277BD',
				},
				orange: '#f67b01',
				gray: {
					100: '#333333',
					200: '#cccccc',
				},
				error: '#4d0b0b',
			},
			keyframes: {
				slideUp: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-115%)' },
				},
				slideDown: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(115%)' },
				},
			},
			animation: {
				slideUp: 'slideUp 0.5s forwards',
				slideDown: 'slideDown 0.5s forwards',
			},
		},
	},
	plugins: [],
};
