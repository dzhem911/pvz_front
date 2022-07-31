import {BrowserRouter} from "react-router-dom";
import RouterApp from "./components/router/RouterApp";
import LogoutButton from "./components/main/LogoutButton";
import React from "react";
import './app.css'
import TopBar from "./components/topbar/TopBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar/>
        <RouterApp/>
        <LogoutButton/>
      </BrowserRouter>
    </>
  );
}

export default App;
