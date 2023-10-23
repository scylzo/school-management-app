import React from "react";
import { MenuItem, Select } from "@mui/material";
const fieldStyles = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  ".Mui-focused": { border: "none" },
  background: "rgb(125,177,124,5%)",
  borderRadius: "10px",
  height: "30px",
  fontSize: "12px",
  p: "1rem",
  color: "#B1BBC6",
};

export const CustomSelect = ({
  selectOptions,
  selectOptionsFromApiAnneeAcad,
  selectOptionsFromApiClasse,
  selectOptionsFromApiUE,
  selectOptionsFromApiUeIdFiltred,
  selectOptionsFromApiEcId,
  selectOptionsFromApiEc,
  selectOptionsFromApiEcFiltred,
  selectOptionsFromApiSemestre,
  selectOptionsFromApiUeId,
  selectOptionsFromApiNiveau,
  selectOptionsFromApiFiliere,
  selectOptionsFromApiTarifs,
  selectOptionsFromApiNiveauEtude,
  inputWidth,
  label,
  value,
  ...rest
}) => {
  return (
    <Select
      value={value}
      disableUnderline
      variant="standard"
      style={{ width: inputWidth }}
      sx={fieldStyles}
      {...rest}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: "#F0F9E6",
            "& .MuiMenuItem-root": {
              fontSize: "12px",
              fontFamily: ["Poppins", "sans-serif"].join(","),
            },
          },
        },
      }}
    >
      {selectOptions &&
        selectOptions?.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}{" "}
          </MenuItem>
        ))}
      {selectOptionsFromApiAnneeAcad &&
        selectOptionsFromApiAnneeAcad?.map((option, index) => (
          <MenuItem key={index} value={option?.name}>
            {option?.name}
          </MenuItem>
        ))}
      {selectOptionsFromApiClasse &&
        selectOptionsFromApiClasse?.map((option, index) => (
          <MenuItem key={index} value={JSON.stringify(option)}>
            {option?.classe}
          </MenuItem>
        ))}
      {selectOptionsFromApiNiveauEtude &&
        selectOptionsFromApiNiveauEtude?.map((option, index) => (
          <MenuItem key={index} value={option?.classe}>
            {option?.classe}
          </MenuItem>
        ))}
      {selectOptionsFromApiUE &&
        selectOptionsFromApiUE?.map((option, index) => (
          <MenuItem key={index} value={option?.nom_matiere}>
            {option?.nom_matiere}
          </MenuItem>
        ))}
      {selectOptionsFromApiUeIdFiltred &&
        selectOptionsFromApiUeIdFiltred?.map((option, index) => (
          <MenuItem key={index} value={option?.id}>
            {option?.unite_enseignement}
          </MenuItem>
        ))}
      {selectOptionsFromApiUeId &&
        selectOptionsFromApiUeId?.data?.map((option, index) => (
          <MenuItem key={index} value={option?.id}>
            {option?.nom_matiere}
          </MenuItem>
        ))}
      {selectOptionsFromApiEcId &&
        selectOptionsFromApiEcId?.data?.map((option, index) => (
          <MenuItem key={index} value={option?.id}>
            {option?.nom_element}
          </MenuItem>
        ))}
      {selectOptionsFromApiEc &&
        selectOptionsFromApiEc?.data?.map((option, index) => (
          <MenuItem key={index} value={option?.nom_element}>
            {option?.nom_element}
          </MenuItem>
        ))}
      {selectOptionsFromApiEcFiltred &&
        selectOptionsFromApiEcFiltred?.map((option, index) => (
          <MenuItem key={index} value={option?.id}>
            {option?.nom_element}
          </MenuItem>
        ))}
      {selectOptionsFromApiSemestre &&
        selectOptionsFromApiSemestre?.data?.map((option, index) => (
          <MenuItem key={index} value={option?.id}>
            {option?.name}
          </MenuItem>
        ))}
      {selectOptionsFromApiNiveau &&
        selectOptionsFromApiNiveau?.map((option, index) => (
          <MenuItem key={index} value={option?.name}>
            {option?.name}
          </MenuItem>
        ))}
      {selectOptionsFromApiFiliere &&
        selectOptionsFromApiFiliere?.map((option, index) => (
          <MenuItem key={index} value={option?.name}>
            {option?.name}
          </MenuItem>
        ))}
      {selectOptionsFromApiTarifs &&
        selectOptionsFromApiTarifs?.map((option, index) => (
          <MenuItem key={index} value={option?.name}>
            {option?.nom_tarif}
          </MenuItem>
        ))}
    </Select>
  );
};
