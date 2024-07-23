interface PropTypes {
	count: number;
	maxGuesses: number;
	score: number;
}
const GuessCounter = ({ count, maxGuesses, score }: PropTypes) => {
	const getCirclesToDisplay = () => {
		const circles = [];
		const breaks = [4, 7, 10, 12];
		for (let i = 0; i < maxGuesses; i++) {
			let colorClass = '';
			if (i < count - 1) colorClass = 'bg-blue-200';
			else if (i === count - 1) colorClass = 'bg-orange';
			else colorClass = 'bg-gray-300';

			let marginClass = '';
			if (breaks.includes(i)) {
				marginClass = 'me-clamp-counter-circle';
			}

			circles.push(`${colorClass} ${marginClass}`);
		}
		return circles;
	};

	return (
		<div className="flex font-semibold items-center sm:gap-8 gap-3 justify-center w-full">
			<div className="flex flex-col items-center text-gray-100 font-bold">
				<span className="font-bold text-clamp-sm">ניחוש</span>
				<span className="text-clamp-lg min-w-max">
					{maxGuesses} / {count}
				</span>
			</div>
			<div className="flex flex-1 justify-center gap-1">
				{getCirclesToDisplay().map((colorClass, idx) => (
					<div key={idx} className={`${colorClass} rounded-full w-clamp-counter-circle aspect-square`}></div>
				))}
			</div>
			<div className="flex flex-col items-center text-gray-100 font-bold">
				<span className="text-clamp-sm">ניקוד</span>
				<span className="text-clamp-lg min-w-max">
					{5} / {score}
				</span>
			</div>
		</div>
	);
};

export default GuessCounter;
