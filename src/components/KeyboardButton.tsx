import React from 'react';

interface PropTypes {
	children: React.ReactNode;
	onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const KeyboardButton = ({ children, onClick }: PropTypes) => {
	return (
		<button
			onClick={onClick}
			className="text-gray-100 bg-gray-200 rounded-lg font-semibold text-2xl w-14 grid place-items-center aspect-square "
		>
			{children}
		</button>
	);
};

export default KeyboardButton;
