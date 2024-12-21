import React, { useState } from "react";
import { Box, Button, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MainImage from "../../pictures/mainPageImg.svg";
import JoinGameModal from "./components/JoinGameModal";
import { useNavigate } from "react-router-dom";
import {
  mainPageContainerStyles,
  leftContainerStyles,
  rightContainerStyles,
  buttonsContainerStyles,
  buttonStyles,
} from "./MainPage.styles"; // Импортируем стили

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleClickCreateRoom = () => navigate("/select");

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
            sx={buttonStyles.outlinedButton} // Применяем стили из объекта
          >
            Присоединиться к игре
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickCreateRoom}
            sx={buttonStyles.containedButton} // Применяем стили из объекта
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
    </div>
  );
};

export default HomePage;
