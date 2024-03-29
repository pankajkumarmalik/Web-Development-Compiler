import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );
  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );

  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className="font-bold select-none">Web Dev Compiler</h2>
      </Link>
      <ul className="flex gap-2">
        <li>
          <Link to="/compiler">
            <Button variant={"outline"}>Start Coding</Button>
          </Link>
        </li>
        <li>
          <Link to="/all-codes">
            <Button variant={"link"}>All Codes</Button>
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/my-codes">
                <Button variant={"link"}>My Codes</Button>
              </Link>
            </li>

            <li>
              <Button
                loading={isLoading}
                onClick={handleLogout}
                variant={"destructive"}
              >
                Logout
              </Button>
            </li>
            <li>
              <Avatar>
                <AvatarImage src={currentUser.picture} />
                <AvatarFallback className="capitalize">
                  {currentUser.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Button variant={"blue"}>Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button variant={"blue"}>Signup</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
