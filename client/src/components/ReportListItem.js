import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useEffect } from "react";

const ReportListItem = ({ report }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  let typeImagePath = "";
  let typeText = "";
  let ribbonColor = "";

  switch (report.status) {
    case "submitted":
      ribbonColor = theme.palette.warning.main;
      break;
    case "completed":
      ribbonColor = theme.palette.success.main;
      break;
    case "rejected":
      ribbonColor = theme.palette.rejected.main;
      break;
    default:
      break;
  }

  switch (report.type) {
    case "privatecar":
      typeImagePath = "/private-car.svg";
      typeText = "Private Car";
      break;

    default:
      break;
  }

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < report.expenses.length; i++) {
      total += parseFloat(report.expenses[i].total.$numberDecimal);
    }
    return total;
  };

  return (
    <div
      className="report"
      onClick={() => {
        navigate(`/reports/${report._id}`);
      }}>
      <img src={typeImagePath} className="report__icon" alt="report icon" />
      <div className="report__content">
        <div className="report__first-row">{typeText}</div>
        <div className="report__second-row">
          Report Date
          <div>{moment(report.submittedAt).format("DD MMM YYYY")}</div>
        </div>
        <div className="report__third-row">
          <div>{report.expenses.length} Items</div>
          <div>THB {getTotal().toFixed(2)}</div>
        </div>
      </div>
      <div style={{ background: ribbonColor }} className="report__ribbon">
        {report.status}
      </div>
    </div>
  );
};

export default ReportListItem;
