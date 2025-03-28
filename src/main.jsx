import "./index.css";
import App from "./App";
import React from "react";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
// const queryClient = React.useMemo(() => new QueryClient(), []);

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ReactQueryDevtools
            initialIsOpen={process.env.NODE_ENV === "development"}
          />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
