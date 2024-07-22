import React, { useEffect, useRef } from 'react';
import { useMsg } from '../contexts/MsgContext/useMsg';

interface PropTypes {
	children: React.ReactNode;
	onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const KeyboardButton = ({ children, onClick }: PropTypes) => {
	const { setMsg } = useMsg();
	const buttonRef = useRef<HTMLButtonElement>(null);

	// backspace makes buttons focused, and disables 'Enter' to send
	// since pressing keyboard also works, we don't need focus for accessibility.
	useEffect(() => {
		const handleFocus = () => {
			if (buttonRef.current) {
				buttonRef.current.blur();
			}
		};

		if (buttonRef.current) {
			buttonRef.current.addEventListener('focus', handleFocus);
		}

		return () => {
			if (buttonRef.current) {
				buttonRef.current.removeEventListener('focus', handleFocus);
			}
		};
	}, []);

	const handleClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setMsg(null); // hide message for better user experience
		onClick(ev);
	};

	return (
		<button
			ref={buttonRef}
			tabIndex={-1}
			onClick={handleClick}
			className="text-gray-100 bg-gray-300 rounded-lg font-semibold text-2xl w-14 grid place-items-center aspect-square "
		>
			{children}
		</button>
	);
};

export default KeyboardButton;
