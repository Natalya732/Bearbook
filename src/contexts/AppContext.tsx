import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: User | null;
  updateUser: (user: User | null) => void;
}

const AppContext = createContext<AuthContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  function updateUser(user: User | null) {
    setUser(user);
  }
  return (
    <AppContext.Provider value={{ user, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error("useApp must be used within AppProvider");

  return context;
};
