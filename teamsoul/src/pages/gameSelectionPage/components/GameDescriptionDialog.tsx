import React from "react";
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

const StyledDialogButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  margin: "0px",
  fontWeight: 500,
  textTransform: "none",
  width: '180px',
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
};

const GameDescriptionDialog: React.FC<DialogProps> = ({
  isOpen,
  handleClose,
}) => {
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
        Карточная игра
      </DialogTitle>

      <DialogContent
        sx={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: "20px 15px", 
        }}
      >
        <Typography variant="body1" padding={0}>
          Карточная игра представляет из себя обмен карточками с вопросами.
          Игроку показывается карточка с вопросом, на который он должен
          ответить. После того, как игрок ответил, он выбирает следующего
          игрока, который будет отвечать на уже другой вопрос. Таким образом
          карточками можно обмениваться неограниченное количество раз. Игра
          завершается, когда игроки покидают комнату.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <StyledDialogButton variant="outlined" onClick={handleClose}>
          Отмена
        </StyledDialogButton>
        <StyledDialogButton
          variant="contained"
          onClick={() => toast("Игра началась!")}
        >
          Начать игру
        </StyledDialogButton>
      </DialogActions>
    </Dialog>
  );
};

export default GameDescriptionDialog;
