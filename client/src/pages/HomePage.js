import { useDispatch, useSelector } from "react-redux";
import { setSignOut } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CategorySummaryItem from "../components/CategorySummaryItem";
import { alignProperty } from "@mui/material/styles/cssUtils";
import BottomNavbar from "../components/BottomNavbar";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { token, userId } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    content: "",
    handleClick: () => {},
    buttonText: "",
  });
  const [total, setTotal] = useState({
    privatecar: 0,
    grab: 0,
    food: 0,
    phone: 0,
    medical: 0,
    other: 0,
  });

  const getTotal = async () => {
    const response = await fetch(
      `http://localhost:3001/expenses/${userId}/total`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 403) {
      const message = await response.json().message;
      switch (message) {
        case "invalid token" || "jwt expired":
          dispatch(setSignOut());
          navigate("/");
          break;
        default:
          break;
      }
    }
    if (response.ok) {
      const data = await response.json();
      setTotal({
        ...total,
        privatecar: data.privatecar,
        grab: data.grab,
        food: data.food,
        phone: data.phone,
        medical: data.medical,
        other: data.other,
      });
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBlock: "60px",
        display: "flex",
        justifyContent: "center",
        background: theme.palette.background.main,
      }}>
      <Navbar />
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
          paddingBlock: "1rem",
        }}>
        {/* LEFT */}
        <div style={{ width: "100%" }}>
          <div
            style={{
              width: "100%",
              color: theme.palette.primary.contrastText,
              background: theme.palette.primary.main,
              height: "fit-content",
              paddingBlock: "1.5rem",
              paddingInline: "2rem",
              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <div>
              <div
                style={{
                  fontWeight: "300",
                  fontSize: "1rem",
                }}>
                TOTAL EXPENSES
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}>
                <div style={{ fontWeight: "300" }}>THB</div>
                <div
                  style={{
                    lineHeight: "1",
                    fontSize: "2rem",
                    fontWeight: "300",
                    marginLeft: "1rem",
                  }}>
                  {total.privatecar.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              marginTop: "1rem",
              gap: "1rem",
            }}>
            <CategorySummaryItem
              img={"/private-car.svg"}
              type="Private Car"
              total={total.privatecar}
            />
            <CategorySummaryItem
              img={"/grab.svg"}
              type="Grab"
              total={total.grab}
            />
            <CategorySummaryItem
              img={"/food.svg"}
              type="Food"
              total={total.food}
            />
            <CategorySummaryItem
              img={"/phone.svg"}
              type="Phone"
              total={total.phone}
            />
            <CategorySummaryItem
              img={"/medical.svg"}
              type="Medical"
              total={total.medical}
            />
            <CategorySummaryItem
              img={"/other.svg"}
              type="Other"
              total={total.other}
            />
          </div>
        </div>
        {/* RIGHT */}
        {isNonMobileScreen && (
          <div className="home__menu">
            <a
              className="home__menu-item"
              onClick={() => {
                navigate("/reports");
              }}>
              Check your report status
              <ArrowCircleRightIcon />
            </a>
            <a
              className="home__menu-item"
              onClick={() => {
                navigate("/expense/add");
              }}>
              Add new expense
              <ArrowCircleRightIcon />
            </a>
          </div>
        )}
      </div>
      <BottomNavbar page={"/"} />

      <Dialog open={dialog.open}>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialog.handleClick}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
