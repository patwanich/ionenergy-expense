import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const getSigningKeys = (header, callback) => {
  var client = jwksClient({
    jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/v2.0/keys`,
  });

  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      const validateOptions = {
        audience: process.env.AZURE_CLIENT_ID, // v2.0 token
        issuer: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`,
      };
      jwt.verify(token, getSigningKeys, validateOptions, (error, payload) => {
        if (error) {
          return res.status(403).json({ message: error.message });
        }
        next();
      });
    } else {
      res.status(401).json("Invalid credentials.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifyToken;
