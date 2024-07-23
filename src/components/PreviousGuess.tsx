interface PropTypes {
	guess: string;
}
const PreviousGuess = ({ guess }: PropTypes) => {
	const getGuessColor = () => {
		if (guess === 'אאאאא' || guess === 'תתתתת') return 'text-slate-300';
		return 'text-white';
	};

	return (
		<div>
			<div className="flex gap-1">
				{guess.split('').map((letter, idx) => (
					<div
						className={`${getGuessColor()} mb-[0.15em] text-clamp-4xl font-semibold w-[1.75em] aspect-square grid place-items-center bg-blue-100`}
						key={idx}
					>
						{letter}
					</div>
				))}
			</div>
		</div>
	);
};

export default PreviousGuess;
