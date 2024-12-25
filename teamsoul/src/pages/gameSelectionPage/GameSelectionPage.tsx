import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import cardGameLogo from "../../pictures/gameLogo.png";
import "./GameSelectionPage.css";
import GameDecsriptionDialog from "./components/GameDescriptionDialog";
import { getGamesList } from "../../api/game/game.request"; 
import { GameListResponse } from "../../api/game/game.types";

const GameSelectionPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState<GameListResponse[0] | null>(null); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await getGamesList();
        if (games.length > 1) {
          setGame(games[1]); 
        } else {
          toast.error("Список игр пуст.");
        }
      } catch (error: any) {
        toast.error(error.message || "Ошибка загрузки списка игр.");
      }
    };

    fetchGames();

    toast.success("Комната успешно создана. Приятной игры!");
  }, []);

  return (
    <div className="gamePageContainer">
      <Typography variant="h4" color="#003FB4" gutterBottom fontWeight={600}>
        Ваша комната: {roomId}
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
            {game ? game.name : "Загрузка..."}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {game ? game.description : "Загрузка описания игры..."}
          </Typography>
        </Paper>

        <GameDecsriptionDialog
          isOpen={open}
          handleClose={handleClose}
          gameId={game ? game.id : 0}
          roomCode={roomId ? parseInt(roomId, 10) : 0}
        />
      </div>
    </div>
  );
};

export default GameSelectionPage;
