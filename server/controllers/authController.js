import msalClient from "../utilities/msalClient.js";

const signIn = async (req, res) => {
  res.status(200).json({
    token: req.headers.authorization.split(" ")[1],
    uniqueId: req.body.uniqueId,
  });
};

export { signIn };
