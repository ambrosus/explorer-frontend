import { useEffect } from 'react';

/**
 * Hook to handle onClickOutside events. Pass an
 * element or a ref of an element to handle click
 * outside of it.

 * @param {React.RefObject<HTMLElement>} ref

 * @returns {void}
 */

export const useOnClickOutside = (
	ref: React.RefObject<HTMLElement>,
	handler: (event: MouseEvent) => void,
	) => {
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			const { current } = ref;
			if (!current || current.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};
		document.addEventListener('mousedown', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
		};
	}, [ref, handler]);
};
