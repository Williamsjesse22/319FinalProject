import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import launchConfetti from './confetti';
import "./styles/confetti.css";

const ConfettiPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    launchConfetti();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/listPets'); // Redirect to the Pet List page after 7 seconds
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <canvas id="confetti-canvas" style={{ width: '100%', height: '100%' }}></canvas>
      <h1>Congratulations!</h1>
    </div>
  );
};

export default ConfettiPage;
