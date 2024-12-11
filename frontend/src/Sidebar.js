import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ userRole, isLoggedIn, handleLogout }) => {
  return (
    <div className="sidebar">
      <h2 className="text-center">Navigation</h2>
      <ul className="nav flex-column">
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
        {userRole === "admin" && (
          <>
            <li className="nav-item">
              <Link to="/addPet" className="nav-link text-dark">
                Add Pet
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/updatePet" className="nav-link text-dark">
                Update Pet
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/deletePet" className="nav-link text-dark">
                Delete Pet
              </Link>
            </li>
          </>
        )}
        <li className="nav-item">
          {isLoggedIn ? (
            <button
              className="btn btn-danger w-100 mt-3"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="nav-link text-dark">
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;