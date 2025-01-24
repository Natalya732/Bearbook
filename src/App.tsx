import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { applicationRoutes } from "./routes/applicationRoutes";

const myRoutes = createBrowserRouter(applicationRoutes);


export default function App() {
  return <RouterProvider router={myRoutes} />;
}
