import { useCallback, useEffect, useState } from 'react';
import CurrentGuess from '../components/CurrentGuess';
import PreviousGuess from '../components/PreviousGuess';
import { useLocalStorage } from '@uidotdev/usehooks';
import Keyboard from '../components/Keyboard';
import { gameService } from '../services/game.service';
import { showErrorMsg } from '../services/eventBus.service';
import RemainingLetters from '../components/RemainingLetters';
import { GuessDirection } from '../types/Game';

const GamePage = () => {
	const [topGuess, setTopGuess] = useLocalStorage('topGuess', 'אאאאא');
	const [bottomGuess, setBottomGuess] = useLocalStorage('bottomGuess', 'תתתתת');
	const [guess, setGuess] = useState<string>('');
	const [slideDirection, setSlideDirection] = useState<GuessDirection | null>(null);

	useEffect(() => {
		const onKeyPress = (ev: KeyboardEvent) => {
			handleKeyPress(ev.key);
		};

		window.addEventListener('keyup', onKeyPress);

		return () => {
			window.removeEventListener('keyup', onKeyPress);
		};
	}, [guess]);

	const onHighlightComplete = useCallback(
		(direction: GuessDirection | null) => {
			const method = direction === 'TOP' ? setTopGuess : setBottomGuess;
			// make sure to set previous guess before setting guess to empty string
			setGuess(() => {
				method(guess);
				return '';
			});
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

	const onGuess = async () => {
		try {
			const res = await gameService.guessWord(guess);
			setSlideDirection(res);
		} catch (err) {
			showErrorMsg('אין מספיק אותיות!');
		}
	};

	return (
		<div className="flex flex-col">
			<header className="mt-2">
				<h1 className="text-4xl font-bold">באמצעל</h1>
			</header>
			<div className="self-center mt-5 flex flex-col items-center">
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
