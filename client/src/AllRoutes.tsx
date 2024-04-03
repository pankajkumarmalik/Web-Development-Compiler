import { Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";
import Loader from "./components/loader/Loader";
// import Home from "./pages/Home";
// import AllCodes from "./pages/AllCodes";
// import Compiler from "./pages/Compiler";
// import Login from "./pages/Login";
// import MyCodes from "./pages/MyCodes";
// import NotFound from "./pages/NotFound";
// import Signup from "./pages/Signup";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Compiler = lazy(() => import("./pages/Compiler"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllCodes = lazy(() => import("./pages/AllCodes"));
const MyCodes = lazy(() => import("./pages/MyCodes"));

export default function AllRoutes() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
          <Loader />
        </div>
      }
    >
      {/* <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center"> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-codes" element={<AllCodes />} />
        <Route path="/my-codes" element={<MyCodes />} />
        <Route path="/compiler/:urlId?" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </div> */}
    </Suspense>
  );
}
