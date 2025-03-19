// src/hooks/useOutsideClick.ts
import { useEffect } from 'react';

const useOutsideClick = (
	ref: React.RefObject<HTMLElement>,
	callback: () => void,
	isOpen: boolean
) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [ref, callback, isOpen]);
};

export default useOutsideClick;
