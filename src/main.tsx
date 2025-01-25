import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { ApolloProvider } from '@apollo/client';
import client from "./apollo-client.ts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </ApolloProvider>
);
