import React from "react";
import { Box } from "@mui/material";
import * as yup from "yup";
import { CustomFormControl, FormBtn } from "components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { semestres } from "services";
import { addSemestre } from "redux/scolariteFeatures";

const semestreSchema = yup.object().shape({
  semestre: yup.string().required("Champ obligatoire"),
});

const AddSemestreForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    dispatch(addSemestre(values));
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
      semestre: "",
    },
    validationSchema: semestreSchema,
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
        Ajouter Seméstre
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
          labelTitle="Semestre"
          labelWidth="30%"
          inputWidth="12rem"
          typeOfField="selectField"
          selectOptions={semestres}
          value={values.semestre}
          onChange={handleChange}
          name="semestre"
          type="text"
          onBlur={handleBlur}
        />
        {errors.semestre && touched.semestre && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.semestre}
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

export default AddSemestreForm;
