import { Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";
import Loader from "./components/loader/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Compiler = lazy(() => import("./pages/Compiler"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function AllRoutes() {
  return (
    <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/compiler/:urlId?" element={<Compiler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
