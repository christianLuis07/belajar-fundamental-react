import React from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes, searchNotes } from "../utils/data";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

const HomePage = ({ notes, onDelete, onArchive }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const handleSearchChange = (newQuery) => {
    if (newQuery) {
      setSearchParams({ search: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const activeNotes = getActiveNotes(notes);
  const filteredNotes = searchNotes(activeNotes, query);
  return (
    <div className="container">
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "700" }}
        >
          Catatan Saya
        </h1>
        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
          placeholder="Cari notes..."
        />
      </div>

      <NoteList
        notes={filteredNotes}
        onDelete={onDelete}
        onArchive={onArchive}
        emptyMessage={
          query ? "Tidak ada catatan yang cocok" : "Tidak ada catatan"
        }
      />
    </div>
  );
};

export default HomePage;
