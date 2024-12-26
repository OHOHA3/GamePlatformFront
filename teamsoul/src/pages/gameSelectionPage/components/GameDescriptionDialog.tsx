import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { styled } from "@mui/material";
import { createGame } from "../../../api/room/room.request";
import { useNavigate } from "react-router-dom";

const StyledDialogButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  margin: "0px",
  fontWeight: 500,
  textTransform: "none",
  width: "180px",
  "&.MuiButton-outlined": {
    color: "black",
    border: "2px solid #4BEDFF",
    "&:hover": {
      border: "2px solid #00BFFF",
    },
  },
  "&.MuiButton-contained": {
    background: "linear-gradient(120deg, #0059FF, #81ADFE)",
    color: theme.palette.getContrastText("#0059FF"),
  },
}));

type DialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  gameId: number;
  roomCode: number;
  gameName: string;
  gameDescription: string;
};

const GameDescriptionDialog: React.FC<DialogProps> = ({
  isOpen,
  handleClose,
  gameId,
  roomCode,
  gameName,
  gameDescription,
}) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartGame = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Необходима авторизация для создания игры.");
        return;
      }
      const response = await createGame(token, gameId, roomCode);
      toast.success("Игра началась! URL игры: " + response.url);
      window.location.href = response.url;
    } catch (error: any) {
      toast.error(error.message || "Ошибка при создании игры");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          padding: "20px",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        fontSize={26}
        align="center"
        fontWeight={550}
        sx={{
          textAlign: "center",
        }}
      >
        {gameName}
      </DialogTitle>

      <DialogContent
        sx={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: "20px 15px",
        }}
      >
        <Typography variant="body1" padding={0}>
          {gameDescription}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <StyledDialogButton variant="outlined" onClick={handleClose}>
          Отмена
        </StyledDialogButton>
        <StyledDialogButton variant="contained" onClick={handleStartGame}>
          Начать игру
        </StyledDialogButton>
      </DialogActions>
    </Dialog>
  );
};

export default GameDescriptionDialog;
