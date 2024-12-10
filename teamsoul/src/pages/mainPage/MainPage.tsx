import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Modal,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./MainPage.css";
import MainImage from "../../pictures/mainPageImg.svg";
import JoinGameModal from "./components/JoinGameModal";
import { useNavigate } from "react-router-dom";

const RightContainer = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5, 4),
  fontSize: "16px",
}));

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleClickCreateRoom = () => navigate("/select");

  return (
    <div className="mainPageContainer">
      <div className="leftContainer">
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
        <div className="buttonsContainer">
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={handleOpen} 
            sx={{
              borderRadius: "30px",
              margin: "0px",
              fontWeight: 500,
              color: "black",
              border: "2px solid #4BEDFF",
              textTransform: "none",
              "&:hover": {
                border: "2px solid #00BFFF",
              },
            }}
          >
            Присоединиться к игре
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleClickCreateRoom}
            sx={{
              borderRadius: "30px",
              margin: "0px",
              background: "linear-gradient(120deg, #0059FF, #81ADFE)",
              textTransform: "none",
              width: "250px",
            }}
          >
            Создать комнату
          </StyledButton>
        </div>
      </div>

      <div className="rightContainer">
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
