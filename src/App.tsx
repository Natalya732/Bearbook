import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile/Profile";
import Feed from "./pages/Feed/Feed";
import Auth from "./pages/Auth/Auth";

import { useApp } from "@contexts/AppContext";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import supabase from "@utils/supabase";
import { Session } from "@supabase/supabase-js";
import User from "@pages/User/User";

const ProtectedRoute: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  return session ? <Outlet /> : <Auth />;
};

export const applicationRoutes: RouteObject[] = [
  { path: "/auth", element: <Auth /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/feed", element: <Feed /> },
      { path: "/auth", element: <Auth /> },
      { path: "/user", element: <User /> },
    ],
  },
];

const myRoutes = createBrowserRouter(applicationRoutes);
export default function App() {
  const { user } = useApp();

  console.log("session", User);
  useEffect(() => {
    if (window.location.pathname !== "/auth" && !user) {
      window.location.replace("http://localhost:5173/auth");
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={myRoutes} />
    </>
  );
}
