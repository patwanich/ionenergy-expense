import { useMediaQuery, useTheme, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { useDispatch } from "react-redux";
import { setSignOut } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopMenuAnchor, setDesktopMenuAnchor] = useState(null);
  const navigate = useNavigate();

  msalInstance
    .handleRedirectPromise()
    .then(async (tokenResponse) => {
      // if (tokenResponse === null) {
      // if (tokenResponse) dispatch(setSignOut());
      // }
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div
      style={{
        zIndex: "1",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "60px",
        background: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        paddingInline: "1rem",
        justifyContent: "space-between",
      }}>
      {/* LEFT GROUP DESKTOP */}
      {isNonMobileScreen && (
        <div
          onClick={() => {
            navigate("/");
          }}
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            color: theme.palette.primary.contrastText,
            gap: "1rem",
            cursor: "pointer",
          }}>
          <img
            style={{
              width: "40px",
              height: "40px",
            }}
            src="/ionenergy-logo.svg"
            alt="logo"
          />
          <p>ION ENERGY</p>
        </div>
      )}
      {/* RIGHT GROUP DESKTOP & LEFT GROUP MOBILE */}
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          color: theme.palette.primary.contrastText,
          flexDirection: isNonMobileScreen ? "row" : "row-reverse",
          textOverflow: "ellipsis",
        }}>
        {/* {isNonMobileScreen && (
          <>
            <LightModeIcon
              sx={{
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            />
            <NotificationsIcon
              sx={{
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            />
          </>
        )} */}
        <p
          style={{
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: "300",
          }}>
          Varitpat Pattanawanichapon
        </p>
        <img
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={(e) => {
            setDesktopMenuAnchor(e.currentTarget);
          }}
          src="/login-1.svg"
          alt="profile"
        />
        <Menu
          id="basic-menu"
          anchorEl={desktopMenuAnchor}
          open={Boolean(desktopMenuAnchor)}
          onClose={() => {
            setDesktopMenuAnchor(null);
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}>
          <MenuItem
            onClick={async () => {
              dispatch(setSignOut()); //set local token and user to null first otherwise the handle redirect in loginwidget will set it again after logout
              await msalInstance.logoutRedirect({
                account: msalInstance.getActiveAccount(),
              });
            }}>
            Sign out
          </MenuItem>
        </Menu>
      </div>
      {/* RIGHT GROUP MOBILE */}
      {!isNonMobileScreen && !isMobileMenuOpen && (
        <MenuIcon
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          sx={{
            fontSize: "1.5rem",
            color: theme.palette.primary.contrastText,
          }}
        />
      )}

      {/* MOBILE MENU */}
      {!isNonMobileScreen && isMobileMenuOpen && (
        <div
          style={{
            width: "50%",
            height: "100%",
            position: "fixed",
            right: "0",
            top: "0",
            background: theme.palette.primary.main,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}>
          <CloseIcon
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            style={{
              fontSize: "2rem",
              color: theme.palette.primary.contrastText,
            }}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: theme.palette.primary.contrastText,
              fontSize: "20px",
              fontWeight: "300",
              gap: "1rem",
              textTransform: "uppercase",
            }}
            onClick={async () => {
              dispatch(setSignOut()); //set local token and user to null first otherwise the handle redirect in loginwidget will set it again after logout
              await msalInstance.logoutRedirect({
                account: msalInstance.getActiveAccount(),
              });
            }}>
            <LogoutIcon
              sx={{
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            />
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
