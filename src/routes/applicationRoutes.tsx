import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile/Profile";
import Feed from "../pages/Feed/Feed";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

export const applicationRoutes: RouteObject[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/feed", element: <Feed /> },
  { path: "/", element: <Dashboard /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/signup", element: <Signup /> },
];
