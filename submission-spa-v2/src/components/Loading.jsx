import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

function Loading() {
  const { t } = useLanguage();
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Loading;
