import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExpensesPage from "./pages/ExpensesPage";
import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddExpensePage from "./pages/AddExpensePage";
import ReportsPage from "./pages/ReportsPage";
import CategoryPage from "./pages/CategoryPage";
import ReportPage from "./pages/ReportPage";
import ExpensePage from "./pages/ExpensePage.js";
import NotfoundPage from "./pages/NotfoundPage.js";

function App() {
  const isAuth = useSelector((state) => state.auth.token);
  const theme = createTheme(themeSettings);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/expense/:expenseId"
            element={isAuth ? <ExpensePage /> : <Navigate to="/" />}
          />
          <Route
            path="/expense/add"
            element={isAuth ? <CategoryPage /> : <Navigate to="/" />}
          />
          <Route
            path="/expense/add/privatecar"
            element={isAuth ? <AddExpensePage /> : <Navigate to="/" />}
          />
          <Route
            path="/expenses/:expenseType"
            element={isAuth ? <ExpensesPage /> : <Navigate to="/" />}
          />
          <Route
            path="/reports"
            element={isAuth ? <ReportsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/reports/:reportId"
            element={isAuth ? <ReportPage /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={isAuth ? <NotfoundPage /> : <Navigate to="/" />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
