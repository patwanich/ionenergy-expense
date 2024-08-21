import {
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const BottomNavbar = ({ page }) => {
  const [value, setValue] = useState(page);
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  return (
    !isNonMobileScreen && (
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
        sx={{
          position: "fixed",
          height: "60px",
          background: theme.palette.primary.main,
          bottom: "0",
          left: "0",
          width: "100%",
          "& .Mui-selected svg ,": {
            color: theme.palette.primary.contrastText,
          },
          " .Mui-selected .MuiBottomNavigationAction-label": {
            fontSize: "11px",
            color: theme.palette.primary.contrastText,
          },
          "& .MuiBottomNavigationAction-label": {
            marginTop: "0.25rem",
            fontSize: "10px",
            fontFamily: "Sonny Cond, sans-serif",
          },
          "& .MuiBottomNavigationAction-root": {
            color: theme.palette.background.alt,
          },
        }}>
        <BottomNavigationAction value={"/"} label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          value={"/reports"}
          label="Reports"
          icon={<AssessmentIcon />}
        />
        <BottomNavigationAction
          value={"/expense/add"}
          icon={<AddCircleIcon fontSize="large" />}
        />
        <BottomNavigationAction
          value={"/activities"}
          label="Activity"
          icon={<NotificationsIcon />}
        />
        <BottomNavigationAction
          value={"/settings"}
          label="Settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    )
  );
};
export default BottomNavbar;
