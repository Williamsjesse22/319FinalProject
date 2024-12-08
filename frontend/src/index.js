import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client"; // For React 18+
import App from "./App.js";  // Import the App component


const root =
    ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div>
        <App />
    </div>
);
