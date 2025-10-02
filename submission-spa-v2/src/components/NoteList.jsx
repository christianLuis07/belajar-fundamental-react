import React from "react";
import NoteItem from "./NoteItem";
import { useLanguage } from "../contexts/LanguageContext";

const NoteList = ({ notes, onDelete, onArchive, emptyMessage }) => {
  const { t } = useLanguage();

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h2>{emptyMessage || t("noNotes")}</h2>
        <p>{t("addNotePlaceholder")}</p>
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
