import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/network-data";
import { useLanguage } from "../contexts/LanguageContext";
import useInput from "../hooks/useInput";
import Swal from "sweetalert2";

function RegisterPage() {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("passwordMismatch"),
      });
      return;
    }

    setIsLoading(true);
    const { error } = await register({ name, email, password });
    setIsLoading(false);

    if (!error) {
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: t("registerSuccess"),
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("registerFailed"),
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{t("registerTitle")}</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">{t("name")}</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={onNameChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={onEmailChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={onPasswordChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? t("loading") : t("registerButton")}
          </button>
        </form>
        <p className="auth-link">
          {t("haveAccount")} <Link to="/login">{t("loginHere")}</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
