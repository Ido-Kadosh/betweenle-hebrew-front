import { useCallback, useEffect, useState } from 'react';
import CurrentGuess from '../components/CurrentGuess';
import PreviousGuess from '../components/PreviousGuess';
import { useLocalStorage } from '@uidotdev/usehooks';
import Keyboard from '../components/Keyboard';
import { gameService } from '../services/game.service';
import { showErrorMsg } from '../services/eventBus.service';
import RemainingLetters from '../components/RemainingLetters';
import { GuessResult } from '../types/Game';
import GuessCounter from '../components/GuessCounter';

const MAX_GUESSES = 14;

const GamePage = () => {
	const [topGuess, setTopGuess] = useLocalStorage('topGuess', 'אאאאא');
	const [bottomGuess, setBottomGuess] = useLocalStorage('bottomGuess', 'תתתתת');
	const [guessCount, setGuessCount] = useLocalStorage('guessCount', 1);
	const [guess, setGuess] = useState<string>('');
	const [slideDirection, setSlideDirection] = useState<GuessResult | null>(null);

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
		(direction: GuessResult | null) => {
			// increment guessCount and check if gameOver
			setGuessCount(prev => {
				if (prev === MAX_GUESSES) handleGameOver();
				return prev + 1;
			});

			const method = direction === 'TOP' ? setTopGuess : setBottomGuess;
			method(guess);

			setSlideDirection(null);
		},
		[guess]
	);

	const handleKeyPress = useCallback(
		(key: string) => {
			if (guess.length > 0 && (key === 'Backspace' || key === 'Delete')) {
				setGuess(prevGuess => prevGuess.slice(0, -1));
			} else if (guess.length < 5 && /^[א-ת]$/.test(key)) {
				setGuess(prevGuess => prevGuess + key);
			} else if (key === 'Enter') {
				onGuess();
			}
		},
		[guess]
	);

	const handleGameOver = () => {
		console.log('over!');
	};
	const handleWin = () => {};

	const onGuess = async () => {
		try {
			const res = await gameService.guessWord(guess);
			if (res === 'CORRECT') {
				handleWin();
			}
			setSlideDirection(res);
		} catch (err) {
			showErrorMsg('אין מספיק אותיות!');
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
					<CurrentGuess guess={guess} slideDirection={slideDirection} onHighlightComplete={onHighlightComplete} />
					<PreviousGuess guess={bottomGuess} />
				</div>
				<RemainingLetters />
				<Keyboard onKeyPress={handleKeyPress} />
			</div>
		</div>
	);
};

export default GamePage;
