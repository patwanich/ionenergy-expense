import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NothingHere = () => {
  const navigate = useNavigate();
  return (
    <div className="nothing">
      <img
        src="/empty.png"
        alt="empty"
        width={"150px"}
        style={{ marginRight: "1.5rem" }}
      />
      <div className="nothing__title">
        There's nothing here, let's get you back to homepage
      </div>
      <Button onClick={() => navigate(`/`)} variant="contained">
        let's go
      </Button>
    </div>
  );
};

export default NothingHere;
