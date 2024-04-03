import Header from "./components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice";
import AllRoutes from "./AllRoutes";
import { Route, Routes } from "react-router-dom";
import { Home } from "lucide-react";
import AllCodes from "./pages/AllCodes";
import Compiler from "./pages/Compiler";
import Login from "./pages/Login";
import MyCodes from "./pages/MyCodes";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

function App() {
  const { data, error } = useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    } else if (error) {
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }
  }, [data, error]);
  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <AllRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
