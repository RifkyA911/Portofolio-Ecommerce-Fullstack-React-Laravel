import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const BackToDashboard = () => {
  return (
    <>
      <div>
        <a href="/" className="btn bg-red-400 text-lg my-10">
          Back to Dashboard
        </a>
      </div>
    </>
  );
};

export const RedirectPage = (props) => {
  const currentPath = window.location.pathname;
  console.log("path url:", currentPath);
  useEffect(() => {
    navigate("/");
    navigate(0);
  });
  const navigate = useNavigate();
  return (
    <>
      <div>Redirecting to Dashboard...</div>
    </>
  );
};

export default function NotFound() {
  // Konten komponen
  return (
    <>
      <div className="fixed w-full h-full min-h-screen min-w-screen z-[9999] font-bold text-3xl bg-white">
        <div className="mx-auto mt-10">
          <span className="loading loading-infinity loading-lg"></span>
          <h1>404</h1>
          <h1>Page Not Found</h1>
          <BackToDashboard />
        </div>
      </div>
      {/* Isi komponen */}
    </>
  );
}

export function BadRequest() {
  // Konten komponen
  return (
    <>
      <div className="fixed w-full h-full min-h-screen min-w-screen z-[9999] font-bold text-3xl bg-white">
        <div className="mx-auto mt-10">
          <span className="loading loading-infinity loading-lg"></span>
          <h1>404</h1>
          <h1>Bad Request</h1>
          <BackToDashboard />
        </div>
      </div>
      {/* Isi komponen */}
    </>
  );
}

export function Unauthorized() {
  // Konten komponen
  return (
    <>
      <div className="fixed w-full h-full min-h-screen min-w-screen z-[9999] font-bold text-3xl bg-white">
        <div className="mx-auto mt-10">
          <span className="loading loading-infinity loading-lg"></span>
          <h1>401</h1>
          <h1>Unauthorized</h1>
          <BackToDashboard />
        </div>
      </div>
      {/* Isi komponen */}
    </>
  );
}

export function Forbidden() {
  // Konten komponen
  return (
    <>
      <div className="fixed w-full h-full min-h-screen min-w-screen z-[9999] font-bold text-3xl bg-white">
        <div className="mx-auto mt-10">
          <span className="loading loading-infinity loading-lg"></span>
          <h1>403</h1>
          <h1>Access Forbidden</h1>
          <BackToDashboard />
        </div>
      </div>
      {/* Isi komponen */}
    </>
  );
}

export function InternalServerError() {
  // Konten komponen
  return (
    <>
      <div className="fixed w-full h-full min-h-screen min-w-screen z-[9999] font-bold text-3xl bg-white">
        <div className="mx-auto mt-10">
          <span className="loading loading-infinity loading-lg"></span>
          <h1>500</h1>
          <h1>Internal Server Error</h1>
          <BackToDashboard />
        </div>
      </div>
      {/* Isi komponen */}
    </>
  );
}
