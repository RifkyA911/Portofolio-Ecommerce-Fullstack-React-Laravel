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
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default LoginRouter;
