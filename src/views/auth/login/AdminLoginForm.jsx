import React, { useState, useEffect } from "react";
import { Box, FilledInput, FormControl, InputAdornment } from "@mui/material";
import { CustomButton } from "components";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginAdmin } from "redux/authFeatures";
import { loginSchema } from "validationSchemas";

const fieldStyle = {
  borderRadius: "50px",

  "& > .MuiInputBase-input": {
    paddingTop: "11px",
    height: "35px",
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontWeight: 300,
    paddingLeft: "10px",
  },
  "& > .MuiInputAdornment-root": {
    marginTop: "2px !important",
  },
};

const AdminLoginForm = ({ marginTop }) => {
  const dispatch = useDispatch();
  const [showHide, setShowHide] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      localStorage.setItem("tab", "Administration");
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleShowHidePassword = () => {
    setShowHide(!showHide);
  };

  const onSubmit = async (values, actions) => {
    dispatch(loginAdmin(values));
    actions.resetForm();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <FormControl
          variant="filled"
          className={errors.username && touched.username ? "input-error" : ""}
        >
          <FilledInput
            disableUnderline
            sx={fieldStyle}
            id="filled-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <Person2OutlinedIcon fontSize="small" />
              </InputAdornment>
            }
            value={values.username}
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Utilisateur"
            onBlur={handleBlur}
          />
        </FormControl>
        {errors.username && touched.username && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10px",
              color: "red",
            }}
          >
            {errors.username}
          </Box>
        )}
        <FormControl
          variant="filled"
          className={errors.password && touched.password ? "input-error" : ""}
        >
          <FilledInput
            disableUnderline
            sx={fieldStyle}
            id="filled-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <LockOpenOutlinedIcon fontSize="small" />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment
                sx={{ cursor: "pointer" }}
                position="start"
                onClick={() => handleShowHidePassword()}
              >
                {showHide ? (
                  <Visibility fontSize="small" />
                ) : (
                  <VisibilityOff fontSize="small" />
                )}
              </InputAdornment>
            }
            value={values.password}
            onChange={handleChange}
            name="password"
            type={showHide ? "password" : "text"}
            placeholder="Mot de passe"
            onBlur={handleBlur}
          />
        </FormControl>
        {errors.password && touched.password && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10px",
              color: "red",
            }}
          >
            {errors.password}
          </Box>
        )}

        <CustomButton
          type="submit"
          disable={isSubmitting || !isValid}
          width_="100%"
          margin_={`${marginTop} auto 0`}
          bgHoverColor="#b43f3f89"
          bgNormalColor="#43A81F"
          buttonText="Connexion"
        />
      </form>
    </>
  );
};

export default AdminLoginForm;
