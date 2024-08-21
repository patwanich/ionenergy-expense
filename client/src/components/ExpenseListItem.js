import moment from "moment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { setCheck, setUncheck } from "../state/expenseSlice";
import { useNavigate } from "react-router-dom";

const ExpenseListItem = ({
  expense,
  expenseType,
  enableCheckBox = false,
  actionType = "view",
  canView = true,
  showChevron = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let typeImagePath = "";
  switch (expenseType) {
    case "privatecar":
      typeImagePath = "/private-car.svg";
      break;
    default:
      break;
  }

  return (
    <div
      className="expense-item"
      onClick={() =>
        actionType === "view" && canView && navigate(`/expense/${expense._id}`)
      }>
      <div className="expense-item__left">
        <div className="expense-item__icon-wrapper">
          <img
            src={typeImagePath}
            alt="category icon"
            className="expense-item__icon"
          />
        </div>
        <div className="expense-item__left-content">
          {moment(expense.dateStart).format("DD MMM YYYY")}
          <div className="expense-item__type">{expense.type}</div>
        </div>
      </div>
      <div className="expense-item__right">
        <div className="expense-item__currency">THB</div>

        <div className="expense-item__total">
          {parseFloat(expense.total.$numberDecimal).toFixed(2)}
        </div>
        {enableCheckBox ? (
          <Checkbox
            onClick={(e) => {
              const checked = e.target.checked;
              if (checked) {
                dispatch(setCheck(expense));
              } else if (!checked) {
                dispatch(setUncheck(expense));
              }
            }}
          />
        ) : (
          showChevron && (
            <ChevronRightIcon
              sx={{
                fontWeight: "300",
                fontSize: "2rem",
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ExpenseListItem;
