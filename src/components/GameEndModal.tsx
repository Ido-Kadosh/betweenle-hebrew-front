import { FaTrophy } from 'react-icons/fa';
import { IStats } from '../types/Game';
import Stats from './Stats';
import { Link } from 'react-router-dom';
import { IoArrowForwardOutline, IoShareSocial } from 'react-icons/io5';
interface PropTypes {
	word: string;
	stats: IStats;
	isWin?: boolean;
	score?: number;
}
const GameEndModal = ({ word, stats, isWin, score }: PropTypes) => {
	const onShare = () => {};

	return (
		<div>
			<div className="font-bold flex flex-col items-center mb-10">
				<h1 className="text-5xl mb-5">{word}</h1>
				<span className="text-xl mb-3">{isWin ? 'ניצחון' : 'הפסד'}</span>
				{score && (
					<div className="flex">
						{Array.from({ length: score }).map((_, idx) => (
							<FaTrophy key={idx} color="gold" size={48} className="mx-1" />
						))}
					</div>
				)}
			</div>
			<Stats stats={stats} />
			<div className="flex gap-2">
				<Link
					to="/"
					className="bg-slate-500 text-white py-4 my-4 rounded-md flex gap-2 flex-1 justify-center items-center font-semibold"
				>
					<IoArrowForwardOutline className="mt-1" />
					תפריט
				</Link>
				<button
					onClick={onShare}
					className="bg-orange text-white py-4 my-4 rounded-md flex gap-2 flex-1 justify-center items-center font-semibold"
				>
					<IoShareSocial className="mt-1" />
					שיתוף
				</button>
			</div>
		</div>
	);
};

export default GameEndModal;
