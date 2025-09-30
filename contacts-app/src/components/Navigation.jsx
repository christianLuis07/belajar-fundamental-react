import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiHome, FiPlusCircle, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { LocaleConsumer } from "../contexts/LocaleContext";

function Navigation({ onLogout, name }) {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale, theme, toggleTheme }) => {
        return (
          <nav className="navigation">
            <ul>
              {/* Selalu tampil */}
              <li>
                <button onClick={toggleTheme}>
                  {theme === "light" ? <FiMoon /> : <FiSun />}
                </button>
              </li>
              <li>
                <button onClick={toggleLocale}>
                  {locale === "id" ? "en" : "id"}
                </button>
              </li>

              {/* Tampil hanya kalau login */}
              {name && (
                <>
                  <li>
                    <Link to={"/"}>
                      <FiHome />
                    </Link>
                  </li>
                  <li>
                    <Link to={"/add"}>
                      <FiPlusCircle />
                    </Link>
                  </li>
                  <li>
                    <button onClick={onLogout}>
                      {name}
                      <FiLogOut />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  onLogout: PropTypes.func,
  name: PropTypes.string,
};

export default Navigation;
