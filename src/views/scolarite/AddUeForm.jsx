/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CustomFormControl, FormBtn } from "components";
import { addUe, fetchSemestre } from "redux/scolariteFeatures";
import { typeUe } from "services";
import { useFormik } from "formik";
import { ueSchema } from "validationSchemas";

const AddUeForm = () => {
  const dispatch = useDispatch();
  const semestres = useSelector((state) => state.semestre);

  useEffect(() => {
    dispatch(fetchSemestre());
  }, []);

  const onSubmit = async (values, actions) => {
    dispatch(addUe({ values }));
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
      nomUe: "",
      reference: "",
      credit: "",
      semestre: "",
      typeUe: "",
    },
    validationSchema: ueSchema,
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
        Ajouter UE
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
          labelTitle="Nom de L'UE"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.nomUe}
          onChange={handleChange}
          name="nomUe"
          type="text"
          onBlur={handleBlur}
        />
        {errors.nomUe && touched.nomUe && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.nomUe}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Reference"
          labelWidth="30%"
          inputWidth="12rem"
          placeholder="exemple : MED-PHARM XXX"
          onChange={handleChange}
          value={values.reference}
          name="reference"
          type="text"
          onBlur={handleBlur}
        />
        {errors.reference && touched.reference && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.reference}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Crédit"
          labelWidth="30%"
          inputWidth="12rem"
          type="number"
          value={values.credit}
          onChange={handleChange}
          name="credit"
          onBlur={handleBlur}
        />
        {errors.credit && touched.credit && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.credit}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Semestre"
          labelWidth="30%"
          inputWidth="12rem"
          typeOfField="selectField"
          selectOptionsFromApiSemestre={semestres}
          value={values.semestre}
          onChange={handleChange}
          name="semestre"
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
        <CustomFormControl
          labelTitle="Type UE"
          labelWidth="30%"
          inputWidth="12rem"
          typeOfField="selectField"
          selectOptions={typeUe}
          type="text"
          value={values.typeUe}
          onChange={handleChange}
          name="typeUe"
          onBlur={handleBlur}
        />
        {errors.typeUe && touched.typeUe && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.typeUe}
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
            type="submit"
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

export default AddUeForm;
