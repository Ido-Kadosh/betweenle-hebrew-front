import { Msg } from '../components/UserMsg';

type Listener = (data: any) => void;
type ListenersMap = { [eventName: string]: Listener[] };

export const SHOW_MSG = 'show-msg';

const createEventEmitter = () => {
	const listenersMap: ListenersMap = {};
	return {
		on(evName: string, listener: Listener): () => void {
			listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener];
			return () => {
				listenersMap[evName] = listenersMap[evName].filter(func => func !== listener);
			};
		},
		emit(evName: string, data: any): void {
			if (!listenersMap[evName]) return;
			listenersMap[evName].forEach(listener => listener(data));
		},
	};
};

export const eventBus = createEventEmitter();

export const showUserMsg = (msg: Msg) => {
	eventBus.emit(SHOW_MSG, msg);
};

export const showSuccessMsg = (txt: string) => {
	showUserMsg({ txt, type: 'success' });
};

export const showErrorMsg = (txt: string) => {
	showUserMsg({ txt, type: 'error' });
};
