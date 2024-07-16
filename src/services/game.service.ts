import { GuessDirection } from '../types/Game';

const guessWord = async (guess: string): Promise<GuessDirection> => {
	if (guess.length !== 5) throw new Error('invalid word length');
	return 'BOTTOM';
};

export const gameService = {
	guessWord,
};
