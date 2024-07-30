import { GuessAnimation, IStats } from '../types/Game';
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

const getDailyData = (): Promise<{ dailyWord: string; dayNumber: number }> => {
	return httpService.get(BASE_URL + '/daily');
};

const calculateProximity = (topWord: string, midWord: string, bottomWord: string) => {
	return httpService.get(BASE_URL + '/proximity', { topWord, midWord, bottomWord });
};

const getDefaultStats = (): IStats => {
	return {
		played: 0,
		wins: 0,
		currentStreak: 0,
		bestStreak: 0,
		scores: [0, 0, 0, 0, 0],
	};
};

const resetGame = () => {
	localStorage.removeItem('topGuess');
	localStorage.removeItem('bottomGuess');
	localStorage.removeItem('guessCount');
	localStorage.removeItem('isDailyWin');
	localStorage.removeItem('dailyScore');
	location.reload();
};

export const gameService = {
	checkIsWord,
	compareWords,
	getDailyData,
	resetGame,
	getDefaultStats,
	calculateProximity,
};
