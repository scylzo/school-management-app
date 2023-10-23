/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, InputLabel, Typography } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import Select from "react-select";
import { nationalite } from "services";
import api from "services/api";
import { useDispatch } from "react-redux";
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

const EditAdmin = ({ userId }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState();
  const [fieldsData, setFieldsData] = useState();
  const [countrieFieldsSelect, setCountrieFieldsSelect] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      api.getUserById(userId).then((res) => {
        if (res.data) {
          const countriesFromApi = [res?.data?.nationalite];
          const selectCountries = countriesFromApi?.map((item) => {
            const newC = {
              label: item,
              value: item,
            };
            return newC;
          });
          setCountrieFieldsSelect(selectCountries);
          setFieldsData(res.data);
        }
      });
    }
    return () => {
      isCancelled = true;
    };
  }, [userId]);

  const handleSelectCountries = (countrieFieldsSelect) => {
    setCountrieFieldsSelect((prev) => (prev = countrieFieldsSelect));
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setFieldsData("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const nationalite = countrieFieldsSelect?.value;
    dispatch(editUser({ values, nationalite, id: userId }));
  };

  return (
    <>
      <h1
        className="level-two"
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: 600,
        }}
      >
        Editer utilisateur
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Typography
          sx={{
            color: "rgb(177,187,198,100)",
            fontWeight: "600",
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: "12px",
          }}
        >
          informations personnelles
        </Typography>
        <CustomFormControl
          labelTitle="Nom & prénom"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.nom}
          onChange={handleChange}
          name="nomPrenom"
          type="text"
        />

        <CustomFormControl
          labelTitle="CNI"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.Cin}
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
          labelTitle="Tél mobile"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.tel_mobile}
          onChange={handleChange}
          name="tel"
          type="number"
        />

        <CustomFormControl
          labelTitle="Email"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.email}
          onChange={handleChange}
          name="email"
          type="email"
        />

        <CustomFormControl
          labelTitle="Adresse"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.adresse_senegal}
          onChange={handleChange}
          name="adresseSenegal"
          type="text"
        />

        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            buttonText="Editer"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
          <FormBtn
            buttonText="Annuler"
            bgNormalColor="#C74040"
            margin_=""
            width_="30%"
          />
        </Box>
      </form>
    </>
  );
};

export default EditAdmin;
