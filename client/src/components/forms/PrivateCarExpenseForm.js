import { Divider, TextField, useMediaQuery, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Carousel from "react-material-ui-carousel";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Radio, FormControlLabel, RadioGroup, FormLabel } from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import { setSignOut } from "../../state/authSlice";

const initialValues = {
  type: "Private Car",
  description: "",
  wayType: "One Way",
  locationFrom: "",
  locationTo: "",
  distance: "",
  amount: "",
  expressWay: "",
  dateStart: "",
  dateEnd: "",
};

const privateCarExpenseValidateSchema = yup.object().shape({
  type: yup.string().required("This field is required"),
  description: yup.string(),
  wayType: yup.string().required("This field is required"),
  locationFrom: yup.string().required("This field is required"),
  locationTo: yup.string().required("This field is required"),
  distance: yup
    .number("Invalid number format")
    .positive("Must be positive number")
    .required("This field is required"),
  amount: yup
    .number("Invalid number format")
    .positive("Must be positive number")
    .required("This field is required"),
  expressWay: yup.number("Invalid number format"),
  dateStart: yup.date().required("Start date is required"),
  dateEnd: yup
    .date()
    .min(yup.ref("dateStart"), "End date can't be before start date")
    .required("End date is required"),
});

const PrivateCarExpense = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [receipts, setReceipts] = useState([]);
  const [isOpen, setIsOpen] = useState({
    fileRule: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    if (values.expressWay === "") {
      values.expressWay = 0;
    }
    for (let value in values) {
      formData.append(value, values[value]);
    }
    for (const receipt of receipts) {
      formData.append("receipts", receipt);
    }
    formData.append("userId", userId);

    const response = await fetch("http://localhost:3001/expenses/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    switch (response.status) {
      case 200:
        navigate("/expenses/privatecar");
        break;
      case 403:
        dispatch(setSignOut());
        navigate("/");
        break;
      default:
        break;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        // height: "100%",
        justifyContent: "center",
      }}>
      <WidgetWrapper
        sx={{
          width: isNonMobileScreen ? "700px" : "90%",
          // height: "100vh",
          // height: "100%",
          // marginInline: "auto",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginBlock: "1rem",
        }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={privateCarExpenseValidateSchema}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form
              id="expense-form"
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "1.5rem",
              }}>
              <div
                style={{
                  gridColumn: "span 4",
                  textTransform: "uppercase",
                  fontWeight: "300",
                }}>
                Private Car Expense Form
              </div>
              <Divider
                sx={{
                  gridColumn: "span 4",
                }}
              />
              {/* FIRST ROW */}
              <div
                style={{
                  // maxWidth: "60%",
                  // marginInline: "auto",
                  gridColumn: "span 4",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}>
                <div
                  style={{
                    background: theme.palette.primary.main,
                    borderRadius: "50%",
                    minWidth: "80px",
                    minHeight: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <img src="/private-car.svg" alt="private car" />
                </div>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Category"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.type}
                  name="type"
                  error={Boolean(touched.type) && Boolean(errors.type)}
                  helperText={touched.type && errors.type}
                />
              </div>

              <RadioGroup
                sx={{
                  gridColumn: "span 4",
                  gap: "1rem",
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                }}
                row
                label="test"
                name="wayType"
                onChange={(e) => {
                  setFieldValue("wayType", e.currentTarget.value);
                }}
                value={values.wayType}>
                <FormControlLabel
                  value="One Way"
                  control={<Radio size="medium" />}
                  label="One Way"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: "Sonny Gothic, sans-serif",
                      fontWeight: "300",
                      textTransform: "uppercase",
                    },
                  }}
                />
                <FormControlLabel
                  value="Round Trip"
                  control={<Radio size="medium" />}
                  label="Round Trip"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: "Sonny Gothic",
                      fontWeight: "300",
                      textTransform: "uppercase",
                    },
                  }}
                />
              </RadioGroup>
              {/* SECOND ROW */}
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="From"
                type="text"
                placeholder="Set Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.locationFrom}
                name="locationFrom"
                error={
                  Boolean(touched.locationFrom) && Boolean(errors.locationFrom)
                }
                helperText={touched.locationFrom && errors.locationFrom}
                style={{
                  gridColumn: isNonMobileScreen ? "span 2" : "span 4",
                }}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="To"
                type="text"
                placeholder="Set Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.locationTo}
                name="locationTo"
                error={
                  Boolean(touched.locationTo) && Boolean(errors.locationTo)
                }
                helperText={touched.locationTo && errors.locationTo}
                style={{
                  gridColumn: isNonMobileScreen ? "span 2" : "span 4",
                }}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Distance (KM)"
                type="number"
                placeholder="0"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.distance}
                name="distance"
                error={Boolean(touched.distance) && Boolean(errors.distance)}
                helperText={touched.distance && errors.distance}
                style={{
                  gridColumn: "span 4",
                }}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Amount (THB)"
                type="number"
                placeholder="0.00"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={Boolean(touched.amount) && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
                style={{
                  gridColumn: isNonMobileScreen ? "span 2" : "span 4",
                }}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Express Way (THB)"
                type="number"
                placeholder="0.00"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expressWay}
                name="expressWay"
                error={
                  Boolean(touched.expressWay) && Boolean(errors.expressWay)
                }
                helperText={touched.expressWay && errors.expressWay}
                style={{
                  gridColumn: isNonMobileScreen ? "span 2" : "span 4",
                }}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: `${new Date().getFullYear()}-01-01`,
                  max: `${new Date().getFullYear()}-12-31`,
                }}
                label="Start Date"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateStart}
                // defaultValue={new Date.now()}
                name="dateStart"
                error={Boolean(touched.dateStart) && Boolean(errors.dateStart)}
                helperText={touched.dateStart && errors.dateStart}
                style={{
                  gridColumn: isNonMobileScreen ? "span 2" : "span 4",
                }}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: `${new Date().getFullYear()}-01-01`,
                  max: `${new Date().getFullYear()}-12-31`,
                }}
                label="End Date"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateEnd}
                name="dateEnd"
                error={Boolean(touched.dateEnd) && Boolean(errors.dateEnd)}
                helperText={touched.dateEnd && errors.dateEnd}
                style={{
                  gridColumn: isNonMobileScreen ? "span 2" : "span 4",
                }}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Description"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                style={{
                  gridColumn: "span 4",
                }}
              />
              <div
                style={{
                  marginTop: "1rem",
                  gridColumn: "span 4",
                  border: `1px solid ${theme.palette.background.main}`,
                  borderRadius: "10px",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                {receipts.length > 0 && (
                  <Carousel
                    autoPlay={false}
                    duration={500}
                    animation="slide"
                    cycleNavigation={false}
                    navButtonsAlwaysInvisible={true}
                    navButtonsProps={{
                      style: {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                    indicatorIconButtonProps={{
                      style: {
                        marginLeft: "0.25rem",
                      },
                    }}
                    IndicatorIcon={
                      <CircleIcon sx={{ width: "0.7rem", height: "0.7rem" }} />
                    }
                    sx={{
                      width: "50%",
                      // height: "300px",
                      marginBottom: "1rem",
                    }}>
                    {receipts.map((receipt, i) => {
                      return (
                        <div key={i}>
                          <CloseIcon
                            onClick={(e) => {
                              setReceipts([
                                ...receipts.slice(0, i),
                                ...receipts.slice(i + 1),
                              ]);
                            }}
                            sx={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              border: "1px solid red",
                              background: "white",
                              borderRadius: "50%",
                              color: theme.palette.error.main,
                              fontSize: "1rem",
                              cursor: "pointer",
                            }}
                          />
                          <img
                            draggable={false}
                            style={{
                              objectFit: "fill",
                              width: "100%",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                            src={URL.createObjectURL(receipt)}
                            alt="carousel"
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}

                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  maxFiles={5}
                  onDrop={(acceptedFiles) => {
                    if (
                      receipts.length < 5 &&
                      acceptedFiles[0].size < 1048576
                    ) {
                      if (
                        acceptedFiles[0].type === "image/png" ||
                        acceptedFiles[0].type === "image/jpeg"
                      ) {
                        setReceipts([...receipts, acceptedFiles[0]]);
                      }
                    } else {
                      setIsOpen({
                        ...isOpen,
                        fileRule: true,
                      });
                    }
                  }}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        padding: "1rem",
                        border: `1px dashed ${theme.palette.primary.main}`,
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        textTransform: "uppercase",
                        fontWeight: "300",
                        fontSize: "12px",
                        "&:hover": { cursor: "pointer" },
                      }}>
                      <input {...getInputProps()} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.5rem",
                          justifyContent: "center",
                          textAlign: "center",
                        }}>
                        <div
                          style={{
                            gap: "0.5rem",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}>
                          <AttachFileIcon />
                          <p>Attach Receipt</p>
                        </div>
                        <div>
                          You can upload a maximum of 5 files, 10MB each.
                        </div>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              {isNonMobileScreen && (
                <Button
                  onClick={handleSubmit}
                  sx={{
                    gridColumn: "span 4",
                  }}
                  variant="contained">
                  SUBMIT
                </Button>
              )}
            </form>
          )}
        </Formik>
      </WidgetWrapper>
      <Dialog open={isOpen.fileRule}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can upload a maximum of 5 files (JPG or PNG format), 10MB each !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen({ ...isOpen, fileRule: false });
            }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PrivateCarExpense;
