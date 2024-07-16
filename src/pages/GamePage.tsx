import { useCallback, useEffect, useState } from 'react';
import CurrentGuess from '../components/CurrentGuess';
import PreviousGuess from '../components/PreviousGuess';
import { useLocalStorage } from '@uidotdev/usehooks';
import Keyboard from '../components/Keyboard';

const GamePage = () => {
	const [topGuess, setTopGuess] = useLocalStorage('topGuess', 'אאאאא');
	const [bottomGuess, setBottomGuess] = useLocalStorage('bottomGuess', 'תתתתת');
	const [guess, setGuess] = useState<string>('');

	const handleKeyPress = useCallback(
		(key: string) => {
			if (guess.length < 5 && /^[א-ת]$/.test(key)) {
				setGuess(prevGuess => prevGuess + key);
			}
			if (guess.length > 0 && (key === 'Backspace' || key === 'Delete')) {
				setGuess(prevGuess => prevGuess.slice(0, -1));
			}
		},
		[guess]
	);

	useEffect(() => {
		const onKeyPress = (ev: KeyboardEvent) => {
			handleKeyPress(ev.key);
		};

		window.addEventListener('keyup', onKeyPress);

		return () => {
			window.removeEventListener('keyup', onKeyPress);
		};
	}, [guess]);

	return (
		<div className="flex flex-col">
			<header className="mt-2">
				<h1 className="text-4xl font-bold">באמצעל</h1>
			</header>
			<div className="self-center mt-5 flex flex-col items-center">
				<div>
					<PreviousGuess word={topGuess} />
					<CurrentGuess guess={guess} />
					<PreviousGuess word={bottomGuess} />
				</div>
				<Keyboard onKeyPress={handleKeyPress} />
			</div>
		</div>
	);
};

export default GamePage;
