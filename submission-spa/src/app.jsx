import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ArchivedPage from "./pages/ArchivedPage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  getInitialNotes,
  createNote,
  deleteNote,
  archiveNote,
} from "./utils/data";

function App() {
  const [notes, setNotes] = useState(getInitialNotes());

  const handleAddNote = (title, body) => {
    const newNote = createNote(title, body);
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => deleteNote(prevNotes, id));
  };

  const handleArchiveNote = (id) => {
    setNotes((prevNotes) => archiveNote(prevNotes, id));
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  notes={notes}
                  onDelete={handleDeleteNote}
                  onArchive={handleArchiveNote}
                />
              }
            />
            <Route
              path="/archived"
              element={
                <ArchivedPage
                  notes={notes}
                  onDelete={handleDeleteNote}
                  onArchive={handleArchiveNote}
                />
              }
            />
            <Route
              path="/notes/new"
              element={<AddNotePage onAddNote={handleAddNote} />}
            />
            <Route
              path="/notes/:id"
              element={
                <DetailPage
                  notes={notes}
                  onDelete={handleDeleteNote}
                  onArchive={handleArchiveNote}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
