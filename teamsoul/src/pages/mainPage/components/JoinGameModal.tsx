import { useState } from "react";
import {
  Modal,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { validateToken } from "../../../api/auth/auth.request";
import { joinRoom } from "../../../api/room/room.request";
import {
  modalStyles,
  iconButtonStyles,
  textFieldStyles,
  cancelButtonStyles,
  joinButtonStyles,
} from "./styles"; 
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const JoinGameModal: React.FC<ModalProps> = ({ isOpen, handleClose }) => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoomCode(value);
    setIsCodeEntered(value.trim().length > 0);
  };

  const handleJoinRoom = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен не найден. Пожалуйста, авторизуйтесь.");
      }

            const response = await joinRoom({

              roomId: roomCode,
              authorizationToken: token,
            });

            toast.success("Вы успешно подключились к комнате!", {
              position: "top-center",
            });
            handleClose();
            console.log("RES", response);
            console.log("URL", response.url)
            window.location.href = response.url;
    } catch (error: any) {
      toast.error(error.message || "Не удалось подключиться к комнате.", {
        position: "top-center",
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyles}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={iconButtonStyles}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="h2"
          fontWeight="600"
          mb={2}
          align="center"
        >
          Присоединение к игре
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={3}
          padding="0 20px"
          align="center"
        >
          Для присоединения к игре Вам нужно <br /> ввести её код
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Введите код"
          value={roomCode}
          onChange={handleChange}
          sx={textFieldStyles}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={cancelButtonStyles}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinRoom}
            disabled={!isCodeEntered}
            sx={joinButtonStyles}
          >
            Присоединиться
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default JoinGameModal;
