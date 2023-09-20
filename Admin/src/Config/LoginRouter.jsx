import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import React from "react";
import { Login /*Dashboard*/ } from "../Pages";
import NotFound from "../Pages/Error/Error";

function LoginRouter() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <p className="mx-auto mt-10">
                Proceed Landing to Dashboard Page...
              </p>
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
