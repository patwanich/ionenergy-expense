import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const CategorySummaryItem = ({ type, total, img }) => {
  const navigate = useNavigate();

  return (
    <div
      className="summary__item"
      onClick={() => {
        navigate(`/expenses/${type.toLowerCase().split(" ").join("")}`);
      }}>
      <img
        className="summary__img"
        src={img}
        alt="type"
        style={{
          width: "40px",
          height: "40px",
        }}
      />
      <div style={{}}>{type}</div>
      <div style={{ fontWeight: "300", fontSize: "12px" }}>
        THB {parseFloat(total).toFixed(2)}
      </div>
    </div>
  );
};

export default CategorySummaryItem;
