import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSignOut } from "../state/authSlice";
import ReportListItem from "../components/ReportListItem";
import ExpenseListItem from "../components/ExpenseListItem";

const ReportPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { reportId } = useParams();
  const [report, setReport] = useState();
  const dispatch = useDispatch();

  const getReport = async () => {
    console.log(reportId);
    const response = await fetch(`http://localhost:3001/reports/${reportId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const report = await response.json();
      setReport(report);
      setIsLoading(false);
      console.log(report);
    }
    if (response.status === 403) {
      dispatch(setSignOut());
      navigate("/");
    }
  };

  useEffect(() => {
    getReport();
    setIsLoading(true);
  }, []);

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
              Add Expense
            </div>
          }
          Right={<div></div>}
        />
      )}
      {isLoading && (
        <CircularProgress
          size={"5rem"}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
        />
      )}

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}>
        <div
          style={{
            width: "90%",
            maxWidth: "500px",
            paddingBlock: "1rem",
            marginInline: "auto",
          }}>
          {report && <ReportListItem report={report} />}
        </div>
        {report &&
          report.expenses.map((expense) => {
            return (
              <div
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  marginInline: "auto",
                }}>
                <ExpenseListItem
                  showChevron={false}
                  canView={false}
                  expense={expense}
                  expenseType={expense.type.toLowerCase().split(" ").join("")}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ReportPage;
