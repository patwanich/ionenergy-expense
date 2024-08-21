import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  useTheme,
  Button,
} from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import Carousel from "react-material-ui-carousel";
import CircleIcon from "@mui/icons-material/Circle";
import { PublicClientApplication } from "@azure/msal-browser";
import { useDispatch } from "react-redux";
import { setSignIn, setSignOut } from "../state/authSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  {
    path: "/login-1.svg",
  },
  { path: "/login-2.svg" },
  {
    path: "/login-3.svg",
  },
];

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

const LoginWidget = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState({
    connectionError: false,
  });

  const handleConnectionChange = () => {
    setIsOpen((isOpen) => ({
      ...isOpen,
      connectionError: !navigator.onLine,
    }));
  };

  useEffect(() => {
    window.addEventListener("load", handleConnectionChange);
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);
    return () => {
      window.removeEventListener("load", handleConnectionChange);
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [navigator.onLine]);

  const signIn = async (token, uniqueId) => {
    const response = await fetch("http://localhost:3001/auth/signin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uniqueId: uniqueId }),
    });
    if (response.ok) {
      return response.json();
    }
  };

  msalInstance
    .handleRedirectPromise()
    .then(async (tokenResponse) => {
      if (tokenResponse) {
        const data = await signIn(
          tokenResponse.accessToken,
          tokenResponse.uniqueId
        );
        dispatch(setSignIn(data));
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <WidgetWrapper
      sx={{
        marginTop: "2rem",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        borderRadius: "10px",
      }}>
      <Carousel
        autoPlay={true}
        duration={1000}
        interval={6000}
        animation="slide"
        navButtonsProps={{
          style: {
            backgroundColor: theme.palette.primary.main,
          },
        }}
        indicatorIconButtonProps={{
          style: {
            border: "none",
            marginLeft: "0.25rem",
          },
        }}
        IndicatorIcon={
          <CircleIcon sx={{ width: "0.7rem", height: "0.7rem" }} />
        }
        sx={{
          width: "90%",
        }}>
        {items.map((item, i) => {
          return (
            <img
              key={i}
              style={{
                objectFit: "fill",
                width: "100%",
                height: "300px",
              }}
              src={item.path}
              alt="carousel"
            />
          );
        })}
      </Carousel>
      <p
        style={{
          fontWeight: "300",
          textAlign: "center",
          fontSize: "14px",
        }}>
        MANAGE ALL YOUR ACCOUNT IN ONE PLACE
      </p>
      <Button
        variant="contained"
        startIcon={<img src="/microsoft-logo.svg" alt="microsoft" />}
        sx={{
          gap: "0.5rem",
          textTransform: "none",
          fontFamily: "Sonny Gothic",
          fontWeight: "300",
        }}
        onClick={(e) => {
          msalInstance.loginRedirect({
            scopes: [`${process.env.REACT_APP_AZURE_CLIENT_ID}/.default`],
          });
        }}>
        Continue with Microsoft account
      </Button>
      <Dialog open={isOpen.connectionError}>
        <DialogTitle>No internet connection</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Check your connection before proceeding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              navigate(0);
            }}>
            Refresh Page
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default LoginWidget;
