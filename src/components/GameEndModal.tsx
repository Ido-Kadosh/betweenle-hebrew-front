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
			<div className="font-bold flex flex-col items-center ">
				<h1 className="text-[2em]/tight mb-[0.5em]">{word}</h1>
				<span className="text-[1em]/tight mb-3">{isWin ? 'ניצחון' : 'הפסד'}</span>
				{score && (
					<div className="flex text-[2.3em]/tight">
						{Array.from({ length: score }).map((_, idx) => (
							<FaTrophy key={idx} color="gold" className="mx-1" />
						))}
					</div>
				)}
			</div>
			<Stats stats={stats} />
			<div className="flex gap-2">
				<Link
					to="/"
					className="bg-slate-500 text-white text-[1.2em]/tight py-[0.7em] px-[0.2em] rounded-md flex gap-2 flex-1 justify-center items-center font-semibold mx-[0.2em]"
				>
					<IoArrowForwardOutline className="mt-1" />
					תפריט
				</Link>
				<button
					onClick={onShare}
					className="bg-orange text-white text-[1.2em]/tight py-[0.7em] px-[0.2em] rounded-md flex gap-2 flex-1 justify-center items-center font-semibold mx-[0.2em]"
				>
					<IoShareSocial className="mt-1" />
					שיתוף
				</button>
			</div>
		</div>
	);
};

export default GameEndModal;
