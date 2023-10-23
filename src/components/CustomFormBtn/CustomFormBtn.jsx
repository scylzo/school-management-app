import React from "react";
import { Button } from "@mui/material";

export const FormBtn = ({
  buttonText,
  bgNormalColor,
  width_,
  margin_,
  padding_,
  color,
  type,
  disable,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disable}
      type={type}
      sizeMedium
      sx={{
        "&:hover": { backgroundColor: bgNormalColor },
        m: 1,
        fontSize: "10px",
        height: "30px",
        borderRadius: "20px",
        background: bgNormalColor,
        fontFamily: ["Poppins", "sans-serif"].join(","),
        textTransform: "capitalize",
        width: width_,
        margin: margin_,
        padding: padding_,
        color: color,
      }}
      variant="contained"
    >
      {buttonText}
    </Button>
  );
};
