import React from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { languange, toggleLanguange, t } = useLanguage();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          {t("notesApp")}
        </Link>
        <div className="header-right">
          {user && (
            <nav className="nav">
              <Link to="/" className={`nav-link ${isActive("/")}`}>
                {t("home")}
              </Link>
              <Link
                to="/archived"
                className={`nav-link ${isActive("/archived")}`}
              >
                {t("archived")}
              </Link>
              <Link
                to="/notes/new"
                className={`nav-link ${isActive("/notes/new")}`}
              >
                {t("addNote")}
              </Link>
            </nav>
          )}
          <div className="header-actions">
            <button
              className="btn-icon"
              onClick={toggleTheme}
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            <button
              className="btn-icon"
              onClick={toggleLanguange}
              title={languange === "id" ? "English" : "Indonesia"}
            >
              {languange === "id" ? "EN" : "ID"}
            </button>

            {user && (
              <button
                className="btn btn-secondary btn-small"
                onClick={logoutUser}
              >
                {t("logout")}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
