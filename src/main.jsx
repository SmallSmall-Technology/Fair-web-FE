import "./index.css";
import App from "./App";
import React from "react";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

// bootstrap css import
// import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
