import React, { useContext, useState } from "react";
import { Box, Button, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createGame, createRoom } from "../../api/room/room.request"; 
import {
  mainPageContainerStyles,
  leftContainerStyles,
  rightContainerStyles,
  buttonsContainerStyles,
  buttonStyles,
} from "./MainPage.styles"; 
import MainImage from "../../pictures/mainPageImg.svg";
import JoinGameModal from "./components/JoinGameModal"; 

const MainPage: React.FC = () => {
  const [open, setOpen] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [success, setSuccess] = useState<boolean>(false); 

  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false); 
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
      console.log(response.roomId);
      navigate(`/select/${response.roomId}`); 
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
            onClick={handleOpen} 
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

      <JoinGameModal isOpen={open} handleClose={handleClose} />

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
