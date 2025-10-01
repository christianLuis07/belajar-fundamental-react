import React, { useState } from "react";
import { Route, Routes, useEffect } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/api";
import { LocaleProvider } from "../contexts/LocaleContext";

function ContactApp() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  function toggleLocale() {
    const newLocale = locale === "id" ? "en" : "id";
    localStorage.setItem("locale", newLocale);
    setLocale(newLocale);
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  async function onLogout() {
    setAuthedUser(null);
    localStorage.removeItem("accessToken");
  }

  const localeContextValue = {
    locale,
    toggleLocale,
    theme,
    toggleTheme,
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleProvider value={localeContextValue}>
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>{locale === "id" ? "Aplikasi Kontak" : "Contact App"}</h1>
          </header>
          <main>
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={this.onLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider value={localeContextValue}>
      <div className="contact-app">
        <header className="contact-app__header">
          <h1>{locale === "id" ? "Aplikasi Kontak" : "Contact App"}</h1>
          <Navigation
            onLogout={onLogout}
            name={authedUser ? authedUser.name : null}
          />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
          </Routes>
        </main>
      </div>
    </LocaleProvider>
  );
}

export default ContactApp;
