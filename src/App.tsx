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
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AppProvider from "@contexts/AppContext";
import { Toaster } from "react-hot-toast";

export const applicationRoutes: RouteObject[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/feed", element: <Feed /> },
  { path: "/auth", element: <Auth /> },
];

const myRoutes = createBrowserRouter(applicationRoutes);
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [signedUp, setSignedUp] = useState<boolean>(false);

  function handleSupabaseAuth() {
    Supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = Supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      session ? setSignedUp(true) : setSignedUp(false);
    });

    return subscription;
  }

  useEffect(() => {
    const subscription = handleSupabaseAuth();

    return () => subscription.unsubscribe();
  }, []);

  return !session ? (
    <Auth isSignedUp={signedUp} setIsSignedUp={setSignedUp} />
  ) : (
    <AppProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={myRoutes} />
    </AppProvider>
  );
}
