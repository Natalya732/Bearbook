import { User } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ContextValue {
  user: null | User;
  updateUser: (user: User) => void;
}

const AppContext = createContext<ContextValue>({} as ContextValue);

export default function AppProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  function updateUser(user: User) {
    console.log("updating user...", user);
    setUser(user);
  }

  return (
    <AppContext.Provider value={{ user, updateUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}
