import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Notes App
        </Link>

        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link
            to="/archived"
            className={`nav-link ${isActive("/archived") ? "active" : ""}`}
          >
            Archived
          </Link>
          <Link
            to="/notes/new"
            className={`nav-link ${isActive("/notes/new") ? "active" : ""}`}
          >
            Add Note
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
