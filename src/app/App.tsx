import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./AppLayout.tsx";
import "./style/index.scss";
import { Provider } from "react-redux";

import firebase from "firebase/compat/app";

import { BrowserRouter } from "react-router-dom";
import { Theme, presetGpnDark } from "@consta/uikit/Theme";
import { store } from "./redux/store.ts";

firebase.initializeApp({
  apiKey: "AIzaSyBtSZqXA4MWlVU2YY47gdJjfQsQxl9F_Ck",
  authDomain: "react-list-19b12.firebaseapp.com",
  projectId: "react-list-19b12",
  storageBucket: "react-list-19b12.appspot.com",
  messagingSenderId: "342778729398",
  appId: "1:342778729398:web:e13d16308000bd272be717",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Theme preset={presetGpnDark}>
          <AppLayout />
        </Theme>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
