import React from "react";

export default function NotFound() {
  // Konten komponen
  return (
    <>
      <div className="fixed w-full h-full min-h-screen min-w-screen z-[9999] font-bold text-3xl bg-white">
        <div className="mx-auto mt-10">
          <span className="loading loading-infinity loading-lg"></span>
          <h1>404</h1>
          <h1>Page Not Found</h1>
          <a href="/" className="btn bg-red-400 text-lg my-10">
            Back to Dashboard
          </a>
        </div>
      </div>
      {/* Isi komponen */}
    </>
  );
}
