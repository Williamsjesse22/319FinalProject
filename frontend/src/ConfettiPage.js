import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfettiPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/listPets"); // Redirect to the Pet List page after 3 seconds
    }, 7000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigate]);

  return (
    <div>
      <iframe
        src="./confetti/confetti.html"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
        title="Confetti Animation"
      ></iframe>
    </div>
  );
};

export default ConfettiPage;
