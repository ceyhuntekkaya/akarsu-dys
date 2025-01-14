import React from "react";
import ReactDOM from "react-dom";
import AppContextProvider from "./context/AppContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/site.css";
import reportWebVitals from "./reportWebVitals";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import ReactModal from "react-modal";
import UserContextProvider from "./context/UserContextProvider";
import Main from "./Main";
import { NotificationContainer } from "react-notifications";
import './i18n';
const root = ReactDOM.createRoot(document.getElementById("root"));
ReactModal.setAppElement("#root");



root.render(
  <AppContextProvider>
    <UserContextProvider>
      <NotificationContainer />
      <Main />
    </UserContextProvider>
  </AppContextProvider>
);

reportWebVitals();
