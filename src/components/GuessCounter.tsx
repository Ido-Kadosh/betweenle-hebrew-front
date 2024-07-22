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
				marginClass = 'me-5';
			}

			circles.push(`${colorClass} ${marginClass}`);
		}
		return circles;
	};

	return (
		<div className="flex font-semibold items-center gap-8 justify-center">
			<div className="flex flex-col items-center text-gray-100 font-bold">
				<span className="font-bold text-sm">ניחוש</span>
				<span className="text-xl">
					{maxGuesses} / {count}
				</span>
			</div>
			<div className="flex gap-1">
				{getCirclesToDisplay().map((colorClass, idx) => (
					<div key={idx} className={`${colorClass} rounded-full w-4 h-4`}></div>
				))}
			</div>
			<div className="flex flex-col items-center text-gray-100 font-bold">
				<span className=" text-sm">ניקוד</span>
				<span className="text-xl">
					{5} / {score}
				</span>
			</div>
		</div>
	);
};

export default GuessCounter;
