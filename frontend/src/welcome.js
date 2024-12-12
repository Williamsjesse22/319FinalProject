import { useEffect } from 'react';

const Welcome = ({ onAnimationEnd }) => {
	useEffect(() => {
		const animationElement = document.querySelector('#welcome-container');

		const handleEnd = () => {
			// Add a delay before invoking onAnimationEnd
			setTimeout(() => {
				onAnimationEnd();
			}, 3500); // Adjust the delay (in milliseconds) as needed
		};

		if (animationElement) {
			animationElement.addEventListener('animationend', handleEnd);
		}

		return () => {
			if (animationElement) {
				animationElement.removeEventListener('animationend', handleEnd);
			}
		};
	}, [onAnimationEnd]);

};

export default Welcome;
