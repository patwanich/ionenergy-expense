import { styled, useTheme } from "@mui/material";
import { Box } from "@mui/material";

const WidgetWrapper = styled("div")(({ theme }) => {
  return {
    background: theme.palette.primary.contrastText,
    borderRadius: "4px",
    padding: "1rem",
  };
});

export default WidgetWrapper;
