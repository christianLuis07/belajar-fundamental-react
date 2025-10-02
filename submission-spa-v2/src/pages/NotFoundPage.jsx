import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container">
      <div className="not-found">
        <h1>404</h1>
        <h2>{t("pageNotFound")}</h2>
        <p>{t("pageNotFoundDesc")}</p>
        <Link to="/" className="btn btn-primary">
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
