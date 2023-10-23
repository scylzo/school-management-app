/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ecSchema } from "validationSchemas";
import { addEc, fetchUE } from "redux/scolariteFeatures";

const AddEcForm = () => {
  const dispatch = useDispatch();
  const ue = useSelector((state) => state.ue);

  useEffect(() => {
    dispatch(fetchUE());
  }, []);

  const onSubmit = async (values, actions) => {
    dispatch(addEc({ values, vht }));
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
      nomEc: "",
      cm: "",
      reference: "",
      stage: "",
      tpTd: "",
      tpe: "",
      ue: "",
    },
    validationSchema: ecSchema,
    onSubmit,
  });

  const vht = values?.cm + values?.tpTd + values?.tpe;

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
        Ajouter EC
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
          labelTitle="Nom de L'EC"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.nomEc}
          onChange={handleChange}
          name="nomEc"
          type="text"
          onBlur={handleBlur}
        />
        {errors.nomEc && touched.nomEc && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.nomEc}
          </Box>
        )}
        <CustomFormControl
          labelTitle="CM"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.cm}
          onChange={handleChange}
          name="cm"
          type="number"
          onBlur={handleBlur}
        />
        {errors.cm && touched.cm && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.cm}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Reference"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.reference}
          onChange={handleChange}
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
          labelTitle="Stage"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.stage}
          onChange={handleChange}
          name="stage"
          type="number"
          onBlur={handleBlur}
        />
        {errors.stage && touched.stage && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.stage}
          </Box>
        )}
        <CustomFormControl
          labelTitle="TP/TD"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.tpTd}
          onChange={handleChange}
          name="tpTd"
          type="number"
          onBlur={handleBlur}
        />
        {errors.tpTd && touched.tpTd && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.tpTd}
          </Box>
        )}
        <CustomFormControl
          labelTitle="TPE"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.tpe}
          onChange={handleChange}
          name="tpe"
          type="number"
          onBlur={handleBlur}
        />
        {errors.tpe && touched.tpe && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.tpe}
          </Box>
        )}
        <CustomFormControl
          labelTitle="VHT"
          labelWidth="30%"
          inputWidth="12rem"
          value={vht}
        />
        <CustomFormControl
          labelTitle="UE"
          labelWidth="30%"
          inputWidth="12rem"
          typeOfField="selectField"
          selectOptionsFromApiUeId={ue}
          value={values.ue}
          onChange={handleChange}
          name="ue"
          type="text"
          onBlur={handleBlur}
        />
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

export default AddEcForm;
