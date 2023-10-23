/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { ClockLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { TabPanel } from "@mui/joy";
import {
  Box,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { nationalite, sexes } from "services";
import { editUser } from "redux/userFeatures";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    minHeight: "28px",
    fontSize: "10px",
    p: "1rem",
    color: "#B1BBC6",
    width: "12rem",
    border: "none",
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontSize: "10px",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#9fa9b2"
        : isFocused
        ? "rgb(125,177,124,5%)"
        : "",
    };
  },
};

const EditRegisterForm = ({ student }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [editValues, setEditValues] = useState({});
  const [countrieFieldsSelect, setCountrieFieldsSelect] = useState();
  const [sexeFieldsSelect, setSexeFieldsSelect] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      setEditValues(student);
      const countriesFromApi = [student?.data?.nationalite];
      const selectCountries = countriesFromApi?.map((item) => {
        const newC = {
          label: item,
          value: item,
        };
        return newC;
      });
      const sexeFromApi = [student?.data?.sexe];
      const selectSexes = sexeFromApi?.map((item) => {
        const newS = {
          label: item,
          value: item,
        };
        return newS;
      });
      setSexeFieldsSelect(selectSexes);
      setCountrieFieldsSelect(selectCountries);
    }
    return () => {
      isCancelled = true;
    };
  }, [student]);

  const handleSelectCountries = (countrieFieldsSelect) => {
    setCountrieFieldsSelect((prev) => (prev = countrieFieldsSelect));
  };
  const handleSelectSexe = (sexeFieldsSelect) => {
    setSexeFieldsSelect((prev) => (prev = sexeFieldsSelect));
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setEditValues("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nationalite = countrieFieldsSelect?.value;
    const sexe = sexeFieldsSelect?.value;
    dispatch(editUser({ id: student?.data?.id, values, nationalite, sexe }));
  };

  return (
    <>
      {student?.loading ? (
        <Box display="flex" justifyContent="center" m={"1rem"}>
          <ClockLoader color="#43a81f" />
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <TabPanel
            value={0}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography
              sx={{
                color: "rgb(177,187,198,100)",
                fontWeight: "600",
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: "12px",
              }}
            >
              Info Personel
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <FormLabel
                component="legend"
                sx={{
                  width: "25%",
                  display: "flex",
                  justifyContent: "flex-start",
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  fontSize: "12px",
                }}
              >
                Primo
              </FormLabel>
              <Box
                sx={{
                  width: "12rem",
                  display: "flex",
                  justifyContent: "flex-start !important",
                  marginLeft: "25px",
                }}
              >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  value={editValues.primo === "primo" ? true : false}
                  onChange={handleChange}
                  name="primo"
                  type="radio"
                >
                  <Box>
                    <span style={{ fontSize: "10px", marginRight: "10px" }}>
                      Nouveau
                    </span>{" "}
                    <FormControlLabel
                      value="nouveau"
                      control={
                        <Radio
                          sx={{
                            color: "#43a81f",
                            "&.Mui-checked": {
                              color: "#43a81f",
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box>
                    {" "}
                    <span style={{ fontSize: "10px", marginRight: "10px" }}>
                      Ancien
                    </span>{" "}
                    <FormControlLabel
                      value="ancien"
                      control={
                        <Radio
                          sx={{
                            color: "#43a81f",
                            "&.Mui-checked": {
                              color: "#43a81f",
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                </RadioGroup>
              </Box>
            </Box>

            <CustomFormControl
              labelTitle="Nom & prenom"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.nom}
              onChange={handleChange}
              name="nomPrenom"
              type="text"
            />

            <CustomFormControl
              labelTitle="Date de naissance"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.date_naissance}
              onChange={handleChange}
              name="dateDeNaissance"
              type="date"
            />

            <CustomFormControl
              labelTitle="CNI"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Cin}
              onChange={handleChange}
              name="cni"
              type="number"
            />

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              flexWrap={"wrap"}
            >
              <InputLabel
                sx={{
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  mr: "0.2rem",
                  width: "30%",
                  textAlign: "center",
                  display: "flex",
                  fontSize: "12px",
                  whiteSpace: "normal",
                  justifyContent: "flex-start",
                }}
              >
                Sexe
              </InputLabel>
              <Select
                placeholder="Sexe..."
                onChange={handleSelectSexe}
                closeMenuOnSelect={true}
                options={sexes}
                value={sexeFieldsSelect}
                styles={colourStyles}
                type="text"
              />
            </Box>

            <CustomFormControl
              labelTitle="Email"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.email}
              onChange={handleChange}
              name="email"
              type="email"
            />

            <CustomFormControl
              labelTitle="Téléphone"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.tel_mobile}
              onChange={handleChange}
              name="tel"
              type="number"
            />

            <CustomFormControl
              labelTitle="Adresse au Sénégal"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.adresse_senegal}
              onChange={handleChange}
              name="adresseSenegal"
              type="text"
            />

            <CustomFormControl
              labelTitle="Adresse pays origine"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.adresse_pays_origine}
              onChange={handleChange}
              name="adressePaysOrigine"
              type="text"
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              flexWrap={"wrap"}
            >
              <InputLabel
                sx={{
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  mr: "0.2rem",
                  width: "30%",
                  textAlign: "center",
                  display: "flex",
                  fontSize: "12px",
                  whiteSpace: "normal",
                  justifyContent: "flex-start",
                }}
              >
                Nationalité
              </InputLabel>
              <Select
                placeholder="Nationalité..."
                onChange={handleSelectCountries}
                closeMenuOnSelect={true}
                options={nationalite}
                value={countrieFieldsSelect}
                styles={colourStyles}
                type="text"
              />
            </Box>

            <CustomFormControl
              labelTitle="Lieu de Naissance"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.lieu_naissance}
              onChange={handleChange}
              name="lieuDeNaissance"
              type="text"
            />
          </TabPanel>
          <TabPanel
            value={1}
            sx={{
              p: 2,
              paddingTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography
              sx={{
                color: "rgb(177,187,198,100)",
                fontWeight: "600",
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: "12px",
              }}
            >
              Papa
            </Typography>
            <CustomFormControl
              labelTitle="Nom & prenom"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Nom_pere}
              onChange={handleChange}
              name="nomPrenomPere"
              type="text"
            />

            <CustomFormControl
              labelTitle="Adresse père"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Adresse_pere}
              onChange={handleChange}
              name="adressePere"
              type="text"
            />

            <CustomFormControl
              labelTitle="Téléphone"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Telephone_pere}
              onChange={handleChange}
              name="telPere"
              type="number"
            />

            <CustomFormControl
              labelTitle="Profession"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Profession_pere}
              onChange={handleChange}
              name="professionPere"
              type="text"
            />

            <Typography
              sx={{
                color: "rgb(177,187,198,100)",
                fontWeight: "600",
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: "12px",
              }}
            >
              Maman
            </Typography>
            <CustomFormControl
              labelTitle="Nom & prenom"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Nom_mere}
              onChange={handleChange}
              name="nomPrenomMere"
              type="text"
            />

            <CustomFormControl
              labelTitle="Adresse mère"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Adresse_mere}
              onChange={handleChange}
              name="adresseMere"
              type="text"
            />
            <CustomFormControl
              labelTitle="Téléphone"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Telephone_mere}
              onChange={handleChange}
              name="telMere"
              type="number"
            />

            <CustomFormControl
              labelTitle="Profession"
              labelWidth="30%"
              inputWidth="12rem"
              value={editValues?.data?.Profession_mere}
              onChange={handleChange}
              name="professionMere"
              type="text"
            />

            <Typography
              sx={{
                color: "rgb(177,187,198,100)",
                fontWeight: "600",
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: "12px",
              }}
            >
              Personne à contacter en cas d'urgence
            </Typography>
            <CustomFormControl
              labelTitle="Nom & prénom"
              labelWidth="25%"
              inputWidth="12rem"
              value={editValues.nomPrenomTuteur}
              onChange={handleChange}
              name="nomPrenomTuteur"
              type="text"
            />

            <CustomFormControl
              labelTitle="Téléphone"
              labelWidth="25%"
              inputWidth="12rem"
              value={editValues.telTuteur}
              onChange={handleChange}
              name="telTuteur"
              type="number"
            />

            <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
              <FormBtn
                type="submit"
                buttonText="Edit"
                bgNormalColor="#43A81F"
                margin_=""
                width_="30%"
              />
              <FormBtn
                onClick={() => window.location.reload()}
                buttonText="Annuler"
                bgNormalColor="#C74040"
                margin_=""
                width_="30%"
              />
            </Box>
          </TabPanel>
        </form>
      )}
    </>
  );
};

export default EditRegisterForm;
