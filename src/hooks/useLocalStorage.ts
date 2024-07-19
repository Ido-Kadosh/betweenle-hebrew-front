import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
	// get the value from local storage or use the initial value if not available
	const getStoredValue = (): T => {
		const storedValue = localStorage.getItem(key);
		if (storedValue) {
			return JSON.parse(storedValue);
		}
		return initialValue;
	};

	// Use the function form of useState to lazily initialize the state
	const [storedValue, setStoredValue] = useState<T>(getStoredValue);

	// Update local storage whenever the stored value changes
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue));
	}, [key, storedValue]);

	// Function to update the stored value
	const setValue = (value: T | ((val: T) => T)) => {
		setStoredValue(prevValue => (value instanceof Function ? value(prevValue) : value));
	};

	return [storedValue, setValue];
};

export default useLocalStorage;
