import React from "react";
import NoteForm from "../components/NoteForm";

const AddNotePage = ({ onAddNote }) => {
  return <NoteForm onSubmit={onAddNote} />;
};

export default AddNotePage;
