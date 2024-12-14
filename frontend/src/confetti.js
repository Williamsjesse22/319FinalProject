// /* global confetti */
// const defaults = { startVelocity: 15, spread: 360, ticks: 500, zIndex: 0 };

// function randomInRange(min, max) {
// 	return Math.random() * (max - min) + min;
// }

// let interval; // To keep track of the interval

// const launchConfetti = (duration = 5000) => {
// 	const animationEnd = Date.now() + duration;

// 	interval = setInterval(() => {
// 		const timeLeft = animationEnd - Date.now();

// 		if (timeLeft <= 0) {
// 			clearInterval(interval);
// 			return;
// 		}

// 		const particleCount = 20 * (timeLeft / duration);

// 		confetti(
// 			Object.assign({}, defaults, {
// 				particleCount,
// 				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
// 			})
// 		);
// 		confetti(
// 			Object.assign({}, defaults, {
// 				particleCount,
// 				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
// 			})
// 		);
// 	}, 500);
// };

// const stopConfetti = () => {
// 	if (interval) {
// 		clearInterval(interval);
// 	}
// };

// export { launchConfetti, stopConfetti };

