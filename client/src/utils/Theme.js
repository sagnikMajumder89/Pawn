import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#05523b",
      contrastText: "#61f5c9",
      dark: "#022218",
      light: "#08825e",
    },
    secondary: {
      main: "#140552",
      contrastText: "#7e61f5",
      dark: "#080222",
      light: "#200882",
    },
    background: {
      default: "#151e1b",
      paper: "#202d29",
    },
    text: {
      primary: "#fbfcfb",
      secondary: "#d2dfdb",
      disabled: "#96b5ac",
    },
    success: {
      main: "#055205",
      contrastText: "#61f561",
    },
    warning: {
      main: "#525205",
      contrastText: "#f5f561",
    },
    error: {
      main: "#520505",
      contrastText: "#f56161",
    },
    divider: "#354b44",
  },
});

export default theme;
