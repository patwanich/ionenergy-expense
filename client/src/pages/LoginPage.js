import { PublicClientApplication } from "@azure/msal-browser";
import { setSignIn, setSignOut } from "../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";
import WidgetWrapper from "../components/WidgetWrapper";
import LoginWidget from "../components/LoginWidget";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

async function signIn(token, uniqueId) {
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
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          width: isNonMobileScreen ? "40%" : "90%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}>
        {/* LOGO */}
        <div
          style={{
            color: theme.palette.primary.contrastText,
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            fontWeight: "300",
            lineHeight: "1",
            gap: "1rem",
          }}>
          <img src="/ionenergy-logo.svg" alt="ionenergy logo" />
          ION ENERGY
        </div>
        {/* LOGIN WIDGET */}
        <LoginWidget />
      </div>
      {/* <div>
        <button
          onClick={(e) => {
            msalInstance.loginRedirect({
              scopes: [`${process.env.REACT_APP_AZURE_CLIENT_ID}/.default`],
            });
          }}>
          SIGN IN
        </button>
      </div> */}
    </div>
  );
}
