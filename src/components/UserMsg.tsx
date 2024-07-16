import { useState, useEffect, useRef } from 'react';
import { eventBus } from '../services/eventBus.service.js';

export interface Msg {
	txt: string;
	type: 'success' | 'error';
}

export const UserMsg = () => {
	const [msg, setMsg] = useState<Msg | null>(null);
	const timeoutIdRef = useRef<number | null>(null);

	useEffect(() => {
		const unsubscribe = eventBus.on('show-msg', msg => {
			setMsg(msg);
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
				timeoutIdRef.current = null;
			}
			timeoutIdRef.current = window.setTimeout(closeMsg, 5000);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const closeMsg = () => {
		setMsg(null);
	};

	if (!msg) return <span></span>;

	return (
		<section
			className={`grid place-items-center absolute inset-0 max-w-max m-auto z-[99999] text-white text-xl font-semibold min-w-max px-8 h-14 rounded-lg ${
				msg.type === 'error' ? 'bg-error' : 'bg-gray-500'
			}`}
		>
			{msg.txt}
		</section>
	);
};
