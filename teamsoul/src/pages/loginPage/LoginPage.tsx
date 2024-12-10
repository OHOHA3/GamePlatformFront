import  { useState } from "react";
import {
  TextField,
  Button,
  Typography,
} from "@mui/material";

import loginPageImg from "../../pictures/loginPageImg.svg";
import './LoginPage.css'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isDisabled, setDisabled] = useState(true);
const navigate = useNavigate();
  const handleClick = () => {
      navigate("/");
 
  }
  return (
    <div className="loginPageContainer">
      <div className="leftLoginContainer">
        <img src={loginPageImg} alt="Teamwork" style={{ width: "90vh" }} />
      </div>
      <div className="rightLoginContainer">
        <Typography
          variant="h3"
          component="h1"
          mb='15px'
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          Добро <br /> пожаловать!
        </Typography>
  
          <TextField
            label="Логин"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ borderRadius: "50px" }}
          />
          <TextField
           onChange={()=> {setDisabled(false)}}
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleClick}
            disabled={isDisabled}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 3,
              width: "150px",
              fontWeight: "500",
              borderRadius: "50px",
              background: "linear-gradient(120deg, #0059FF, #81ADFE)",
              textTransform: "none",
              "&.Mui-disabled": {
                background: "#C7C7C7", 
                color: "white", 
              },
            }}
          >
            Войти
          </Button>
   
      </div>
    </div>
  );
};

export default LoginPage;
