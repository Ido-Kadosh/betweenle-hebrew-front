import React from 'react';
import { useMsg } from '../contexts/MsgContext/useMsg';

interface PropTypes {
	children: React.ReactNode;
	onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const KeyboardButton = ({ children, onClick }: PropTypes) => {
	const { setMsg } = useMsg();
	const handleClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setMsg(null);
		onClick(ev);
	};

	return (
		<button
			onClick={handleClick}
			className="text-gray-100 bg-gray-200 rounded-lg font-semibold text-2xl w-14 grid place-items-center aspect-square "
		>
			{children}
		</button>
	);
};

export default KeyboardButton;
