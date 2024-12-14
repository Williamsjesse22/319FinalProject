import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { launchConfetti, stopConfetti } from './confetti'; // Ensure you import stopConfetti
import './styles/confetti.css';

const ConfettiPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Start the confetti animation
		launchConfetti(7000); // Launch confetti for 7 seconds

		// Clean up the confetti animation when the component unmounts
		return () => stopConfetti();
	}, []);

	useEffect(() => {
		// Redirect to the '/listPets' route after 7 seconds
		const timer = setTimeout(() => {
			navigate('/listPets');
		}, 7000);

		// Clear the timer if the component unmounts before 7 seconds
		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="confetti-page" style={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center'}}>
			<h1 style={{font: 'Sour Gummy'}}>🎉Congratulations!🎉</h1>
		</div>
	);
};

export default ConfettiPage;
