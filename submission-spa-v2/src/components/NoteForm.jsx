import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() && body.trim()) {
      onSubmit(title.trim(), body.trim());
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Tambah Catatan</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul Catatan"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">
              Content
            </label>
            <textarea
              id="body"
              className="form-textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Isi Catatan"
              required
              rows="8"
            />

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save Note
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
