import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { administrationSchema } from "validationSchemas";
import { registerOther } from "redux/authFeatures";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { countries } from "services";

const AddAdmin = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const roles = ["admin"];
    dispatch(registerOther({ values, roles }));
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
      nomPrenom: "",
      cni: "",
      nationalite: "",
      tel: "",
      email: "",
      adresseSenegal: "",
    },
    validationSchema: administrationSchema,
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
        Ajouter utilisateur
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
          value={values.nomPrenom}
          onChange={handleChange}
          name="nomPrenom"
          type="text"
          onBlur={handleBlur}
        />
        {errors.nomPrenom && touched.nomPrenom && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.nomPrenom}
          </Box>
        )}
        <CustomFormControl
          labelTitle="CNI"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.cni}
          onChange={handleChange}
          name="cni"
          type="number"
          onBlur={handleBlur}
        />
        {errors.cni && touched.cni && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.cni}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Nationalité"
          labelWidth="30%"
          inputWidth="12rem"
          typeOfField="selectField"
          selectOptions={countries}
          value={values.nationalite}
          onChange={handleChange}
          name="nationalite"
          type="text"
          onBlur={handleBlur}
        />
        {errors.nationalite && touched.nationalite && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.nationalite}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Tél mobile"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.tel}
          onChange={handleChange}
          name="tel"
          type="number"
          onBlur={handleBlur}
        />
        {errors.tel && touched.tel && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.tel}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Email"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.email}
          onChange={handleChange}
          name="email"
          type="email"
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.email}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Adresse"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.adresseSenegal}
          onChange={handleChange}
          name="adresseSenegal"
          type="text"
          onBlur={handleBlur}
        />
        {errors.adresseSenegal && touched.adresseSenegal && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.adresseSenegal}
          </Box>
        )}

        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            disable={isSubmitting || !isValid}
            buttonText="Enregistrer"
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

export default AddAdmin;
