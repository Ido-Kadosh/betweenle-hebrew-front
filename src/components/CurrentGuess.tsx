import { useEffect, useState } from 'react';

interface PropTypes {
	guess: string;
	shouldHighlight: boolean;
	onHighlightComplete: () => void;
}
const CurrentGuess = ({ guess, shouldHighlight, onHighlightComplete }: PropTypes) => {
	const [highlightIndex, setHighlightIndex] = useState<number>(-1);
	const [slideIndex, setSlideIndex] = useState<number>(-1);

	useEffect(() => {
		// highlight start
		if (shouldHighlight && highlightIndex < 5) {
			const timer = setTimeout(() => {
				setHighlightIndex(prev => prev + 1);
			}, 100);
			return () => clearTimeout(timer);
		}

		// slide start
		if (highlightIndex === 5 && shouldHighlight) {
			setTimeout(() => {
				setSlideIndex(0);
			}, 250);
			return;
		}

		// reset slide and highlight indices
		if (!shouldHighlight) {
			setHighlightIndex(-1);
			setSlideIndex(-1);
		}
	}, [highlightIndex, shouldHighlight]);

	useEffect(() => {
		//slide start
		if (slideIndex >= 0 && slideIndex < 5) {
			const timer = setTimeout(() => {
				setSlideIndex(prev => prev + 1);
			}, 100);
			return () => clearTimeout(timer);
		}

		if (slideIndex === 5) {
			setTimeout(() => {
				onHighlightComplete();
			}, 750);
		}
	}, [slideIndex]);

	const getBoxesToDisplay = () => {
		let boxes = [];
		for (let i = 0; i < 5; i++) {
			boxes.push(guess[i] || '');
		}
		return boxes;
	};

	const getBoxClassName = (letter: string, idx: number) => {
		let className = '';
		if (idx < slideIndex) className += 'animate-slideUp ';
		if (idx <= highlightIndex) className += 'bg-blue-200';
		else if (letter) className += 'bg-orange';
		return className;
	};

	return (
		<div className="flex gap-1">
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
