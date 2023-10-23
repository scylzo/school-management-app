import React from "react";
import * as yup from "yup";
import { Box } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { createAnneeAcad } from "redux/scolariteFeatures";

const anneeAcadSchema = yup.object().shape({
  titre: yup.string().required("Champ obligatoire"),
});

const AddAnneeAcadForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    dispatch(createAnneeAcad({ values, annee_en_cours: "annee en cours" }));
    actions.resetForm();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      titre: "",
    },
    validationSchema: anneeAcadSchema,
    onSubmit,
  });

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
        Ajouter Année Académique
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
          inputWidth="12rem"
          placeholder="exemple :2020-2021"
          value={values.titre}
          onChange={handleChange}
          name="titre"
          type="text"
          onBlur={handleBlur}
        />

        {errors.titre && touched.titre && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.titre}
          </Box>
        )}
        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            disable={isSubmitting || !isValid}
            buttonText="Créer"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
          <FormBtn
            type="button"
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

export default AddAnneeAcadForm;
