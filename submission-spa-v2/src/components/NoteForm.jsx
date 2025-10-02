import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import useInput from "../hooks/useInput";
import Swal from "sweetalert2";

const NoteForm = ({ onSubmit }) => {
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() && body.trim()) {
      setIsLoading(true);
      await onSubmit(title.trim(), body.trim());
      setIsLoading(false);

      Swal.fire({
        icon: "success",
        title: t("addNoteSuccess"),
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form">
        <h1>{t("addNote")}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              {t("title")}
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={title}
              onChange={onTitleChange}
              placeholder={t("titlePlaceholder")}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">
              {t("content")}
            </label>
            <textarea
              id="body"
              className="form-textarea"
              value={body}
              onChange={onBodyChange}
              placeholder={t("contentPlaceholder")}
              required
              rows="8"
              disabled={isLoading}
            />

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? t("loading") : t("save")}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
