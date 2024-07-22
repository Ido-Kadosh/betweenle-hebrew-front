import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

interface PropTypes {
	children: ReactNode;
	onCloseModal: () => void;
}

const Modal = ({ children, onCloseModal }: PropTypes) => {
	return (
		<div className="absolute inset-0 m-auto grid place-items-center  shadow-[0_0_3em_0.2em_#555] bg-white max-w-fit max-h-fit text-3xl p-4">
			{children}
			<button className="border-2 rounded-full border-black absolute top-4 left-4" onClick={onCloseModal}>
				<IoClose />
			</button>
		</div>
	);
};

export default Modal;
