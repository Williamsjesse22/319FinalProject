// Select the main content container
const mainContent = document.getElementById("mainContent");

// Function to handle the welcome animation and transition
const welcomeAnimation = () => {
    setTimeout(() => {
        mainContent.style.display = "block"; // Display the main content
        document.body.style.overflow = "auto"; // Enable scrolling
    }, 7000); // Matches the duration of the welcome animation
};

// Trigger the animation when the page loads
window.addEventListener("load", welcomeAnimation);
