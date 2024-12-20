import axios from "axios";
import { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import loginPageImg from "../../pictures/loginPageImg.svg";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { loginUser } from "../../api";
import { AuthContext } from "../../App";

const LoginPage = () => {
  const authContext = useContext(AuthContext); // Получаем контекст
    if (!authContext) {
      throw new Error("AuthContext is not available");
    }

    const { setAuthenticated } = authContext; // Получаем setAuthenticated из контекста
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const loginRegex = /^[a-zA-Z0-9.]{3,20}$/;
  const passwordRegex = /^[a-zA-Z0-9@#$^%*()\-_=+!~]{6,10}$/;

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogin(value);
    validateInputs(value, password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validateInputs(login, value);
  };

  const validateInputs = (login: string, password: string) => {
    if (loginRegex.test(login) && passwordRegex.test(password)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = async (
    login: string,
    password: string,
    navigate: ReturnType<typeof useNavigate>
  ) => {
    try {
      const data = await loginUser(login, password);
      console.log("DATA", data);
      localStorage.setItem("token", data.token); // Сохраняем JWT-токен

      setAuthenticated(true); // Обновляем контекст, чтобы показать, что пользователь авторизован

      toast.success("Вы успешно вошли!", {
        position: "top-center",
      });
      navigate("/"); // Перенаправляем на главную страницу
    } catch (error: any) {
      if (error.message === "Неверный логин или пароль") {
        toast.error("Неверный логин или пароль.", {
          position: "top-center",
        });
      } else {
        toast.error("Произошла ошибка. Попробуйте позже.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="loginPageContainer">
      <div className="leftLoginContainer">
        <img src={loginPageImg} alt="Teamwork" style={{ width: "90vh" }} />
      </div>
      <div className="rightLoginContainer">
        <Typography
          variant="h3"
          component="h1"
          mb="15px"
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          Добро <br /> пожаловать!
        </Typography>

        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={handleLoginChange}
          error={!!login && !loginRegex.test(login)}
          helperText={
            !!login && !loginRegex.test(login)
              ? "Логин должен быть от 3 до 20 символов, только латинские буквы, цифры и точка."
              : ""
          }
        />
        <TextField
          label="Пароль"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          error={!!password && !passwordRegex.test(password)}
          helperText={
            !!password && !passwordRegex.test(password)
              ? "Пароль должен быть от 6 до 10 символов и содержать разрешенные символы."
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "rgba(95, 145, 252, 1)" }} />
                  ) : (
                    <Visibility sx={{ color: "rgba(95, 145, 252, 1)" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={() => handleSubmit(login, password, navigate)} // Передаем параметры явно
          disabled={isDisabled}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 3,
            width: "150px",
            fontWeight: "500",
            borderRadius: "50px",
            background: "linear-gradient(120deg, #0059FF, #81ADFE)",
            textTransform: "none",
            "&.Mui-disabled": {
              background: "#C7C7C7",
              color: "white",
            },
          }}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
