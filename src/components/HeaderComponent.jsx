import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightToBracket,
  faUserPlus,
  faRightFromBracket,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const HeaderComponent = () => {
  const { env, setEnv } = useApi();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleEnvChange = (e) => {
    setEnv(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FontAwesomeIcon icon={faHome} size="2x" className="me-2 text-primary" />
          <span className="fs-4 text-primary">User Management System</span>
        </Link>

        {/* Right Controls */}
        <div className="d-flex align-items-center gap-3">
          {/* Env Switch */}
          <div className="d-flex align-items-center">
            <label htmlFor="env-select" className="text-white me-2">API:</label>
            <select
              id="env-select"
              className="form-select form-select-sm"
              style={{ width: "150px" }}
              value={env}
              onChange={handleEnvChange}
            >
              <option value="default">Default (9898)</option>
              <option value="dev">Dev (9899)</option>
              <option value="prod">Prod (9900)</option>
            </select>
          </div>

          {/* Auth Buttons */}
          {user ? (
            <>
              <span className="text-light me-2">👋 {user.username}</span>
              <Link to="/profile" className="btn btn-outline-info btn-sm">
                <FontAwesomeIcon icon={faUser} className="me-1" /> Profile
              </Link>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} className="me-1" /> Logout
              </button>
		
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm">
                <FontAwesomeIcon icon={faRightToBracket} className="me-1" /> Login
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-sm">
                <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Register
              </Link>
			  
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
