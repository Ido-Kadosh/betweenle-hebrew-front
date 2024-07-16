interface PropTypes {
	word: string;
}
const PreviousGuess = ({ word }: PropTypes) => {
	const getGuessColor = () => {
		if (word === 'אאאאא' || word === 'תתתתת') return 'text-slate-300';
		return 'text-white';
	};

	return (
		<div>
			<div className="flex gap-1">
				{word.split('').map((letter, idx) => (
					<div
						className={`${getGuessColor()} mb-3 text-4xl font-semibold w-20 grid place-items-center bg-blue aspect-square`}
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
