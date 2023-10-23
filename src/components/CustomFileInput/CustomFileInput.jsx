import React from "react";
import { Box, Input, InputLabel } from "@mui/material";
export const CustomFileInput = ({ inputWidth, titre, className, ...rest }) => {
  return (
    <Box
      sx={{
        background: "#d1eec9b3",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        width: "12rem",
      }}
    >
      <InputLabel
        for="file-upload"
        sx={{
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: "10px",
          whiteSpace: "normal",
          width: "100%",
          height: "40px",
          paddingTop: "12px",
          cursor: "pointer",
          textAlign: "center",
          border: "1px dashed #B1BBC6",
          borderRadius: "10px",
          fontWeight: "800",
        }}
      >
        {titre}
      </InputLabel>
      <Input
        type="file"
        multiple="multiple"
        disableUnderline
        sx={{
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          ".Mui-focused": { border: "none" },
          color: "#B1BBC6",
          width: inputWidth,
          cursor: "pointer",
        }}
        id="file-upload"
        aria-describedby="my-helper-text"
        {...rest}
      />
    </Box>
  );
};
