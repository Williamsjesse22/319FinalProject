
const duration = 60 * 60 * 1000,
	animationEnd = Date.now() + duration,
	defaults = { startVelocity: 15, spread: 360, ticks: 5000, zIndex: 0 }; // Reduced velocity and increased ticks for slower animation

function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
}

const interval = setInterval(function () {
	const timeLeft = animationEnd - Date.now();

	if (timeLeft <= 0) {
		return clearInterval(interval);
	}

	const particleCount = 20 * (timeLeft / duration);

	// since particles fall down, start a bit higher than random
	confetti(
		Object.assign({}, defaults, {
			particleCount,
			origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
		})
	);
	confetti(
		Object.assign({}, defaults, {
			particleCount,
			origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
		})
	);
}, 500); // Reduced interval frequency for a smoother appearance
