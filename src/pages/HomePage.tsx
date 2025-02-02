import { useEffect, useState } from 'react';
import { IoPlay } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { utilService } from '../services/util.service';
import useCountdown from '../hooks/useCountdown';

const HomePage = () => {
	const [initialTime, setInitialTime] = useState<number | null>(null);
	const [showTutorial] = useLocalStorage('showTutorial', true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTimeTilMidnight = async () => {
			const dailyWordTime = await utilService.getTimeTilMidnight();
			setInitialTime(dailyWordTime);
		};

		fetchTimeTilMidnight();
	}, []);

	const timeTilMidnight = useCountdown(initialTime);

	const onDailyClicked = () => {
		localStorage.setItem('showTutorial', JSON.stringify(false)); // setting state before navigation doesn't work, so we set localStorage directly
		if (showTutorial) {
			navigate('/tutorial');
		} else {
			navigate('/daily');
		}
	};

	const getDailyWordCountdown = () => {
		if (timeTilMidnight === null) return;
		return utilService.formatTime(timeTilMidnight);
	};

	return (
		<div className="m-auto max-w-xl text-center space-y-5 pt-4">
			<h1 className="text-6xl font-bold">באמצעל</h1>
			<h3 className="text-xl mb-2">
				נוצר על ידי{' '}
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.linkedin.com/in/idokadosh/"
					className="underline text-link font-medium"
				>
					עידו קדוש
				</a>
			</h3>
			<h2 className="text-xl">
				<span> משחק מקורי ועיצוב על ידי </span>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://nebulabytes.com/"
					className="underline text-link font-medium"
				>
					Nebula Bytes
				</a>
			</h2>
			<button
				className="bg-blue-300 text-white font-bold w-full text-3xl py-2 rounded-md flex items-center justify-center gap-3"
				onClick={onDailyClicked}
			>
				<IoPlay style={{ transform: 'rotate(180deg)' }} />
				המילה היומית
			</button>
			{timeTilMidnight !== null && (
				<div className="text-2xl font-bold text-gray-200">
					המילה היומית הבאה בעוד: <div>{getDailyWordCountdown()}</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
