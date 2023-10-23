import React from "react";
import { Button } from "@mui/material";

export const CustomButton = ({
  buttonText,
  bgHoverColor,
  bgNormalColor,
  width_,
  margin_,
  onClick,
  hidden,
  disable,
  type,
}) => {
  return (
    <Button
      type={type}
      disabled={disable}
      onClick={onClick}
      sizeMedium
      sx={{
        "&:hover": { backgroundColor: bgHoverColor },
        m: 1,
        height: "40px",
        borderRadius: "50px",
        background: bgNormalColor,
        fontFamily: ["Poppins", "sans-serif"].join(","),
        textTransform: "capitalize",
        width: width_,
        margin: margin_,
        display: hidden ? "none" : undefined,
      }}
      variant="contained"
    >
      {buttonText}
    </Button>
  );
};
