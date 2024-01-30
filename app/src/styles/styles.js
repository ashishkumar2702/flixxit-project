import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Configure the value for xs breakpoint
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const styles = {
  primary_button: {
    backgroundColor: "white",
    color: "black",
    p: "1vh 3vh",
    fontSize: "2.5vh",
    fontWeight: "600",
    ":hover": {
      backgroundColor: "whitesmoke",
      color: "black",
    },
    svg: {
      height: "3vh",
      width: "3vh",
    },
  },
  secondary_button: {
    backgroundColor: "grey",
    color: "white",
    p: "1vh 3vh",
    fontSize: "2.5vh",
    fontWeight: "600",
    ":hover": {
      backgroundColor: "grey",
      color: "white",
    },
    svg: {
      height: "3vh",
      width: "3vh",
    },
  },
  playButton: {
    width: "fit-content",
    p: "1vh 3vh !important",
    svg: {
      height: "3vh",
      width: "3vh",
    },
    fontSize: "2vh !important",
  },
};

export { styles, theme };
