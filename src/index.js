import React from "react";
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
import {NotificationContainer} from "react-notifications";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";


const root = createRoot(document.getElementById("root"));
ReactModal.setAppElement("#root");


root.render(
    <AppContextProvider>
        <UserContextProvider>
            <NotificationContainer/>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </UserContextProvider>
    </AppContextProvider>
);

reportWebVitals();
