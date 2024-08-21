import React, { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { setSignOut } from "../state/authSlice";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import Carousel from "react-material-ui-carousel";
import CircleIcon from "@mui/icons-material/Circle";

const ExpensePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [isLoading, setIsLoading] = useState(false);
  const { expenseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [expense, setExpense] = useState({});
  const dispatch = useDispatch();

  const getExpense = async () => {
    const response = await fetch(
      `http://localhost:3001/expenses/${expenseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const expense = await response.json();
      setExpense(expense);
      setIsLoading(false);
    }
    if (response.status === 403) {
      dispatch(setSignOut());
      navigate("/");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getExpense();
  }, []);

  return (
    Object.keys(expense).length > 0 && (
      <div className="container">
        {isNonMobileScreen ? (
          <Navbar />
        ) : (
          <Topbar
            Left={
              <ChevronLeftIcon
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
        <div className="expense-detail__container">
          <div className="expense-detail__row expense-detail__row--first">
            <div className="expense-detail__row-wrapper">
              <div className="expense-detail__row-left ">
                <div className="expense-detail__label">Start Date</div>
                <div className="expense-detail__content">
                  {moment(expense.dateStart).format("DD MMM YYYY")}
                </div>
              </div>
            </div>
            <div className="expense-detail__row-wrapper">
              <div className="expense-detail__row-right">
                <div className="expense-detail__label">End Date</div>
                <div className="expense-detail__content">
                  {moment(expense.dateEnd).format("DD MMM YYYY")}
                </div>
              </div>
            </div>
          </div>

          <div className="expense-detail__row">
            <div className="expense-detail__row-wrapper">
              <div className="expense-detail__row-left">
                <div className="expense-detail__label">From</div>
                <div className="expense-detail__content">
                  {expense.locationFrom}
                </div>
              </div>
            </div>
            <div className="expense-detail__row-wrapper">
              <div className="expense-detail__row-right">
                <div className="expense-detail__label">To</div>
                <div className="expense-detail__content">
                  {expense.locationTo}
                </div>
              </div>
            </div>
          </div>

          <div className="expense-detail__row">
            <div className="expense-detail__row-wrapper">
              <div className="expense-detail__row-left">
                <div className="expense-detail__label">Way Type</div>
                <div className="expense-detail__content">{expense.wayType}</div>
              </div>
            </div>
            <div className="expense-detail__row-wrapper">
              <div className="expense-detail__row-right">
                <div className="expense-detail__label">Distance (KM)</div>
                <div className="expense-detail__content">
                  {parseFloat(expense.distance.$numberDecimal).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="expense-detail__row">
            <div className="expense-detail__row-wrapper">
              <div className="expense-detail__row-left">
                <div className="expense-detail__label">Amount (THB)</div>
                <div className="expense-detail__content">
                  {parseFloat(expense.amount.$numberDecimal).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="expense-detail__row-wrapper">
              <div className="expense-detail__row-right">
                <div className="expense-detail__label">Express way (THB)</div>
                <div className="expense-detail__content">
                  {parseFloat(expense.expressWay.$numberDecimal).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="expense-detail__row expense-detail__row--first">
            <div className="expense-detail__row-wrapper">
              <div
                className="expense-detail__row-left"
                style={{ width: "75%" }}>
                <div className="expense-detail__label">Description </div>
                <div className="expense-detail__content">
                  {expense.description || "-"}
                </div>
              </div>
            </div>
          </div>

          <div className="expense-detail__row ">
            <div className="expense-detail__row-wrapper">
              <div
                className="expense-detail__row-left"
                style={{ width: "75%" }}>
                <div className="expense-detail__label">Receipts</div>
                <div className="expense-detail__content">
                  {expense.receiptUrls.length > 0 ? (
                    <Carousel
                      autoPlay={false}
                      duration={200}
                      animation="slide"
                      navButtonsProps={{
                        style: {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                      indicatorIconButtonProps={{
                        style: {
                          border: "none",
                          marginLeft: "0.25rem",
                        },
                      }}
                      IndicatorIcon={
                        <CircleIcon
                          sx={{ width: "0.5rem", height: "0.5rem" }}
                        />
                      }
                      sx={{
                        width: "50%",
                        marginInline: "auto",
                        marginTop: "1rem",
                      }}>
                      {expense.receiptUrls.map((url, i) => {
                        return (
                          <img
                            key={i}
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "250px",
                              border: `1px solid ${theme.palette.background.main}`,
                            }}
                            src={url}
                            alt="carousel"
                          />
                        );
                      })}
                    </Carousel>
                  ) : (
                    <div className="no-receipts">No receipts attached</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
    )
  );
};

export default ExpensePage;
