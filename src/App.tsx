import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile/Profile";
import Feed from "./pages/Feed/Feed";
import Auth from "./pages/Auth/Auth";
import Supabase from "@utils/supabase";
import AppProvider from "@contexts/AppContext";

export const applicationRoutes: RouteObject[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/feed", element: <Feed /> },
  { path: "/auth", element: <Auth /> },
];

const myRoutes = createBrowserRouter(applicationRoutes);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  function handleSupabaseAuth() {
    Supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = Supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return subscription;
  }

  useEffect(() => {
    const subscription = handleSupabaseAuth();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppProvider>
      <RouterProvider router={myRoutes} />
    </AppProvider>
  );
}
