import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/data";
import { useLanguage } from "../contexts/LanguageContext";

const NoteItem = ({ note, onDelete, onArchive }) => {
  const { t } = useLanguage();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(note.id);
  };

  const handleArchive = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onArchive(note.id);
  };

  return (
    <div className="note-item">
      <Link
        to={`/notes/${note.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3>{note.title}</h3>
        <div className="meta">{formatDate(note.createdAt)}</div>
        <p className="body">{note.body}</p>
      </Link>
      <div className="card-actions" style={{ marginTop: "16px" }}>
        <button
          className={`btn btn-small ${
            note.archived ? "btn-warning" : "btn-secondary"
          }`}
          onClick={handleArchive}
        >
          {note.archived ? t("unarchive") : t("archive")}
        </button>
        <button className="btn btn-small btn-danger" onClick={handleDelete}>
          {t("delete")}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
