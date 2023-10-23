import React from "react";
import "./customInput.scss";
import { Input } from "@mui/material";

export const CustomInput = ({ inputWidth, fontWeight, ...rest }) => {
  return (
    <Input
      className="custom-input"
      disableUnderline
      sx={{
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        ".Mui-focused": { border: "none" },
        background: "rgb(125,177,124,5%)",
        borderRadius: "10px",
        height: "30px",
        fontSize: "12px",

        p: "1rem",
        color: "#B1BBC6",
        width: inputWidth,
      }}
      id="my-input"
      aria-describedby="my-helper-text"
      {...rest}
    />
  );
};
