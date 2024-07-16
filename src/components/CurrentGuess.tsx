interface PropTypes {
	guess: string;
}
const CurrentGuess = ({ guess }: PropTypes) => {
	const getBoxesToDisplay = () => {
		let boxes = [];
		for (let i = 0; i < 5; i++) {
			boxes.push(guess[i] || '');
		}
		return boxes;
	};

	return (
		<div>
			<div className="flex gap-1">
				{getBoxesToDisplay().map((letter, idx) => (
					<div
						className={` ${
							letter ? 'bg-orange' : 'bg-white border-2 border-slate-500'
						} mb-3 text-4xl font-semibold w-20 grid place-items-center aspect-square text-white`}
						key={idx}
					>
						{letter}
					</div>
				))}
			</div>
		</div>
	);
};

export default CurrentGuess;
