import React, { useContext, useState } from "react";
import { Box, Button, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App"; // Импортируем контекст
import { createGame, createRoom } from "../../api/room/room.request"; // Предположим, что функция находится здесь
import {
  mainPageContainerStyles,
  leftContainerStyles,
  rightContainerStyles,
  buttonsContainerStyles,
  buttonStyles,
} from "./MainPage.styles"; // Импортируем стили
import MainImage from "../../pictures/mainPageImg.svg";
import JoinGameModal from "./components/JoinGameModal"; // Убедитесь, что путь корректен

const MainPage: React.FC = () => {
  const [open, setOpen] = useState(false); // Для открытия модального окна
  const [error, setError] = useState<string | null>(null); // Состояние для ошибок
  const [success, setSuccess] = useState<boolean>(false); // Состояние для успешного создания игры
  // Извлекаем токен из контекста

  const handleOpen = () => setOpen(true); // Открыть модальное окно
  const handleClose = () => setOpen(false); // Закрыть модальное окно
  const navigate = useNavigate();


const handleClickCreateRoom = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Необходима авторизация для создания игры.");
      return;
    }

    const response = await createRoom();
    if (response.roomId) {
      navigate(`/select/${response.roomId}`); // Переход на страницу игры
    } else {
      setError("Ошибка при создании игры");
    }
  } catch (error) {
    setError("Произошла ошибка при подключении к серверу");
  }
};

  return (
    <div style={mainPageContainerStyles}>
      <div style={leftContainerStyles}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="#2A72DD"
          fontWeight={600}
        >
          Игры для компании онлайн
        </Typography>
        <Typography variant="body1" gutterBottom>
          Создайте команду мечты — в любое время, в любом месте! Наша платформа
          для онлайн-тимбилдинга открывает новые возможности для удаленных
          команд. Забудьте про одноразовые мероприятия! Играйте, растите,
          побеждайте — вместе, где бы вы ни находились!
        </Typography>
        <div style={buttonsContainerStyles}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpen} // Открытие модального окна
            sx={buttonStyles.outlinedButton}
          >
            Присоединиться к игре
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickCreateRoom}
            sx={buttonStyles.containedButton}
          >
            Создать комнату
          </Button>
        </div>
      </div>

      <div style={rightContainerStyles}>
        <img
          src={MainImage}
          alt="Командная игра"
          style={{ maxWidth: "100%", height: "70vh" }}
        />
      </div>

      {/* Модальное окно для присоединения к игре */}
      <JoinGameModal isOpen={open} handleClose={handleClose} />

      {/* Snackbar для уведомлений */}
      <Snackbar
        open={!!error}
        message={error}
        onClose={() => setError(null)}
        autoHideDuration={4000}
      />
      <Snackbar
        open={success}
        message="Игра успешно создана!"
        onClose={() => setSuccess(false)}
        autoHideDuration={4000}
      />
    </div>
  );
};

export default MainPage;
