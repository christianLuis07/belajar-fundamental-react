import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, formatDate } from "../utils/data";

const DetailPage = ({ notes, onDelete, onArchive }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = getNoteById(notes, id);

  if (!note) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>404</h1>
          <h2>Note tidak ditemukan</h2>
          <p>Note yang kamu cari tidak ditemukan</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Kamu yakin ingin menghapus catatan ini?")) {
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
          Dibuat pada {formatDate(note.createdAt)}
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
              Arsip
            </span>
          )}
        </div>
        <div className="detail-body">{note.body}</div>
        <div className="detail-actions">
          <button className="btn btn-secondary" onClick={handleBack}>
            Kembali
          </button>
          <button
            className={`btn ${note.archived ? "btn-primary" : "btn-secondary"}`}
            onClick={handleArchive}
          >
            {note.archived ? "Buka" : "Arsipkan"}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
