import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-3147xwx2v1obps8g.us.auth0.com"
      clientId="O17VUWuQDRjE3M4CCvC1FPYO8e6ASwLV"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
