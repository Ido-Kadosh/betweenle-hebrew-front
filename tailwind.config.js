/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				blue: '#03a9f5',
				orange: '#f67b01',
				gray: {
					100: '#333333',
					200: '#cccccc',
				},
			},
		},
	},
	plugins: [],
};
