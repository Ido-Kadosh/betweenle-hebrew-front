import UserMsg from './UserMsg';

const letters = [
	'א',
	'ב',
	'ג',
	'ד',
	'ה',
	'ו',
	'ז',
	'ח',
	'ט',
	'י',
	'כ',
	'ל',
	'מ',
	'נ',
	'ס',
	'ע',
	'פ',
	'צ',
	'ק',
	'ר',
	'ש',
	'ת',
];

interface PropTypes {
	guess: string;
	topGuess: string;
	bottomGuess: string;
}
const RemainingLetters = ({ guess, topGuess, bottomGuess }: PropTypes) => {
	const isLetterInRange = (letter: string): boolean => {
		const newGuess = guess + letter;
		const slicedTopGuess = topGuess.slice(0, newGuess.length);
		const slicedBottomGuess = bottomGuess.slice(0, newGuess.length);
		return newGuess >= slicedTopGuess && newGuess <= slicedBottomGuess;
	};

	return (
		<div className="relative py-[8vh]">
			<div className="grid gap-1 grid-cols-11 grid-flow-row">
				{letters.map(letter => (
					<div
						key={letter}
						className={`grid place-items-center rounded-full w-[1.75em] font-semibold text-clamp-lg aspect-square ${
							isLetterInRange(letter) ? 'text-[#9a867c] bg-[#d8ccc7]' : 'bg-[#e8e6e4] text-[#d5cfcf]'
						}`}
					>
						{letter}
					</div>
				))}
			</div>
			<UserMsg />
		</div>
	);
};

export default RemainingLetters;
