import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

const translations = {
  id: {
    notesApp: "Aplikasi Catatan",
    home: "Beranda",
    archived: "Arsip",
    addNote: "Tambah Catatan",
    logout: "Keluar",
    login: "Masuk",
    register: "Daftar",
    myNotes: "Catatan Saya",
    archivedNotes: "Arsip",
    searchPlaceholder: "Cari notes...",
    searchArchivedPlaceholder: "Cari arsip notes...",
    noNotes: "Tidak ada catatan",
    noArchivedNotes: "Tidak ada catatan arsip",
    addNotePlaceholder: "Silahkan tambahkan catatan",
    title: "Judul",
    content: "Konten",
    titlePlaceholder: "Judul Catatan",
    contentPlaceholder: "Isi Catatan",
    save: "Simpan",
    cancel: "Batal",
    delete: "Hapus",
    archive: "Arsipkan",
    unarchive: "Buka Arsip",
    back: "Kembali",
    createdAt: "Dibuat pada",
    deleteConfirm: "Kamu yakin ingin menghapus catatan ini?",
    deleteSuccess: "Catatan berhasil dihapus!",
    archiveConfirm: "Kamu yakin ingin mengarsipkan catatan ini?",
    archiveSuccess: "Catatan berhasil diarsipkan!",
    unarchiveConfirm: "Kamu yakin ingin membuka arsip catatan ini?",
    unarchiveSuccess: "Catatan berhasil dipindahkan dari arsip!",
    addNoteSuccess: "Catatan berhasil ditambahkan!",
    yes: "Ya",
    cancel: "Batal",
    noteNotFound: "Note tidak ditemukan",
    noteNotFoundDesc: "Note yang kamu cari tidak ditemukan",
    backToHome: "Kembali ke Beranda",
    pageNotFound: "Halaman tidak ditemukan",
    pageNotFoundDesc: "Halaman yang kamu cari tidak ditemukan",
    name: "Nama",
    email: "Email",
    password: "Password",
    confirmPassword: "Konfirmasi Password",
    loginTitle: "Masuk ke Akun",
    registerTitle: "Daftar Akun Baru",
    loginButton: "Masuk",
    registerButton: "Daftar",
    noAccount: "Belum punya akun?",
    haveAccount: "Sudah punya akun?",
    registerHere: "Daftar di sini",
    loginHere: "Masuk di sini",
    loading: "Memuat...",
    passwordMismatch: "Password tidak cocok",
  },
  en: {
    notesApp: "Notes App",
    home: "Home",
    archived: "Archived",
    addNote: "Add Note",
    logout: "Logout",
    login: "Login",
    register: "Register",
    myNotes: "My Notes",
    archivedNotes: "Archived",
    searchPlaceholder: "Search notes...",
    searchArchivedPlaceholder: "Search archived notes...",
    noNotes: "No notes",
    noArchivedNotes: "No archived notes",
    addNotePlaceholder: "Please add a note",
    title: "Title",
    content: "Content",
    titlePlaceholder: "Note Title",
    contentPlaceholder: "Note Content",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    archive: "Archive",
    unarchive: "Unarchive",
    back: "Back",
    createdAt: "Created at",
    deleteConfirm: "Are you sure you want to delete this note?",
    deleteSuccess: "Note deleted successfully!",
    archiveConfirm: "Are you sure you want to archive this note?",
    archiveSuccess: "Note archived successfully!",
    unarchiveConfirm: "Are you sure you want to unarchive this note?",
    unarchiveSuccess: "Note moved from archive successfully!",
    addNoteSuccess: "Note added successfully!",
    yes: "Yes",
    cancel: "Cancel",
    noteNotFound: "Note not found",
    noteNotFoundDesc: "The note you are looking for was not found",
    backToHome: "Back to Home",
    pageNotFound: "Page not found",
    pageNotFoundDesc: "The page you are looking for was not found",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    loginTitle: "Login to Account",
    registerTitle: "Register New Account",
    loginButton: "Login",
    registerButton: "Register",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    registerHere: "Register here",
    loginHere: "Login here",
    loading: "Loading...",
    passwordMismatch: "Passwords do not match",
  },
};

export const LanguageProvider = ({ children }) => {
  const [languange, setLanguange] = useState("id");

  const toggleLanguange = () => {
    setLanguange((prevLanguange) => (prevLanguange === "id" ? "en" : "id"));
  };

  const t = (key) => {
    return translations[languange][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ languange, toggleLanguange, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage harus digunakan dalam LanguageProvider");
  }

  return context;
};

export default LanguageContext;
