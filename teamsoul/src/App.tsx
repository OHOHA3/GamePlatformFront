import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./modules/Header/Header";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/loginPage/LoginPage";
import GameSelectionPage from "./pages/gameSelectionPage/GameSelectionPage";
import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Header />
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route
            path="/"
            element={token ? <MainPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/select/:roomId"
            element={
              token ? <GameSelectionPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
