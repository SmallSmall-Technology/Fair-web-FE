import "./index.css";
import App from "./App";
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

// bootstrap css import
// import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
