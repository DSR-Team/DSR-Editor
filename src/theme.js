import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      common: {
        black: "#000",
        white: "rgba(255, 255, 255, 0.8)",
      },
      primary: {
        main: "#78e5fe",
      },
      secondary: {
        main: "rgba(255, 255, 255, 0.7)",
      },
      error: {
        main: "#f44336",
        light: "#e57373",
        dark: "#d32f2f",
        contrastText: "rgba(255, 255, 255, 0.8)",
      },
      warning: {
        main: "#ffa726",
        light: "#ffb74d",
        dark: "#f57c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      info: {
        main: "#29b6f6",
        light: "#4fc3f7",
        dark: "#0288d1",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      success: {
        main: "#66bb6a",
        light: "#81c784",
        dark: "#388e3c",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      grey: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
        A100: "#f5f5f5",
        A200: "#eeeeee",
        A400: "#bdbdbd",
        A700: "#616161",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      text: {
        primary: "rgba(255, 255, 255, 1)",
        secondary: "rgba(255, 255, 255, 0.6)",
        disabled: "rgba(255, 255, 255, 0.4)",
        icon: "rgba(255, 255, 255, 0.5)",
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: {
        popup: "#242424",
        paper: "#161616",
        default: "#121212",
      },
      action: {
        active: "rgba(255, 255, 255, 0.8)",
        hover: "rgba(255, 255, 255, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(255, 255, 255, 0.16)",
        selectedOpacity: 0.16,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
      },
    },
    overrides: {},
  })
);
