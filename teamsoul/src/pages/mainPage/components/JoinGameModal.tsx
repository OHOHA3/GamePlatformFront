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
type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const JoinGameModal: React.FC<ModalProps> = ({ isOpen, handleClose }) => {
  const [isCodeEntered, setIsCodeEntered] = useState(false);

  const handleChange = () => {
    setIsCodeEntered(true);
  }
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "12px",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
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
          Для присоединения к комнате Вам нужно ввести её код.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Введите код"
          onChange={handleChange}
          sx={{
            mb: 3,
            "& .MuiInputBase-input": {
              textAlign: "center", 
              fontSize: "18px", 
            },
            "& .MuiInputLabel-root": {
              fontSize: "16px", 
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
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
              width: "150px",
            }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!isCodeEntered}
            sx={{
              borderRadius: "30px",
              margin: "0px",
              background: "linear-gradient(120deg, #0059FF, #81ADFE)",
              textTransform: "none",
              width: "150px",
              "&.Mui-disabled": {
                background: "#C7C7C7", 
                color: "white", 
              },
            }}
          >
            Присоединиться
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
 
export default JoinGameModal;