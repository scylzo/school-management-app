import React from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";

import { CustomFormControl, FormBtn } from "components";
import { niveaux } from "services";
import { addNiveau } from "redux/scolariteFeatures";

const niveauSchema = yup.object().shape({
  niveau: yup.string().required("Champ obligatoire"),
});

const AddNiveauForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    dispatch(addNiveau(values));
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
      niveau: "",
    },
    validationSchema: niveauSchema,
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
        Ajouter Niveau{" "}
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
          typeOfField="selectField"
          labelTitle="Niveau"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.niveau}
          selectOptions={niveaux}
          onChange={handleChange}
          name="niveau"
          type="text"
          onBlur={handleBlur}
        />
        {errors.niveau && touched.niveau && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.niveau}
          </Box>
        )}
        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            disable={isSubmitting || !isValid}
            buttonText="Ajouter"
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

export default AddNiveauForm;
