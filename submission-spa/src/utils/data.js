// Initial data untuk notes
const initialNotesData = [
  {
    id: "notes-1",
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "notes-2",
    title: "Functional Component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat dianggap sebagai functional component, maka harus mengembalikan JSX dan dipanggil layaknya React component.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "notes-3",
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau mengorganisasikan kode ke dalam berkas JavaScript yang berbeda.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "notes-4",
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kondisi yang dialami oleh React component mulai dari fase mounting (ketika component diberikan ke DOM) hingga unmounting (ketika component dihapus dari DOM).",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "notes-5",
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "notes-6",
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    archived: true,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
];

// Fungsi untuk mengambil data notes
export const getInitialNotes = () => {
  return initialNotesData;
};

export const getNoteById = (notes, id) => {
  return notes.find((note) => note.id === id);
};

export const getActiveNotes = (notes) => {
  return notes.filter((note) => !note.archived);
};

export const getArchivedNotes = (notes) => {
  return notes.filter((note) => note.archived);
};

export const searchNotes = (notes, query) => {
  if (!query) return notes;
  return notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const createNote = (title, body) => {
  return {
    id: `notes-${+new Date()}`,
    title,
    body,
    archived: false,
    createdAt: new Date().toISOString(),
  };
};

export const deleteNote = (notes, id) => {
  return notes.filter((note) => note.id !== id);
};

export const archiveNote = (notes, id) => {
  return notes.map((note) =>
    note.id === id ? { ...note, archived: !note.archived } : note
  );
};

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};
