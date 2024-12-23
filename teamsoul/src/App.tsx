import logo from "./logo.svg";
import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./modules/Header/Header";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/loginPage/LoginPage";
import GameSelectionPage from "./pages/gameSelectionPage/GameSelectionPage";

import { Toaster } from "react-hot-toast";
import "./App.css";

interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("CONTEXT", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(true);  // УБРАТЬ !!!!!!!

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     validateToken(token)
  //       .then(() => setAuthenticated(true))
  //       .catch(() => {
  //         localStorage.removeItem("token");
  //         setAuthenticated(false);
  //       });
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  console.log("AUTH", isAuthenticated)
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div style={{ paddingTop: "60px" }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select/:roomCode"
              element={
                <ProtectedRoute>
                  <GameSelectionPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster position="top-center" />
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
