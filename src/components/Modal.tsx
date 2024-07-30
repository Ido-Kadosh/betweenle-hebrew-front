import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

interface PropTypes {
	children: ReactNode;
	onCloseModal: () => void;
}

const Modal = ({ children, onCloseModal }: PropTypes) => {
	return (
		<div className="absolute inset-0 m-auto grid place-items-center shadow-[0_0_3em_0.2em_#555] bg-white max-w-fit max-h-fit text-clamp-lg py-[1em] px-[0.5em] z-[9999]">
			{children}
			<button
				className="border-[0.1em] text-[1.5em] rounded-full border-black absolute top-[0.5em] left-[0.5em]"
				onClick={onCloseModal}
			>
				<IoClose />
			</button>
		</div>
	);
};

export default Modal;
