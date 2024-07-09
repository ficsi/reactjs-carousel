import { useState, useRef, useEffect } from 'react';

function useThrottle(fn, delay) {
	const [isThrottled, setIsThrottled] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		return () => clearTimeout(timeoutRef.current);
	}, []);

	const throttledFunction = (...args) => {
		if (isThrottled) return;
		setIsThrottled(true);
		fn(...args);
		timeoutRef.current = setTimeout(() => setIsThrottled(false), delay);
	};

	return throttledFunction;
}

export default useThrottle;