import { Box, Typography } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { registerOther } from "redux/authFeatures";
import {
  categories,
  countries,
  diplomesPats,
  fonctionsPats,
  gender,
  patsGrade,
  typeContrat,
} from "services";
import { patsSchema } from "validationSchemas";

const PatsForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const roles = ["paths"];
    dispatch(registerOther({ values, roles, theAge }));
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
      dateDeNaissance: "",
      nationalite: "",
      adresseSenegal: "",
      tel: "",
      email: "",
      sexe: "",
      username: "",
      password: "",
      confirmPassword: "",
      fonction: "",
      typeContrat: "",
      categorie: "",
      diplome: "",
      dateRecrutement: "",
      specialite: "",
    },
    validationSchema: patsSchema,
    onSubmit,
  });

  //get user age
  const inputAge = values?.dateDeNaissance?.substring(0, 4);
  const currentYear = new Date().getFullYear();
  const theAge = currentYear - parseInt(inputAge);

  return (
    <>
      <h1 style={{ fontSize: "14px", textAlign: "center" }}>Ajouter Pats</h1>
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
          Etat civil(PATS)
        </Typography>
        <CustomFormControl
          labelTitle="Nom & prénom "
          labelWidth="30%"
          inputWidth="12rem"
          name="nomPrenom"
          type="text"
          value={values.nomPrenom}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.nomPrenom && touched.nomPrenom && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
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
          name="cni"
          value={values.cni}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.cni && touched.cni && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
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
          name="nationalite"
          type="text"
          typeOfField="selectField"
          selectOptions={countries}
          value={values.nationalite}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.nationalite && touched.nationalite && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.nationalite}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Date de naissance"
          labelWidth="30%"
          inputWidth="12rem"
          name="dateDeNaissance"
          type="date"
          value={values.dateDeNaissance}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.dateDeNaissance && touched.dateDeNaissance && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.dateDeNaissance}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Age"
          labelWidth="30%"
          inputWidth="12rem"
          name="age"
          value={theAge ? theAge : ""}
          type="number"
        />
        <CustomFormControl
          labelTitle="Sexe"
          labelWidth="30%"
          inputWidth="12rem"
          name="sexe"
          type="text"
          typeOfField="selectField"
          selectOptions={gender}
          value={values.sexe}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.sexe && touched.sexe && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.sexe}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Téléphone"
          labelWidth="30%"
          inputWidth="12rem"
          name="tel"
          value={values.tel}
          type="tel"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.tel && touched.tel && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
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
          labelTitle="Adresse"
          labelWidth="30%"
          inputWidth="12rem"
          name="adresseSenegal"
          type="text"
          value={values.adresseSenegal}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.adresseSenegal && touched.adresseSenegal && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.adresseSenegal}
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
          Fonction
        </Typography>
        <CustomFormControl
          labelTitle="Fonction"
          typeOfField="selectField"
          selectOptions={fonctionsPats}
          labelWidth="30%"
          inputWidth="12rem"
          type="text"
          name="fonction"
          value={values.fonction}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.fonction && touched.fonction && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.fonction}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Type de contrat"
          labelWidth="30%"
          inputWidth="12rem"
          type="text"
          name="typeContrat"
          typeOfField="selectField"
          selectOptions={typeContrat}
          value={values.typeContrat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.typeContrat && touched.typeContrat && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.typeContrat}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Grade"
          labelWidth="30%"
          inputWidth="12rem"
          type="text"
          name="grade"
          typeOfField="selectField"
          selectOptions={patsGrade}
          value={values.grade}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.grade && touched.grade && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.grade}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Catégories"
          typeOfField="selectField"
          labelWidth="30%"
          inputWidth="12rem"
          type="text"
          name="categorie"
          selectOptions={categories}
          value={values.categorie}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.categorie && touched.categorie && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.categorie}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Diplôme"
          typeOfField="selectField"
          labelWidth="30%"
          inputWidth="12rem"
          selectOptions={diplomesPats}
          name="diplome"
          value={values.diplome}
          onChange={handleChange}
          onBlur={handleBlur}
        />{" "}
        {errors.diplome && touched.diplome && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.diplome}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Date recrutement"
          labelWidth="30%"
          inputWidth="12rem"
          type="date"
          name="dateRecrutement"
          value={values.dateRecrutement}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.dateRecrutement && touched.dateRecrutement && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.dateRecrutement}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Spécialité"
          labelWidth="30%"
          inputWidth="12rem"
          name="specialite"
          value={values.specialite}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.specialite && touched.specialite && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.specialite}
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
          type="text"
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
          labelTitle="Mot de passe "
          labelWidth="30%"
          inputWidth="12rem"
          name="password"
          value={values.password}
          type="password"
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

export default PatsForm;
