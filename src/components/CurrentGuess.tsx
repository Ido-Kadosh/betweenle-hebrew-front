import { useEffect, useState } from 'react';
import { GuessAnimation } from '../types/Game';

interface PropTypes {
	guess: string;
	animation: GuessAnimation | null;
	onHighlightComplete: (direction: GuessAnimation | null) => void;
}
const CurrentGuess = ({ guess, animation, onHighlightComplete }: PropTypes) => {
	const [highlightIndex, setHighlightIndex] = useState<number>(-1);
	const [slideIndex, setSlideIndex] = useState<number>(-1);
	const [shake, setShake] = useState<boolean>(false);

	useEffect(() => {
		// highlight start
		if (highlightIndex < 5 && animation && (animation == 'TOP' || animation === 'BOTTOM' || animation === 'CORRECT')) {
			const timer = setTimeout(() => {
				setHighlightIndex(prev => prev + 1);
			}, 100);
			return () => clearTimeout(timer);
		}

		// slide start
		if (highlightIndex === 5 && animation) {
			let timer: number;
			if (animation === 'TOP' || animation === 'BOTTOM') {
				timer = window.setTimeout(() => {
					setSlideIndex(0);
				}, 250);
			} else if (animation === 'CORRECT') {
				timer = window.setTimeout(() => {
					onHighlightComplete(animation);
				}, 750);
			}
			return () => timer && clearTimeout(timer);
		}

		// reset slide and highlight indices
		if (!animation) {
			setHighlightIndex(-1);
			setSlideIndex(-1);
		}
	}, [highlightIndex, animation]);

	useEffect(() => {
		//slide start
		if (slideIndex >= 0 && slideIndex < 5) {
			const timer = setTimeout(() => {
				setSlideIndex(prev => prev + 1);
			}, 100);
			return () => clearTimeout(timer);
		}
		if (slideIndex === 5) {
			const timer = setTimeout(() => {
				onHighlightComplete(animation);
			}, 750);
			return () => clearTimeout(timer);
		}
	}, [slideIndex]);

	useEffect(() => {
		if (animation === 'INCORRECT' || animation === 'BETWEEN' || animation === 'SHORT') {
			setShake(true);
			const timer = setTimeout(() => {
				setShake(false);
				onHighlightComplete(animation);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [animation]);

	const getBoxesToDisplay = () => {
		let boxes = [];
		for (let i = 0; i < 5; i++) {
			boxes.push(guess[i] || '');
		}
		return boxes;
	};

	const getOutlineClassName = () => {
		let className = '';
		if (shake && (animation === 'INCORRECT' || animation === 'SHORT')) className += 'animate-shakeHorizontal ';
		else if (shake && animation === 'BETWEEN') className += 'animate-shakeVertical ';
		return className;
	};

	const getBoxClassName = (letter: string, idx: number) => {
		let className = '';

		// when in slide
		if (idx < slideIndex && animation === 'TOP') className += 'animate-slideUp ';
		else if (idx < slideIndex && animation === 'BOTTOM') className += 'animate-slideDown ';

		// when in highlight (before slide)
		if (idx <= highlightIndex && animation === 'CORRECT') className += 'bg-success ';
		else if (idx <= highlightIndex) className += 'bg-blue-200 ';
		// when not in slide or highlight
		else if (letter) className += 'bg-orange ';
		return className;
	};

	return (
		<div className={`flex gap-1 ${getOutlineClassName()}`}>
			{getBoxesToDisplay().map((letter, idx) => (
				<div className="relative mb-3" key={idx}>
					<div className="absolute inset-0 border-2 border-slate-500"></div>
					<div
						className={`${getBoxClassName(
							letter,
							idx
						)} text-4xl font-semibold w-20 grid place-items-center aspect-square text-white relative`}
					>
						{letter}
					</div>
				</div>
			))}
		</div>
	);
};

export default CurrentGuess;
