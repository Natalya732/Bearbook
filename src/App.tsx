import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile/Profile";
import Feed from "./pages/Feed/Feed";
import Auth from "./pages/Auth/Auth";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AppProvider, useApp } from "@contexts/AppContext";
import { Toaster } from "react-hot-toast";

export const applicationRoutes: RouteObject[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/feed", element: <Feed /> },
];

const myRoutes = createBrowserRouter(applicationRoutes);

function AuthWrapper() {
  const { user } = useApp();
  return user ? <RouterProvider router={myRoutes} /> : <Auth />;
}

export default function App() {
  return (
    <AppProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthWrapper />
    </AppProvider>
  );
}
