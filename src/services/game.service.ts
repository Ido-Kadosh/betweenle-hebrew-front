import { GuessResult } from '../types/Game';

const word = 'יהלום';

const guessWord = async (guess: string): Promise<GuessResult> => {
	if (guess.length !== 5) throw new Error('invalid word length');
	if (guess < word) return 'TOP';
	else if (guess > word) return 'BOTTOM';
	else return 'CORRECT';
};

export const gameService = {
	guessWord,
};
