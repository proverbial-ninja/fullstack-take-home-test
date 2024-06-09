// src/theme.js
import { createTheme } from "@mui/material/styles";
import { Mulish } from "next/font/google";
const mulish = Mulish({ subsets: ["latin"] });
const theme = createTheme({
  palette: {
    primary: {
      main: "#53C2C2", // Your primary color
    },
    secondary: {
      main: "#F76434", // Your secondary color
    },
    background: {
      default: "#000", // Your background color
    },
    text: {
      primary: "#333", // Your primary text color
      secondary: "#777", // Your secondary text color
    },
  },
  typography: {
    fontFamily: mulish.style.fontFamily,
  },
});

export default theme;
