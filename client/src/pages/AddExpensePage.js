import { useNavigate, useParams } from "react-router-dom";
import PrivateCarExpense from "../components/forms/PrivateCarExpenseForm";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const AddExpensePage = () => {
  const { expenseType } = useParams();
  let form;
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  switch (expenseType) {
    case "privatecar":
    default:
      form = <PrivateCarExpense />;
      break;
  }

  return (
    <div
      style={{
        width: "100%",
        background: theme.palette.background.main,
        paddingTop: "60px",
      }}>
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
          Right={
            <button
              type="submit"
              form="expense-form"
              style={{
                all: "unset",
                textTransform: "uppercase",
                fontSize: "14px",
                fontWeight: "300",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                lineHeight: "0.5",
              }}>
              Save
            </button>
          }
        />
      )}
      {form}
    </div>
  );
};

export default AddExpensePage;
