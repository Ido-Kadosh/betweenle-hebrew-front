import { httpService } from './http.service';

const getTimeTilMidnight = async () => {
	return httpService.get('time-til-midnight');
};

/**
 * Formats a duration in milliseconds into a "HH:MM:SS" string.
 *
 * @param {number} milliseconds - The duration to format in milliseconds.
 * @returns {string} The formatted time string.
 */
const formatTime = (milliseconds: number): string => {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const hours = Math.floor(totalSeconds / 3600)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((totalSeconds % 3600) / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (totalSeconds % 60).toString().padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
};

export const utilService = {
	getTimeTilMidnight,
	formatTime,
};
