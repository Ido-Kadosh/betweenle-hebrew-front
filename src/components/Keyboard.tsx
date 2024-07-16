import { IoBackspace, IoSend } from 'react-icons/io5';
import KeyboardButton from './KeyboardButton';

const keys = [
	['פ', 'ם', 'ן', 'ו', 'ט', 'א', 'ר', 'ק'],
	['ף', 'ך', 'ל', 'ח', 'י', 'ע', 'כ', 'ג', 'ד', 'ש'],
	['ץ', 'ת', 'צ', 'מ', 'נ', 'ה', 'ב', 'ס', 'ז'],
];
interface PropTypes {
	onKeyPress: Function;
}
const Keyboard = ({ onKeyPress }: PropTypes) => {
	return (
		<div className="flex flex-col gap-1 items-center">
			{keys.map((row, rowIdx) => (
				<div key={rowIdx} className=" flex gap-1">
					{rowIdx === 0 && (
						<KeyboardButton onClick={() => onKeyPress('Backspace')}>
							<IoBackspace />
						</KeyboardButton>
					)}
					{row.map(key => (
						<KeyboardButton key={key} onClick={() => onKeyPress(key)}>
							{key}
						</KeyboardButton>
					))}
					{rowIdx === 0 && (
						<KeyboardButton onClick={() => onKeyPress('Enter')}>
							<IoSend size={20} style={{ transform: 'rotate(180deg)' }} />
						</KeyboardButton>
					)}
				</div>
			))}
		</div>
	);
};

export default Keyboard;
