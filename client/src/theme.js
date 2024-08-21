// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

// mui theme settings
export const themeSettings = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 700,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    // palette values for dark mode
    primary: {
      main: "#182D43",
      contrastText: "#FFFFFF",
    },
    background: {
      alt: "#999999",
      main: "#E5E7EB",
    },
    error: {
      main: "#F87171",
    },
    warning: {
      main: "#F59E0B",
    },
    success: {
      main: "#27AE60",
    },
  },
  shadows: {
    primary: {
      main: "0px 2px 2px 0px rgba(0, 0, 0, 0.25);",
    },
    8: {
      main: "0px 2px 2px 0px rgba(0, 0, 0, 0.25);",
    },
  },
};
