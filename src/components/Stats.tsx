import React, { useMemo } from 'react';
import { IStats } from '../types/Game';

interface PropTypes {
	stats: IStats;
}
const Stats = ({ stats }: PropTypes) => {
	const calculateScorePercentage = (count: number) => {
		if (!stats.played) return 0;
		return Math.floor((count / stats.played) * 100);
	};

	const reversedScores = useMemo(() => [...stats.scores].reverse(), [stats.scores]);

	return (
		<section>
			<h2 className="font-bold text-center mb-4">סטטיסטיקה</h2>
			<div className="grid grid-rows-2 grid-cols-5 grid-flow-col text-center gap-x-3 text-lg items-center mb-4">
				<div className="self-end">משחקים</div>
				<div className="text-4xl">{stats.played}</div>
				<div className="self-end">נצחונות</div>
				<div className="text-4xl">{stats.wins}</div>
				<div className="self-end">%</div>
				<div className="text-4xl">{(stats.wins / stats.played) * 100 || 0}</div>
				<div className="self-end">הרצף הנוכחי</div>
				<div className="text-4xl">{stats.currentStreak}</div>
				<div>
					<div>הרצף</div>
					הטוב ביותר
				</div>
				<div className="text-4xl">{stats.bestStreak}</div>
			</div>
			<div className="text-center text-xl mb-4">חלוקת ניקוד</div>
			<div className="grid grid-rows-5 grid-cols-[auto_1fr_auto] gap-2 text-xl mb-4">
				{reversedScores.map((count, score) => {
					const percentage = calculateScorePercentage(count);
					return (
						<React.Fragment key={score}>
							<div className="flex gap-1">
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
							<div>{reversedScores.length - score}</div>
						</React.Fragment>
					);
				})}
			</div>
		</section>
	);
};

export default Stats;
