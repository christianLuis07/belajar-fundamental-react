import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, getUserLogged, putAccessToken } from "../utils/network-data";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import useInput from "../hooks/useInput";
import Swal from "sweetalert2";

function LoginPage() {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { loginUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { error, data } = await login({ email, password });
    setIsLoading(false);

    if (!error) {
      // simpan token dulu agar getUserLogged tidak gagal
      putAccessToken(data.accessToken);

      // fetch detail user
      const userResponse = await getUserLogged();

      if (!userResponse.error) {
        // simpan ke context
        loginUser(data.accessToken, userResponse.data);

        Swal.fire({
          icon: "success",
          title: t("success"),
          text: t("loginSuccess"),
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: t("loginFailed"),
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("loginFailed"),
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{t("login-title")}</h1>
        <form onSubmit={handleSubmit} className="auth-form">
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
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? t("loading") : t("loginButton")}
          </button>
        </form>
        <p className="auth-link">
          {t("noAccount")} <Link to={"/register"}>{t("registerHere")}</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
