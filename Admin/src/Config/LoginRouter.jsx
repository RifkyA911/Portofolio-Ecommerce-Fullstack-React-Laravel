import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import React from "react";
import { Dashboard, NotFound, Login } from "../Pages";

function LoginRouter() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <p className="mx-auto">Proceed to Dashboard Landing...</p>
              <span className="loading loading-dots loading-lg"></span>
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default LoginRouter;
