import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, formatDate } from "../utils/data";
import { useLanguage } from "../contexts/LanguageContext";

const DetailPage = ({ notes, onDelete, onArchive }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const note = getNoteById(notes, id);

  if (!note) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>404</h1>
          <h2>{t("noteNotFound")}</h2>
          <p>{t("noteNotFoundDesc")}</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            {t("backToHome")}
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(t("deleteConfirm"))) {
      onDelete(note.id);
      navigate("/");
    }
  };

  const handleArchive = () => {
    onArchive(note.id);
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="detail-header">
          <h1 className="detail-title">{note.title}</h1>
        </div>
        <div className="detail-meta">
          {t("createdAt")} {formatDate(note.createdAt)}
          {note.archived && (
            <span
              style={{
                marginLeft: "16px",
                padding: "4px 8px",
                backgroundColor: "#ffc107",
                color: "#212529",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {t("archived")}
            </span>
          )}
        </div>
        <div className="detail-body">{note.body}</div>
        <div className="detail-actions">
          <button className="btn btn-secondary" onClick={handleBack}>
            {t("back")}
          </button>
          <button
            className={`btn ${note.archived ? "btn-primary" : "btn-secondary"}`}
            onClick={handleArchive}
          >
            {note.archived ? t("unarchive") : t("archive")}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
