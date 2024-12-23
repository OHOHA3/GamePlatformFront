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

import {
  loginPageContainerStyles,
  leftLoginContainerStyles,
  rightLoginContainerStyles,
  loginImageStyles,
  buttonStyles,
  titleStyles,
} from "./LoginPage.styles";

import { AuthContext } from "../../App";
import { loginUser } from "../../api/auth/auth.request";
const LoginPage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not available");
  }

  const { setAuthenticated } = authContext;
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
      const data = await loginUser({ login, password });
      console.log("DATA", data);

      // Сохранение токена в localStorage
      localStorage.setItem("token", data.access_token);
      console.log("TOKEN", data.access_token);
      // Установка флага авторизации в localStorage


      // Обновление контекста авторизации
      setAuthenticated(true);

      toast.success("Вы успешно вошли!", {
        position: "top-center",
      });
      navigate("/");
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
    <div style={loginPageContainerStyles}>
      <div style={leftLoginContainerStyles}>
        <img src={loginPageImg} alt="Teamwork" style={loginImageStyles} />
      </div>
      <div style={rightLoginContainerStyles}>
        <Typography variant="h3" component="h1" mb="15px" sx={titleStyles}>
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
          onClick={() => handleSubmit(login, password, navigate)}
          disabled={isDisabled}
          variant="contained"
          color="primary"
          size="large"
          sx={buttonStyles}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
