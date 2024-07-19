import React, { createContext, ReactNode, useState } from 'react';
import { IMsg } from '../../components/UserMsg';

export const MsgContext = createContext<IMsgProvider>({} as IMsgProvider);

export interface IMsgProvider {
	msg: IMsg | null;
	setMsg: React.Dispatch<React.SetStateAction<IMsg | null>>;
	showErrorMsg: (...args: (string | ReactNode)[]) => void;
	showSuccessMsg: (...args: (string | ReactNode)[]) => void;
}

const MsgProvider = ({ children }: { children: React.ReactNode }) => {
	const [msg, setMsg] = useState<IMsg | null>(null);

	const getMsgData = (...args: (string | ReactNode)[]) => {
		// Combine args into a single React fragment

		const combinedMessage = (
			<React.Fragment>
				{args.map((arg, idx) => (
					<span key={idx}>
						{arg}
						{typeof arg === 'string' && idx < args.length - 1 ? ' ' : null}
					</span>
				))}
			</React.Fragment>
		);
		return combinedMessage;
	};

	const showErrorMsg = (...args: (string | ReactNode)[]) => {
		const combinedMessage = getMsgData(...args);
		setMsg({ type: 'error', txt: combinedMessage });
	};

	const showSuccessMsg = (...args: (string | ReactNode)[]) => {
		const combinedMessage = getMsgData(...args);
		setMsg({ type: 'success', txt: combinedMessage });
	};

	const value: IMsgProvider = { msg, setMsg, showErrorMsg, showSuccessMsg };

	return <MsgContext.Provider value={value}>{children}</MsgContext.Provider>;
};

export default MsgProvider;
