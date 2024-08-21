import Navbar from "../components/Navbar";
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Topbar from "../components/Topbar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  return (
    <div className="container">
      {isNonMobileScreen ? (
        <Navbar />
      ) : (
        <Topbar
          Left={
            <CloseIcon
              sx={{
                fontSize: "1.5rem",
              }}
              onClick={() => {
                navigate(-1);
              }}
            />
          }
          Middle={
            <div
              style={{
                textTransform: "uppercase",
              }}>
              Category
            </div>
          }
          Right={<div></div>}
        />
      )}
      <div
        style={{
          width: "90%",
          display: "grid",
          height: "fit-content",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          justifyItems: "center",
          padding: "2rem",
          gap: "0.5rem",
          textWrap: "nowrap",
        }}>
        <div
          className="category-item"
          data-expense-type="grab"
          onClick={(e) => {
            navigate(`/expense/add/${e.currentTarget.dataset.expenseType}`);
          }}>
          <div className="category-item__icon-wrapper">
            <img src="/grab.svg" alt="grab" className="category-item__icon" />
          </div>
          <p>Grab</p>
        </div>
        <div
          className="category-item"
          data-expense-type="food"
          onClick={(e) => {
            navigate(`/expense/add/${e.currentTarget.dataset.expenseType}`);
          }}>
          <div className="category-item__icon-wrapper">
            <img src="/food.svg" alt="food" className="category-item__icon" />
          </div>
          <p>Food</p>
        </div>
        <div
          className="category-item"
          data-expense-type="phone"
          onClick={(e) => {
            navigate(`/expense/add/${e.currentTarget.dataset.expenseType}`);
          }}>
          <div className="category-item__icon-wrapper">
            <img src="/phone.svg" alt="phone" className="category-item__icon" />
          </div>
          <p>Phone</p>
        </div>
        <div
          className="category-item"
          data-expense-type="medical"
          onClick={(e) => {
            navigate(`/expense/add/${e.currentTarget.dataset.expenseType}`);
          }}>
          <div className="category-item__icon-wrapper">
            <img
              src="/medical.svg"
              alt="medical"
              className="category-item__icon"
            />
          </div>
          <p>Medical</p>
        </div>
        <div
          className="category-item"
          data-expense-type="other"
          onClick={(e) => {
            navigate(`/expense/add/${e.currentTarget.dataset.expenseType}`);
          }}>
          <div className="category-item__icon-wrapper">
            <img src="/other.svg" alt="other" className="category-item__icon" />
          </div>
          <p>Other</p>
        </div>
        <div
          className="category-item"
          data-expense-type="privatecar"
          onClick={(e) => {
            navigate(`/expense/add/${e.currentTarget.dataset.expenseType}`);
          }}>
          <div className="category-item__icon-wrapper">
            <img
              src="/private-car.svg"
              alt="private car"
              className="category-item__icon"
            />
          </div>
          <p>Private Car</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
