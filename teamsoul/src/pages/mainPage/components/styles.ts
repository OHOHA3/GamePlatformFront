import { Theme } from "@mui/material/styles";

export const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export const iconButtonStyles = {
  position: "absolute",
  top: 8,
  right: 8,
  color: (theme: Theme) => theme.palette.grey[500],
};

export const textFieldStyles = {
  mb: 3,
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontSize: "18px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "16px",
  },
};

export const buttonStyles = {
  borderRadius: "30px",
  margin: "0px",
  fontWeight: 500,
  textTransform: "none",
};

export const cancelButtonStyles = {
  ...buttonStyles,
  color: "black",
  border: "2px solid #4BEDFF",
  "&:hover": {
    border: "2px solid #00BFFF",
  },
  width: "150px",
};

export const joinButtonStyles = {
  ...buttonStyles,
  background: "linear-gradient(120deg, #0059FF, #81ADFE)",
  width: "150px",
  "&.Mui-disabled": {
    background: "#C7C7C7",
    color: "white",
  },
};
