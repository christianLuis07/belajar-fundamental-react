import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/data";

const NoteItem = ({ note, onDelete, onArchive }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Kamu yakin ingin menghapus catatan ini?")) {
      onDelete(note.id);
    }
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
          {note.archived ? "Unarchive" : "Archive"}
        </button>
        <button className="btn btn-small btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
