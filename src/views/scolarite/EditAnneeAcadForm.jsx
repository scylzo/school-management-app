/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import api from "services/api";
import { useDispatch } from "react-redux";
import { CustomFormControl, FormBtn } from "components";
import { editAnneeAcad } from "redux/scolariteFeatures";

const EditAnneeAcadForm = ({ anneeAcadId }) => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [values, setValues] = useState({});
  const [fieldData, setFieldData] = useState({});

  useEffect(() => {
    api.getAnneeAcademiqueById(anneeAcadId).then((res) => {
      if (res) {
        setFieldData(res.data);
      }
    });
  }, [anneeAcadId]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setFieldData("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userData?.id;
    dispatch(editAnneeAcad({ values, anneeAcadId, userId }));
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
        {" "}
        Editer Année Académique
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <CustomFormControl
          labelTitle="Année académique"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="exemple :2020-2021"
          value={fieldData?.name}
          onChange={handleChange}
          name="titre"
          type="text"
        />
        <CustomFormControl
          labelTitle="Année en cours"
          labelWidth="30%"
          inputWidth="13rem"
          value={fieldData?.annee_en_cours}
          onChange={handleChange}
          name="anneeEnCours"
          type="text"
        />

        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            buttonText="Modifier"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
          <FormBtn
            onClick={() => window.location.reload(true)}
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

export default EditAnneeAcadForm;
