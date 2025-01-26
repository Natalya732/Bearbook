import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "@contexts/AppContext";

interface Props extends PropsWithChildren {
  fallback?: string;
}

function PrivateRoute({ children, fallback }: Props) {
  const { user } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate(fallback || "/auth");
    return null;
  }

  return children;
}

export default PrivateRoute;
