/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { useDispatch } from "react-redux";
import { registerParent } from "redux/parentFeatures";
import { useFormik } from "formik";
import { parentSchema } from "validationSchemas";

const AddParentForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    dispatch(registerParent({ values }));
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
      nom: "",
      prenom: "",
      telMobile: "",
      email: "",
      lienDeParente: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: parentSchema,
    onSubmit,
  });

  return (
    <>
      <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
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
            Info Personnelle
          </Typography>
          <CustomFormControl
            labelTitle="Prénom"
            labelWidth="30%"
            inputWidth="12rem"
            name="prenom"
            type="text"
            value={values.prenom}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.prenom && touched.prenom && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "10rem",
                color: "red",
              }}
            >
              {errors.prenom}
            </Box>
          )}
          <CustomFormControl
            labelTitle="Nom"
            labelWidth="30%"
            inputWidth="12rem"
            name="nom"
            type="text"
            value={values.nom}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.nom && touched.nom && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "10rem",
                color: "red",
              }}
            >
              {errors.nom}
            </Box>
          )}

          <CustomFormControl
            labelTitle="Tél mobile"
            labelWidth="30%"
            inputWidth="12rem"
            name="telMobile"
            type="number"
            value={values.telMobile}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.telMobile && touched.telMobile && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "10rem",
                color: "red",
              }}
            >
              {errors.telMobile}
            </Box>
          )}
          <CustomFormControl
            labelTitle="Email"
            labelWidth="30%"
            inputWidth="12rem"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "10rem",
                color: "red",
              }}
            >
              {errors.email}
            </Box>
          )}
          <CustomFormControl
            labelTitle="Lien de parenté"
            labelWidth="30%"
            inputWidth="12rem"
            name="lienDeParente"
            value={values.lienDeParente}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lienDeParente && touched.lienDeParente && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "10rem",
                color: "red",
              }}
            >
              {errors.lienDeParente}
            </Box>
          )}
          <Typography
            sx={{
              color: "rgb(177,187,198,100)",
              fontWeight: "600",
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: "12px",
            }}
          >
            Accès
          </Typography>
          <CustomFormControl
            labelTitle="Nom d'utilisateur"
            labelWidth="30%"
            inputWidth="12rem"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "10rem",
                color: "red",
              }}
            >
              {errors.username}
            </Box>
          )}
          <CustomFormControl
            labelTitle="Mot de passe"
            labelWidth="30%"
            inputWidth="12rem"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "10rem",
                color: "red",
              }}
            >
              {errors.password}
            </Box>
          )}
          <CustomFormControl
            labelTitle="Confirmer mot de passe"
            labelWidth="30%"
            inputWidth="12rem"
            name="confirmPassword"
            value={values.confirmPassword}
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "10rem",
                color: "red",
              }}
            >
              {errors.confirmPassword}
            </Box>
          )}
          <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
            <FormBtn
              disable={isSubmitting || !isValid}
              type="submit"
              buttonText="Enregistrer"
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
      </div>
    </>
  );
};

export default AddParentForm;
