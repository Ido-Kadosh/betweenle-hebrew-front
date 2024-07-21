import { useEffect, useState } from 'react';

const useCountdown = (initialTime: number | null) => {
	const [timeRemaining, setTimeRemaining] = useState<number | null>(initialTime);

	useEffect(() => {
		if (initialTime === null) return;

		setTimeRemaining(initialTime);

		const interval = 1000; // ms
		let expected = Date.now() + interval;
		let timerId: number;

		const step = () => {
			const dt = Date.now() - expected; // the drift (positive for overshooting)
			if (dt > interval) {
				// a whole interval was missed, handle significant drift
				// can add special handling here if necessary
				console.warn('Significant drift detected, timer may not be accurate.');
			}
			// Update the countdown
			setTimeRemaining(prevTime => {
				const newTime = (prevTime || 0) - interval;
				if (newTime <= 0) {
					clearTimeout(timerId);
					return 0;
				}
				return newTime;
			});

			expected += interval;
			timerId = window.setTimeout(step, Math.max(0, interval - dt)); // take into account drift
		};

		timerId = window.setTimeout(step, interval);

		return () => {
			timerId && clearTimeout(timerId);
		};
	}, [initialTime]);

	return timeRemaining;
};

export default useCountdown;
