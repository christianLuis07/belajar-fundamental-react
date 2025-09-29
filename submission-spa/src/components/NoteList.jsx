import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({
  notes,
  onDelete,
  onArchive,
  emptyMessage = "Tidak ada catatan",
}) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h2>{emptyMessage}</h2>
        <p>Silahkan tambahkan catatan</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
};

export default NoteList;
