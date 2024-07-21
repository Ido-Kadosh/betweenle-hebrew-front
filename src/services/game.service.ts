import { GuessAnimation } from '../types/Game';
import { httpService } from './http.service';

const BASE_URL = 'game';

const checkIsWord = async (guess: string): Promise<boolean> => {
	return httpService.get(BASE_URL + '/check', { guess });
};

const compareWords = async (guess: string, word: string): Promise<GuessAnimation> => {
	if (guess < word) return 'TOP';
	else if (guess > word) return 'BOTTOM';
	else return 'CORRECT';
};

const getDailyWord = (): Promise<string> => {
	return httpService.get(BASE_URL + '/daily');
};

const resetGame = () => {
	localStorage.removeItem('topGuess');
	localStorage.removeItem('bottomGuess');
	localStorage.removeItem('guessCount');
	location.reload();
};

const getTimeTilMidnight = async () => {
	return httpService.get(BASE_URL + 'time-til-midnight');
};

export const gameService = {
	checkIsWord,
	compareWords,
	getDailyWord,
	resetGame,
	getTimeTilMidnight,
};
