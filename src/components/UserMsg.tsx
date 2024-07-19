import { ReactNode, useEffect, useRef } from 'react';
import { useMsg } from '../contexts/MsgContext/useMsg.js';

export interface IMsg {
	txt: string | ReactNode;
	type: 'success' | 'error';
}

const UserMsg = () => {
	const timeoutIdRef = useRef<number | null>(null);
	const { msg, setMsg } = useMsg();

	useEffect(() => {
		if (msg !== null) {
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
				timeoutIdRef.current = null;
			}
			timeoutIdRef.current = window.setTimeout(closeMsg, 3000);
		}
	}, [msg]);

	const closeMsg = () => {
		setMsg(null);
	};

	return (
		<>
			{msg && (
				<section
					className={`absolute inset-0 max-w-max m-auto  z-[99999] text-white text-xl text-center font-semibold min-w-max max-h-min px-8 py-4 rounded-lg ${
						msg.type === 'error' ? 'bg-error' : 'bg-gray-500'
					}`}
				>
					{msg.txt}
				</section>
			)}
		</>
	);
};

export default UserMsg;
