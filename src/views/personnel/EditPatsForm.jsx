/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { useDispatch } from "react-redux";
import api from "services/api";
import { editUser } from "redux/userFeatures";

const EditPatsForm = ({ userId }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({});
  const [fieldsData, setFieldsData] = useState();

  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = () => {
    api.getUserById(userId).then((res) => {
      if (res.data) {
        setFieldsData(res);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editUser({
        id: userId,
        values,
        theAge: theAge ? theAge : fieldsData?.data?.age,
      })
    );
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setFieldsData("");
  };

  //get user age
  const inputAge = values?.dateDeNaissance?.substring(0, 4);
  const currentYear = new Date().getFullYear();
  const theAge = currentYear - parseInt(inputAge);

  return (
    <>
      <h1 style={{ fontSize: "14px", textAlign: "center" }}>Editer Pats</h1>
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
          Etat civil
        </Typography>
        <CustomFormControl
          labelTitle="Nom & prénom "
          labelWidth="30%"
          inputWidth="12rem"
          name="nomPrenom"
          value={fieldsData?.data?.nom}
          type="text"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="CNI"
          labelWidth="30%"
          inputWidth="12rem"
          name="cni"
          value={fieldsData?.data?.Cin}
          type="text"
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Nationalité"
          labelWidth="30%"
          inputWidth="12rem"
          name="nationalite"
          value={fieldsData?.data?.nationalite}
          type="text"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Date de naissance"
          labelWidth="30%"
          inputWidth="12rem"
          name="dateDeNaissance"
          value={fieldsData?.data?.date_naissance}
          type="date"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Age"
          labelWidth="30%"
          inputWidth="12rem"
          name="age"
          value={theAge ? theAge : fieldsData?.data?.age}
          type="number"
        />
        <CustomFormControl
          labelTitle="Sexe"
          labelWidth="30%"
          inputWidth="12rem"
          name="sexe"
          value={fieldsData?.data?.sexe}
          type="text"
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Téléphone"
          labelWidth="30%"
          inputWidth="12rem"
          name="tel"
          value={fieldsData?.data?.tel_mobile}
          type="tel"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Email"
          labelWidth="30%"
          inputWidth="12rem"
          name="email"
          value={fieldsData?.data?.email}
          type="email"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Adresse"
          labelWidth="30%"
          inputWidth="12rem"
          name="adresseSenegal"
          value={fieldsData?.data?.adresse_senegal}
          type="text"
          onChange={handleChange}
        />

        <Typography
          sx={{
            color: "rgb(177,187,198,100)",
            fontWeight: "600",
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: "12px",
          }}
        >
          Fonction
        </Typography>
        <CustomFormControl
          labelTitle="Fonction"
          value={fieldsData?.data?.fonction}
          labelWidth="30%"
          inputWidth="12rem"
          type="text"
          name="fonction"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Type de contrat"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.data?.Type_contrat}
          type="text"
          name="typeContrat"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Catégories"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.data?.categorie}
          type="text"
          name="categorie"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Diplôme"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.data?.diplome}
          name="diplome"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Date recrutement"
          labelWidth="30%"
          inputWidth="12rem"
          type="date"
          value={fieldsData?.data?.Date_recrutement}
          name="dateRecrutement"
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Spécialité"
          labelWidth="30%"
          inputWidth="12rem"
          name="specialite"
          value={fieldsData?.data?.Specialite}
          type="text"
          onChange={handleChange}
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
            onClick={() => window.location.reload()}
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

export default EditPatsForm;
