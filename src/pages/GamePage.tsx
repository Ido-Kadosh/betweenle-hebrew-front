import { useCallback, useEffect, useState, useRef, ReactNode } from 'react';
import CurrentGuess from '../components/CurrentGuess';
import PreviousGuess from '../components/PreviousGuess';
import Keyboard from '../components/Keyboard';
import { gameService } from '../services/game.service';
import RemainingLetters from '../components/RemainingLetters';
import { GuessAnimation } from '../types/Game';
import GuessCounter from '../components/GuessCounter';
import useLocalStorage from '../hooks/useLocalStorage';
import { useMsg } from '../contexts/MsgContext/useMsg';
import Modal from '../components/Modal';
import GameEndModal from '../components/GameEndModal';
import { Link } from 'react-router-dom';
import { IoHome, IoStatsChart } from 'react-icons/io5';
import Separator from '../components/Separator';
import Stats from '../components/Stats';

const MAX_GUESSES = 14;

const GamePage = () => {
	const [dailyWord, setDailyWord] = useLocalStorage('dailyWord', '');
	const [topGuess, setTopGuess] = useLocalStorage('topGuess', 'אאאאא');
	const [bottomGuess, setBottomGuess] = useLocalStorage('bottomGuess', 'תתתתת');
	const [guessCount, setGuessCount] = useLocalStorage('guessCount', 1);
	const [stats, setStats] = useLocalStorage('dailyStats', gameService.getDefaultStats());
	const [isWin, setIsWin] = useLocalStorage('isDailyWin', false);
	const [isLoss, setIsLoss] = useLocalStorage('isDailyLoss', false);
	const [score, setScore] = useLocalStorage('dailyScore', 5);
	const [guess, setGuess] = useState('');
	const [dayNumber, setDayNumber] = useState(0);
	const [animation, setAnimation] = useState<GuessAnimation | null>(null);
	const isKeyPressAllowedRef = useRef(true);
	const [modalData, setModalData] = useState<ReactNode | null>(null);
	const { showErrorMsg } = useMsg();

	useEffect(() => {
		setGuess('');
	}, [topGuess, bottomGuess]);

	useEffect(() => {
		const getDailyWord = async () => {
			try {
				const { dailyWord: newDailyWord, dayNumber } = await gameService.getDailyData();
				setDayNumber(dayNumber);
				if (newDailyWord !== dailyWord) {
					gameService.resetGame();
					setDailyWord(newDailyWord);
				}
			} catch (err) {
				showErrorMsg('שגיאת שרת');
			}
		};
		getDailyWord();

		if (isWin) {
			setGuess(dailyWord);
			onGuess(dailyWord);
		}
		if (isLoss) {
			onShowStats();
		}
	}, []);

	useEffect(() => {
		const onKeyPress = (ev: KeyboardEvent) => {
			handleKeyPress(ev.key);
		};

		window.addEventListener('keyup', onKeyPress);

		return () => {
			window.removeEventListener('keyup', onKeyPress);
		};
	}, [guess, modalData]);

	const onHighlightComplete = useCallback(
		(animation: GuessAnimation | null) => {
			// increment guessCount and check if gameOver
			if (animation === 'TOP' || animation === 'BOTTOM') {
				const method = animation === 'TOP' ? setTopGuess : setBottomGuess;
				method(guess);
				if (guessCount === MAX_GUESSES) return handleLoss();
				setGuessCount(prev => prev + 1);
			}
			if (animation === 'CORRECT') return handleWin();
			setAnimation(null);
			isKeyPressAllowedRef.current = true;
		},
		[guess]
	);

	useEffect(() => {
		setScore(calculateScore());
	}, [guessCount]);

	const handleKeyPress = useCallback(
		(key: string) => {
			if (!isKeyPressAllowedRef.current || modalData) return; // do not handle key presses during animation or when modal is open
			if (guess.length > 0 && (key === 'Backspace' || key === 'Delete')) {
				setGuess(prevGuess => prevGuess.slice(0, -1));
			} else if (guess.length < 5 && /^[א-ת]$/.test(key)) {
				setGuess(prevGuess => prevGuess + key);
			} else if (key === 'Enter') {
				onGuess();
			}
		},
		[guess, isKeyPressAllowedRef.current, modalData]
	);

	const handleLoss = () => {
		setAnimation(null);
		setIsLoss(true);
		isKeyPressAllowedRef.current = false;
		setStats(prev => {
			const newStats = {
				...prev,
				played: prev.played + 1,
				currentStreak: 0,
			};
			setModalData(<GameEndModal word={dailyWord} stats={newStats} />);

			return newStats;
		});
	};

	const handleWin = () => {
		isKeyPressAllowedRef.current = false;
		setIsWin(true);

		setStats(prev => {
			// only set stats if not already won today
			// this needs to happen inside setStats, so setModalData runs regardless.
			const newStats = isWin
				? prev
				: {
						...prev,
						played: prev.played + 1,
						wins: prev.wins + 1,
						currentStreak: prev.currentStreak + 1,
						bestStreak: Math.max(prev.currentStreak + 1, prev.bestStreak),
						scores: prev.scores.map((s, idx) => (idx === score - 1 ? s + 1 : s)),
				  };
			setModalData(<GameEndModal word={dailyWord} stats={newStats} isWin={true} score={score} />);
			return newStats;
		});
	};

	const calculateScore = () => {
		if (guessCount <= 5) {
			return 5;
		} else if (guessCount <= 8) {
			return 4;
		} else if (guessCount <= 11) {
			return 3;
		} else if (guessCount <= 13) {
			return 2;
		} else if (guessCount === 14) {
			return 1;
		} else {
			return 0;
		}
	};

	const onGuess = async (word = '') => {
		const guessWord = word || guess;
		isKeyPressAllowedRef.current = false;
		try {
			if (guessWord.length !== 5) {
				setAnimation('SHORT');

				return showErrorMsg('מילה קצרה מדי');
			}
			const isWord = await gameService.checkIsWord(guessWord);
			if (!isWord) {
				setAnimation('INCORRECT');

				return showErrorMsg('מילה לא קיימת');
			}

			if (guessWord <= topGuess) {
				setAnimation('BETWEEN');

				return showErrorMsg(
					<div>
						הכנס מילה המגיעה במילון אחרי <div className="font-bold">{topGuess}</div>
					</div>
				);
			} else if (guessWord >= bottomGuess) {
				setAnimation('BETWEEN');

				return showErrorMsg(
					<div>
						הכנס מילה המגיעה במילון לפני <div className="font-bold">{bottomGuess}</div>
					</div>
				);
			}
			const res = await gameService.compareWords(guessWord, dailyWord);
			setAnimation(res);
		} catch (err) {
			showErrorMsg('שגיאת שרת');
		}
	};

	const onShowStats = () => {
		if (modalData) return setModalData(null); // hide
		if (isWin) return setModalData(<GameEndModal word={dailyWord} stats={stats} isWin={true} score={score} />); // win
		if (isLoss) return setModalData(<GameEndModal word={dailyWord} stats={stats} />); // loss
		setModalData(<Stats stats={stats} showTitle />); // show default stats
	};

	return (
		<div className="flex flex-col h-full relative">
			<header className="sm:w-auto w-full mx-auto">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-5 ">
						<Link to="/" className="text-clamp-3xl">
							<IoHome />
						</Link>
						<h1 className="text-clamp-4xl font-bold">באמצעל</h1>
					</div>
					<div className="text-clamp-sm font-bold">
						<div className="leading-tight">מס</div>
						<div className="leading-tight text-end">{dayNumber}</div>
					</div>
					<button onClick={onShowStats} className="text-clamp-3xl">
						<IoStatsChart />
					</button>
				</div>
				<Separator />
				<GuessCounter count={guessCount} maxGuesses={MAX_GUESSES} score={score} />
			</header>
			<div className="self-center flex flex-col flex-1 items-center sm:py-10 py-8 justify-end">
				<div>
					<PreviousGuess guess={topGuess} />
					<CurrentGuess guess={guess} animation={animation} onHighlightComplete={onHighlightComplete} />
					<PreviousGuess guess={bottomGuess} />
				</div>
				<RemainingLetters guess={guess} topGuess={topGuess} bottomGuess={bottomGuess} />
				<Keyboard onKeyPress={handleKeyPress} />
			</div>
			{modalData && <Modal onCloseModal={() => setModalData(null)}>{modalData}</Modal>}
		</div>
	);
};

export default GamePage;
