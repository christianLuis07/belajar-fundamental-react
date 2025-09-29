import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="not-found">
        <h1>404</h1>
        <h2>Halaman tidak ditemukan</h2>
        <p>Halaman yang kamu cari tidak ditemukan</p>
        <Link to="/" className="btn btn-primary">
          Kembali ke halaman utama
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
