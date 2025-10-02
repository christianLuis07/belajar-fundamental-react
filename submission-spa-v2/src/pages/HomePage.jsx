import React from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes, searchNotes } from "../utils/data";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { useLanguage } from "../contexts/LanguageContext";
import Swal from "sweetalert2";

const HomePage = ({ notes, onDelete, onArchive }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const { t } = useLanguage();

  const handleSearchChange = (newQuery) => {
    if (newQuery) {
      setSearchParams({ search: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: t("deleteConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yes"),
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire({
          icon: "success",
          title: t("deleteSuccess"),
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleArchive = (id) => {
    Swal.fire({
      title: t("archiveConfirm"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: t("yes"),
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        onArchive(id);
        Swal.fire({
          icon: "success",
          title: t("archiveSuccess"),
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const activeNotes = getActiveNotes(notes);
  const filteredNotes = searchNotes(activeNotes, query);

  return (
    <div className="container">
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "700" }}
        >
          {t("myNotes")}
        </h1>
        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
          placeholder={t("searchPlaceholder")}
        />
      </div>

      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onArchive={handleArchive}
        emptyMessage={query ? t("noNotes") : t("noNotes")}
      />
    </div>
  );
};

export default HomePage;
