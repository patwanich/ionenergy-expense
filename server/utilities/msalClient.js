import { PublicClientApplication } from "@azure/msal-browser";
import dotenv from "dotenv";

dotenv.config();

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
  },
};

const msalClient = new PublicClientApplication(msalConfig);
await msalClient.initialize();

export default msalClient;
