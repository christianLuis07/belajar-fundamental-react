import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes, searchNotes } from "../utils/data";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

const ArchivedPage = ({ notes, onDelete, onArchive }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const handleSearchChange = (newQuery) => {
    if (newQuery) {
      setSearchParams({ search: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const archivedNotes = getArchivedNotes(notes);
  const filteredNotes = searchNotes(archivedNotes, query);
  return (
    <div className="container">
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "700" }}
        >
          Arsip
        </h1>
        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
          placeholder="Cari arsip notes..."
        />
      </div>
      <NoteList
        notes={filteredNotes}
        onDelete={onDelete}
        onArchive={onArchive}
        emptyMessage="Tidak ada catatan arsip"
      />
    </div>
  );
};

export default ArchivedPage;
