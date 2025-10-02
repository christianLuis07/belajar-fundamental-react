import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ArchivedPage from "./pages/ArchivedPage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Loading from "./components/Loading";
import {
  getActiveNotes as getActiveNotesAPI,
  getArchivedNotes as getArchivedNotesAPI,
  addNote,
  deleteNote as deleteNoteAPI,
  archiveNote as archiveNoteAPI,
  unarchiveNote as unarchiveNoteAPI,
} from "./utils/network-data";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Guest Route Component
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes([]);
      setLoading(false);
    }
  }, [user]);

  const fetchNotes = async () => {
    setLoading(true);
    const [activeResult, archivedResult] = await Promise.all([
      getActiveNotesAPI(),
      getArchivedNotesAPI(),
    ]);

    if (!activeResult.error && !archivedResult.error) {
      setNotes([...activeResult.data, ...archivedResult.data]);
    }
    setLoading(false);
  };

  const handleAddNote = async (title, body) => {
    const { error } = await addNote({ title, body });
    if (!error) {
      await fetchNotes();
    }
  };

  const handleDeleteNote = async (id) => {
    const { error } = await deleteNoteAPI(id);
    if (!error) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };

  const handleArchiveNote = async (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    const { error } = note.archived
      ? await unarchiveNoteAPI(id)
      : await archiveNoteAPI(id);

    if (!error) {
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === id ? { ...n, archived: !n.archived } : n
        )
      );
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {loading ? (
                  <Loading />
                ) : (
                  <HomePage
                    notes={notes}
                    onDelete={handleDeleteNote}
                    onArchive={handleArchiveNote}
                  />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/archived"
            element={
              <ProtectedRoute>
                {loading ? (
                  <Loading />
                ) : (
                  <ArchivedPage
                    notes={notes}
                    onDelete={handleDeleteNote}
                    onArchive={handleArchiveNote}
                  />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/new"
            element={
              <ProtectedRoute>
                <AddNotePage onAddNote={handleAddNote} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <ProtectedRoute>
                {loading ? (
                  <Loading />
                ) : (
                  <DetailPage
                    notes={notes}
                    onDelete={handleDeleteNote}
                    onArchive={handleArchiveNote}
                  />
                )}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
