import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import { Tab, useMediaQuery, useTheme, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignOut } from "../state/authSlice";
import ReportListItem from "../components/ReportListItem";
import { CircularProgress } from "@mui/material";
import NothingHere from "../components/NothingHere";

const ReportsPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [value, setValue] = useState("submitted");
  const [reports, setReports] = useState([]);
  const { userId, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const getReports = async () => {
    const response = await fetch(
      `http://localhost:3001/reports/${userId}/reports`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 403) {
      dispatch(setSignOut());
      navigate("/");
    }
    if (response.ok) {
      const data = await response.json();
      setReports(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getReports();
  }, []);

  return (
    <div
      className="container"
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "60px",
        alignItems: "center",
      }}>
      <Navbar />
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={(e, newValue) => {
              setValue(newValue);
            }}>
            <Tab label="Submitted" value="submitted" />
            <Tab label="Completed" value="completed" />
            <Tab label="Rejected" value="rejected" />
          </TabList>
        </Box>
        <TabPanel
          sx={{
            width: "90%",
            maxWidth: "500px",
            padding: "0",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
          value="submitted">
          {reports ? (
            reports
              .filter((report) => {
                if (report.status === "submitted") {
                  return true;
                }
                return false;
              })
              .map((report) => {
                return <ReportListItem key={report._id} report={report} />;
              })
          ) : (
            <NothingHere />
          )}
        </TabPanel>
        <TabPanel value="completed">
          {reports ? (
            reports
              .filter((report) => {
                if (report.status === "completed") {
                  return true;
                }
                return false;
              })
              .map((report) => {
                return <ReportListItem key={report._id} report={report} />;
              })
          ) : (
            <NothingHere />
          )}
        </TabPanel>
        <TabPanel value="rejected">
          {reports ? (
            reports
              .filter((report) => {
                if (report.status === "completed") {
                  return true;
                }
                return false;
              })
              .map((report) => {
                return <ReportListItem key={report._id} report={report} />;
              })
          ) : (
            <NothingHere />
          )}
          {/* {reports ? (
            reports
              .filter((report) => {
                if (report.status === "rejected") {
                  return true;
                }
                return false;
              })
              .map((report) => {
                return <ReportListItem key={report._id} report={report} />;
              })
          ) : (
            <NothingHere />
          )} */}
        </TabPanel>
      </TabContext>
      <BottomNavbar page={"/reports"} />
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

export default ReportsPage;
