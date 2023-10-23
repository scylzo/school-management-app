import React from "react";
import "./customFormControl.scss";
import { CustomInput, CustomSelect } from "components";
import { Box, FormControl, InputLabel } from "@mui/material";

export const CustomFormControl = ({
  labelTitle,
  typeOfField,
  labelWidth,
  inputWidth,
  fontWeight,
  controlWidth,
  value,
  ...rest
}) => {
  return (
    <Box
      className="custom-form-control"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={controlWidth}
    >
      <InputLabel
        sx={{
          fontFamily: ["Poppins", "sans-serif"].join(","),
          mr: "0.2rem",
          width: labelWidth,
          display: "flex",
          fontWeight: fontWeight,
          fontSize: "12px",
          whiteSpace: "normal",
          justifyContent: "flex-start",
        }}
      >
        {labelTitle}
      </InputLabel>
      <FormControl className="form-control-container">
        {typeOfField === "selectField" ? (
          <CustomSelect {...rest} inputWidth={inputWidth} value={value} />
        ) : (
          <CustomInput {...rest} inputWidth={inputWidth} value={value} />
        )}
      </FormControl>
    </Box>
  );
};
