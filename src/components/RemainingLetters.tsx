import { UserMsg } from './UserMsg';

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

const RemainingLetters = () => {
	return (
		<div className="relative my-8">
			<div className="grid gap-1 grid-cols-11 grid-flow-row">
				{letters.map(letter => (
					<div
						key={letter}
						className="grid place-items-center text-[#9a867c] bg-[#d8ccc7]  rounded-full w-8 font-semibold text-lg  aspect-square"
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
