/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				blue: {
					100: '#03a9f5',
					200: '#0277BD',
					300: '#039be6',
				},
				orange: '#f67b01',
				gray: {
					100: '#333333',
					200: '#888888',
					300: '#cacaca',
					400: '#eeeeee',
				},
				error: '#4d0b0b',
				success: '#388e3d',
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
				shakeHorizontal: {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%': { transform: 'translateX(-5px)' },
					'20%': { transform: 'translateX(5px)' },
					'30%': { transform: 'translateX(-5px)' },
					'40%': { transform: 'translateX(5px)' },
					'50%': { transform: 'translateX(-5px)' },
					'60%': { transform: 'translateX(5px)' },
					'70%': { transform: 'translateX(-5px)' },
					'80%': { transform: 'translateX(5px)' },
					'90%': { transform: 'translateX(-5px)' },
				},
				shakeVertical: {
					'0%, 100%': { transform: 'translateY(0)' },
					'10%': { transform: 'translateY(-5px)' },
					'20%': { transform: 'translateY(5px)' },
					'30%': { transform: 'translateY(-5px)' },
					'40%': { transform: 'translateY(5px)' },
					'50%': { transform: 'translateY(-5px)' },
					'60%': { transform: 'translateY(5px)' },
					'70%': { transform: 'translateY(-5px)' },
					'80%': { transform: 'translateY(5px)' },
					'90%': { transform: 'translateY(-5px)' },
				},
			},
			animation: {
				slideUp: 'slideUp 0.5s forwards',
				slideDown: 'slideDown 0.5s forwards',
				shakeHorizontal: 'shakeHorizontal 0.5s ease-in-out ',
				shakeVertical: 'shakeVertical 0.5s ease-in-out ',
			},
		},
	},
	plugins: [],
};
