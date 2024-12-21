import { SxProps, Theme } from "@mui/material/styles";

export const loginPageContainerStyles = {
  display: "flex",
  padding: "100px",
  flexDirection: "row" as const,
  backgroundColor: "white",
  alignItems: "center",
  height: "calc(100vh - 60px)",
  boxSizing: "border-box" as "border-box",
  gap: "70px",
};

export const leftLoginContainerStyles = {
  display: "flex",
};

export const rightLoginContainerStyles = {
  display: "flex",
  flexDirection: "column" as "column",
  width: "50vh",
};

export const loginImageStyles= {
  width: "90vh",
};

export const buttonStyles: SxProps<Theme> = {
  mt: 3,
  width: "150px",
  fontWeight: 500,
  borderRadius: "50px",
  background: "linear-gradient(120deg, #0059FF, #81ADFE)",
  textTransform: "none",
  "&.Mui-disabled": {
    background: "#C7C7C7",
    color: "white",
  },
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: "bold",
  textAlign: "left",
};
