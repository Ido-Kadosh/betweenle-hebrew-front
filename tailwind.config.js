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
				link: '#125fb3',
				error: '#4d0b0b',
				success: '#388e3d',
			},
			fontSize: {
				'clamp-xs': 'clamp(0.55rem, 1.67vh, 2.5vw)',
				'clamp-sm': 'clamp(0.65rem, 1.94vh, 2.92vw)',
				'clamp-base': 'clamp(0.75rem, 2.22vh, 3.33vw)',
				'clamp-lg': 'clamp(0.9rem, 2.5vh, 3.75vw)',
				'clamp-xl': 'clamp(1rem, 2.78vh, 4.17vw)',
				'clamp-2xl': 'clamp(1.1rem, 3.33vh, 5vw)',
				'clamp-3xl': 'clamp(1.35rem, 4.17vh, 6.25vw)',
				'clamp-4xl': 'clamp(1.6rem, 5vh, 7.5vw)',
				'clamp-5xl': 'clamp(2.1rem, 6.67vh, 10vw)',
				'clamp-6xl': 'clamp(2.65rem, 8.33vh, 12.5vw)',
				'clamp-7xl': 'clamp(3.2rem, 10vh, 15vw)',
				'clamp-8xl': 'clamp(4.3rem, 13.33vh, 20vw)',
				'clamp-9xl': 'clamp(5.7rem, 17.78vh, 26.67vw)',
			},
			width: {
				'clamp-counter-circle': 'clamp(1vw, 1.8vh, 2.7vw)',
			},
			margin: {
				'clamp-counter-circle': 'clamp(1vw, 2.7vh, 2.7vw)',
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
