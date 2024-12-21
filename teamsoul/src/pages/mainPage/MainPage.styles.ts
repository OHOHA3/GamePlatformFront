import { Theme } from "@mui/material/styles";

export const mainPageContainerStyles = {
  display: "flex",
  padding: "100px",
  flexDirection: "row" as const,
  backgroundColor: "white",
  alignItems: "center",
  height: "calc(100vh - 60px)",
  boxSizing: "border-box" as "border-box",
};

export const leftContainerStyles = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
  width: "85vh",
};

export const rightContainerStyles = {
  display: "flex",
  marginLeft: "10vh",
};

export const buttonsContainerStyles = {
  display: "flex",
  flexDirection: "row" as const,
  height: "50px",
  gap: "50px",
  marginTop: "35px",
};

export const buttonStyles = {
  outlinedButton: {
    borderRadius: "30px",
    margin: "0px",
    fontWeight: 500,
    color: "black",
    border: "2px solid #4BEDFF",
    textTransform: "none",
    width: "250px",
    "&:hover": {
      border: "2px solid #00BFFF",
    },
  },
  containedButton: {
    borderRadius: "30px",
    margin: "0px",
    fontWeight: 500,
    background: "linear-gradient(120deg, #0059FF, #81ADFE)",
    textTransform: "none",
    width: "250px",
    "&.Mui-disabled": {
      background: "#C7C7C7",
      color: "white",
    },
  },
};
