import { useParams } from "react-router-dom";
import Topbar from "../components/Topbar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseListItem from "../components/ExpenseListItem";
import { setSignOut } from "../state/authSlice";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import { Menu, MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { setUncheckAll } from "../state/expenseSlice.js";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import NothingHere from "../components/NothingHere.js";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [expenses, setExpenses] = useState([]);
  const { expenseType } = useParams();
  const { userId, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [actionType, setIsActionType] = useState("view");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const checkedExpenses = useSelector((state) => state.expense.checkedExpenses);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getExpenses = async () => {
    const response = await fetch(
      `http://localhost:3001/expenses/${userId}/${expenseType}/expenses`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    switch (response.status) {
      case 403:
        dispatch(setSignOut());
        navigate("/");
        break;
      default:
        break;
    }

    const data = await response.json();
    setExpenses(data.expenses);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (checkedExpenses.length > 0) {
      const response = await fetch("http://localhost:3001/reports/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenses: checkedExpenses,
          userId: userId,
          type: expenseType,
          status: "submitted",
          submittedAt: Date.now(),
        }),
      });

      switch (response.status) {
        case 201:
          dispatch(setUncheckAll());
          getExpenses();
          break;
        case 403:
          dispatch(setSignOut());
          navigate("/");
          break;
        default:
          break;
      }
    } else {
      setDialogMessage({
        ...dialogMessage,
        title: "Warning",
        description: `Select expenses to ${actionType} first!`,
      });
      setIsDialogOpen((isDialogOpen) => !isDialogOpen);
    }
  };

  const handleDelete = async () => {
    const response = await fetch("http://localhost:3001/reports/", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expenses: checkedExpenses,
      }),
    });

    switch (response.status) {
      case 200:
        dispatch(setUncheckAll());
        getExpenses();
        break;
      case 403:
        dispatch(setSignOut());
        navigate("/");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getExpenses();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: theme.palette.background.main,
      }}>
      {/* NAV & TOP BAR */}
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
            <div
              style={{
                background: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                padding: "0.6rem",
                cursor: "pointer",
              }}
              onClick={(e) => {
                setMenuAnchor(e.currentTarget);
              }}>
              <MenuIcon
                sx={{
                  fontSize: "1.5rem",
                  color: theme.palette.primary.contrastText,
                }}
              />
            </div>
          }
        />
      )}

      <div
        style={{
          width: "100%",
          marginInline: "auto",
          paddingTop: "60px",
          display: isNonMobileScreen ? "grid" : "block",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          columnGap: "1rem",
          borderRadius: "10px",
        }}>
        <div
          style={{
            gridColumn: "span 2",
            padding: "1rem",
            display: "flex",
            // justifyContent: isNonMobileScreen /* && actionType === "view" */
            //   ? "center"
            //   : "space-between",
            alignItems: "center",
            gap: "1rem",
          }}>
          <InputBase
            spellCheck={false}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            endAdornment={<SearchIcon />}
            sx={{
              background: theme.palette.primary.contrastText,
              width: "100%",
              maxWidth: "500px",
              fontSize: "Sonny Gothic, sans-serif",
              paddingBlock: "0.5rem",
              paddingInline: "1rem",
              borderRadius: "10px",
              boxShadow: theme.shadows.primary.main,
            }}
            inputProps={{
              style: {
                fontFamily: "Sonny Gothic, sans-serif",
              },
            }}
            placeholder="Search"
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            {isNonMobileScreen && (
              <div
                style={{
                  background: theme.palette.primary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  padding: "0.6rem",
                  cursor: "pointer",
                  boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.25)",
                }}
                onClick={(e) => {
                  setMenuAnchor(e.currentTarget);
                }}>
                <MenuIcon
                  sx={{
                    fontSize: "1.5rem",
                    color: theme.palette.primary.contrastText,
                  }}
                />
              </div>
            )}
            {actionType === "view" || (
              <Button
                onClick={() => {
                  if (actionType === "submit") {
                    handleSubmit();
                  } else if (actionType === "delete") {
                    handleDelete();
                  }
                }}
                sx={{
                  background: theme.palette.primary.main,
                }}
                variant="contained">
                {actionType}
              </Button>
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => {
              setMenuAnchor(null);
            }}>
            <MenuItem
              onClick={() => {
                setIsActionType("view");
                setMenuAnchor(null);
              }}>
              View Reports
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsActionType("submit");
                setMenuAnchor(null);
              }}>
              Submit Reports
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsActionType("delete");
                setMenuAnchor(null);
              }}>
              Delete Reports
            </MenuItem>
          </Menu>
        </div>
        {expenses ? (
          expenses
            .filter((expense) => {
              if (search === "") {
                return true;
              } else if (
                parseFloat(expense.total.$numberDecimal)
                  .toFixed(2)
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                moment(expense.dateStart)
                  .format("DD MMM YYYY")
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                return true;
              } else {
                return false;
              }
            })
            .map((expense) => {
              return (
                <ExpenseListItem
                  enableCheckBox={
                    actionType === "delete" || actionType === "submit"
                  }
                  key={expense._id}
                  expenseType={expenseType}
                  expense={expense}
                  actionType={actionType}
                />
              );
            })
        ) : (
          <NothingHere />
        )}
      </div>
      <Dialog open={isDialogOpen}>
        <DialogTitle>{dialogMessage.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsDialogOpen((isDialogOpen) => !isDialogOpen);
            }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
};

export default ExpensesPage;
