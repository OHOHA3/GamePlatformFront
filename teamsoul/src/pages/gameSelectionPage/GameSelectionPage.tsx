import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { toast } from "react-hot-toast";
import cardGameLogo from '../../pictures/gameLogo.png'
import './GameSelectionPage.css'
import GameDecsriptionDialog from "./components/GameDescriptionDialog";

const GameSelectionPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    toast.success("Комната успешно создана. Приятной игры!");
  }, []);

  return (
    <div className="gamePageContainer">
      <Typography variant="h4" color="#003FB4" gutterBottom fontWeight={600}>
        Ваша комната: 12345
      </Typography>

      <div className="gamesContainer">
        <Paper
          onClick={handleOpen}
          elevation={3}
          sx={{
            p: 3,
            width: 200,
            height: 250,
            cursor: "pointer",
            border: "2px solid #4BEDFF",
            borderRadius: "16px", 
            position: "relative", 
          }}
        >
          <Box
            component="img"
            src={cardGameLogo} 
            alt="Изображение"
            sx={{
              position: "absolute", 
              bottom: 0, 
              right: 0, 
              transform: "translate(50%, 50%)",
              width: "250px", 
              height: "170px", 
            }}
          />

          <Typography
            variant="h5"
            fontWeight="550"
            gutterBottom
            marginBottom="15px"
          >
            Карточная игра
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Карточная игра представляет из себя обмен карточками с вопросами.
            Игроку показывается карточка с вопросом....
          </Typography>
        </Paper>

        <GameDecsriptionDialog isOpen={open} handleClose={handleClose} />
      </div>
    </div>
  );
};
export default GameSelectionPage;
