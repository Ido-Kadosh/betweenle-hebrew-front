import { useCallback, useEffect, useState, useRef } from 'react';
import CurrentGuess from '../components/CurrentGuess';
import PreviousGuess from '../components/PreviousGuess';
import Keyboard from '../components/Keyboard';
import { gameService } from '../services/game.service';
import RemainingLetters from '../components/RemainingLetters';
import { GuessAnimation } from '../types/Game';
import GuessCounter from '../components/GuessCounter';
import useLocalStorage from '../hooks/useLocalStorage';
import { useMsg } from '../contexts/MsgContext/useMsg';

const MAX_GUESSES = 14;

const GamePage = () => {
	const [dailyWord, setDailyWord] = useLocalStorage('dailyWord', '');
	const [topGuess, setTopGuess] = useLocalStorage('topGuess', 'אאאאא');
	const [bottomGuess, setBottomGuess] = useLocalStorage('bottomGuess', 'תתתתת');
	const [guessCount, setGuessCount] = useLocalStorage('guessCount', 1);
	const [guess, setGuess] = useState<string>('');
	const [animation, setAnimation] = useState<GuessAnimation | null>(null);
	const isKeyPressAllowedRef = useRef<boolean>(true);
	const { showErrorMsg } = useMsg();

	useEffect(() => {
		const getDailyWord = async () => {
			const newDailyWord = await gameService.getDailyWord();
			if (newDailyWord !== dailyWord) {
				gameService.resetGame();
				setDailyWord(newDailyWord);
			}
		};
		getDailyWord();
	}, []);

	useEffect(() => {
		const onKeyPress = (ev: KeyboardEvent) => {
			handleKeyPress(ev.key);
		};

		window.addEventListener('keyup', onKeyPress);

		return () => {
			window.removeEventListener('keyup', onKeyPress);
		};
	}, [guess]);

	useEffect(() => {
		setGuess('');
	}, [topGuess, bottomGuess]);

	const onHighlightComplete = useCallback(
		(animation: GuessAnimation | null) => {
			// increment guessCount and check if gameOver
			if (animation === 'TOP' || animation === 'BOTTOM') {
				setGuessCount(prev => {
					if (prev === MAX_GUESSES) handleGameOver();
					return prev + 1;
				});
				const method = animation === 'TOP' ? setTopGuess : setBottomGuess;
				method(guess);
			}
			setAnimation(null);
			isKeyPressAllowedRef.current = true;
		},
		[guess]
	);

	const handleKeyPress = useCallback(
		(key: string) => {
			if (!isKeyPressAllowedRef.current) return; // do not handle key presses during animation
			if (guess.length > 0 && (key === 'Backspace' || key === 'Delete')) {
				setGuess(prevGuess => prevGuess.slice(0, -1));
			} else if (guess.length < 5 && /^[א-ת]$/.test(key)) {
				setGuess(prevGuess => prevGuess + key);
			} else if (key === 'Enter') {
				onGuess();
			}
		},
		[guess, isKeyPressAllowedRef.current]
	);

	const handleGameOver = () => {
		console.log('over!');
		isKeyPressAllowedRef.current = false;
	};

	const handleWin = () => {
		isKeyPressAllowedRef.current = false;
	};

	const onGuess = async () => {
		try {
			if (guess.length !== 5) {
				setAnimation('SHORT');
				isKeyPressAllowedRef.current = false;
				return showErrorMsg('מילה קצרה מדי');
			}
			const isWord = await gameService.checkIsWord(guess);
			if (!isWord) {
				setAnimation('INCORRECT');
				isKeyPressAllowedRef.current = false;
				return showErrorMsg('מילה לא קיימת');
			}

			if (guess <= topGuess) {
				setAnimation('BETWEEN');
				isKeyPressAllowedRef.current = false;
				return showErrorMsg(
					<div>
						הכנס מילה המגיעה במילון אחרי <div className="font-bold">{topGuess}</div>
					</div>
				);
			} else if (guess >= bottomGuess) {
				setAnimation('BETWEEN');
				isKeyPressAllowedRef.current = false;
				return showErrorMsg(
					<div>
						הכנס מילה המגיעה במילון לפני <div className="font-bold">{bottomGuess}</div>
					</div>
				);
			}
			const res = await gameService.compareWords(guess, dailyWord);
			if (res === 'CORRECT') {
				handleWin();
			}
			setAnimation(res);
			isKeyPressAllowedRef.current = false;
		} catch (err) {
			showErrorMsg('שגיאה');
		}
	};

	return (
		<div className="flex flex-col h-full">
			<header className="mt-2">
				<h1 className="text-4xl font-bold">באמצעל</h1>
				<GuessCounter count={guessCount} maxGuesses={MAX_GUESSES} />
			</header>
			<div className="self-center mt-5 flex flex-col items-center h-full ">
				<div>
					<PreviousGuess guess={topGuess} />
					<CurrentGuess guess={guess} animation={animation} onHighlightComplete={onHighlightComplete} />
					<PreviousGuess guess={bottomGuess} />
				</div>
				<RemainingLetters />
				<Keyboard onKeyPress={handleKeyPress} />
			</div>
		</div>
	);
};

export default GamePage;
