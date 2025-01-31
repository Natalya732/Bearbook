import { User } from "@supabase/supabase-js";
import { PropsWithChildren, useState } from "react";
import { createContext } from "vm";

interface ContextValue {
  user: null | User;
  updateUser: (user: User | null) => void;
}

const AppContext = createContext<ContextValue>({} as ContextValue);

const AppProvider: React.FC<ContextValue> = ({
  children,
}: PropsWithChildren) => {
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
