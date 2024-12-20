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
import { validateToken } from "./api"; // Импорт функции проверки токена
import { Toaster } from "react-hot-toast"; // Импорт Toaster
import "./App.css";

// Типизация контекста пользователя
interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

// Создаем контекст авторизации
export const AuthContext = createContext<AuthContextProps | null>(null);

// Хук для использования контекста
const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("CONTEXT", context)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Провайдер авторизации
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token)
        .then(() => setAuthenticated(true))
        .catch(() => {
          localStorage.removeItem("token");
          setAuthenticated(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// HOC для защищенных маршрутов
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Если пользователь не авторизован, перенаправляем его на страницу логина
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Приложение
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div style={{ paddingTop: "60px" }}>
          <Routes>
            {/* Публичный маршрут для страницы логина */}
            <Route path="/login" element={<LoginPage />} />

            {/* Все остальные маршруты защищены */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select"
              element={
                <ProtectedRoute>
                  <GameSelectionPage />
                </ProtectedRoute>
              }
            />
            {/* Добавьте другие защищенные маршруты аналогично */}
          </Routes>
        </div>
      </BrowserRouter>

      {/* Компонент Toaster для уведомлений */}
      <Toaster position="top-center" />
    </AuthProvider>
  );
};

// Рендер приложения
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
