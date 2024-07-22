export type GuessAnimation = 'TOP' | 'BOTTOM' | 'CORRECT' | 'INCORRECT' | 'SHORT' | 'BETWEEN' | null;

export interface IStats {
	played: number;
	wins: number;
	currentStreak: number;
	bestStreak: number;
	scores: number[];
}
