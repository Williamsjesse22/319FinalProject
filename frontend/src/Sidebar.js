import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column vh p-3 bg-light"
      style={{ width: "250px" }}
    >
      <h2 className="text-center">Navigation</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-dark">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/listPets" className="nav-link text-dark">
            View All Pets
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/searchPet" className="nav-link text-dark">
            Search Pet
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/addPet" className="nav-link text-dark">
            Add Pet
          </Link>
        </li>
        <li>
          <Link to="/updatePet" className="nav-link text-dark">
            Update Pet
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/deletePet" className="nav-link text-dark">
            Delete Pet
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
