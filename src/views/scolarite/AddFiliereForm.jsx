import React from "react";
import { Box } from "@mui/material";
import * as yup from "yup";
import { CustomFormControl, FormBtn } from "components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { filieres } from "services";
import { addFiliere } from "redux/scolariteFeatures";

const filiereSchema = yup.object().shape({
  filiere: yup.string().required("Champ obligatoire"),
});

const AddFiliereForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    dispatch(addFiliere(values));
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
      filiere: "",
    },
    validationSchema: filiereSchema,
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
        Ajouter Filière
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
          labelTitle=" Filière"
          labelWidth="30%"
          inputWidth="12rem"
          typeOfField="selectField"
          selectOptions={filieres}
          value={values.filiere}
          onChange={handleChange}
          name="filiere"
          type="text"
          onBlur={handleBlur}
        />
        {errors.filiere && touched.filiere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.filiere}
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
            onClick={() => window.location.reload(true)}
            type="button"
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

export default AddFiliereForm;
