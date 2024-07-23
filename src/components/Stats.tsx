import React, { useMemo } from 'react';
import { IStats } from '../types/Game';

interface PropTypes {
	stats: IStats;
	showTitle?: boolean;
}
const Stats = ({ stats, showTitle }: PropTypes) => {
	const calculateScorePercentage = (count: number) => {
		if (!stats.played) return 0;
		return Math.floor((count / stats.played) * 100);
	};

	const reversedScores = useMemo(() => [...stats.scores].reverse(), [stats.scores]);

	return (
		<section>
			{showTitle && <h2 className="font-bold text-center mb-4 text-[1em]/tight">סטטיסטיקה</h2>}
			<div className="grid grid-rows-2 grid-cols-5 grid-flow-col text-center gap-x-3 items-center mb-[1em]">
				<div className="self-end text-[0.75em]/tight">משחקים</div>
				<div className="text-[2em]">{stats.played}</div>
				<div className="self-end text-[0.75em]/tight">נצחונות</div>
				<div className="text-[2em]">{stats.wins}</div>
				<div className="self-end text-[0.75em]/tight">%</div>
				<div className="text-[2em]">{(stats.wins / stats.played) * 100 || 0}</div>
				<div className="self-end text-[0.75em]/tight">הרצף הנוכחי</div>
				<div className="text-[2em]">{stats.currentStreak}</div>
				<div className="text-[0.75em] self-end">
					<div>הרצף</div>
					הטוב ביותר
				</div>
				<div className="text-[2em]/tight">{stats.bestStreak}</div>
			</div>
			<div className="text-center mb-[1em]">חלוקת ניקוד</div>
			<div className="grid grid-rows-5 grid-cols-[auto_1fr_auto] gap-2 mb-[1em]">
				{reversedScores.map((count, score) => {
					const percentage = calculateScorePercentage(count);
					return (
						<React.Fragment key={score}>
							<div className="flex gap-1 mx-[0.5em]">
								<span>%</span>
								{percentage}
							</div>
							<div className="flex justify-end flex-1 bg-gray-400">
								{count > 0 && (
									<div className="bg-green-500 px-2" style={{ width: `${percentage}%` }}>
										{count}
									</div>
								)}
							</div>
							<div className="mx-[0.5em]">{reversedScores.length - score}</div>
						</React.Fragment>
					);
				})}
			</div>
		</section>
	);
};

export default Stats;
