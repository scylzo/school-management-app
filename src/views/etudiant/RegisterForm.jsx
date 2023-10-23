import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "validationSchemas";
import { useDispatch } from "react-redux";
import { registerOther } from "redux/authFeatures";
import { TabPanel } from "@mui/joy";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { countries, gender } from "services";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const onSubmit = async (values, actions) => {
    const roles = ["etudiant"];
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
      dateDeNaissance: "",
      nationalite: "",
      adresseSenegal: "",
      adressePaysOrigine: "",
      primo: "",
      username: "",
      tel: "",
      sexe: "",
      lieuDeNaissance: "",
      email: "",
      password: "",
      confirmPassword: "",
      nomPrenomPere: "",
      adressePere: "",
      telPere: "",
      professionPere: "",
      nomPrenomMere: "",
      adresseMere: "",
      telMere: "",
      professionMere: "",
      nomPrenomTuteur: "",
      telTuteur: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <TabPanel
        value={0}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography
          sx={{
            color: "rgb(177,187,198,100)",
            fontWeight: "600",
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: "12px",
          }}
        >
          Info Personel
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <FormLabel
            component="legend"
            sx={{
              width: "25%",
              display: "flex",
              justifyContent: "flex-start",
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: "12px",
            }}
          >
            Primo
          </FormLabel>
          <Box
            sx={{
              width: "12rem",
              display: "flex",
              justifyContent: "flex-start !important",
              marginLeft: "25px",
            }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={values.primo}
              onChange={handleChange}
              name="primo"
              type="radio"
              onBlur={handleBlur}
            >
              <Box>
                <span style={{ fontSize: "10px", marginRight: "10px" }}>
                  Nouveau
                </span>{" "}
                <FormControlLabel
                  value="nouveau"
                  control={
                    <Radio
                      sx={{
                        color: "#43a81f",
                        "&.Mui-checked": {
                          color: "#43a81f",
                        },
                      }}
                    />
                  }
                />
              </Box>
              <Box>
                {" "}
                <span style={{ fontSize: "10px", marginRight: "10px" }}>
                  Ancien
                </span>{" "}
                <FormControlLabel
                  value="ancien"
                  control={
                    <Radio
                      sx={{
                        color: "#43a81f",
                        "&.Mui-checked": {
                          color: "#43a81f",
                        },
                      }}
                    />
                  }
                />
              </Box>
            </RadioGroup>
          </Box>
        </Box>
        {errors.primo && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.primo}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Nom & prenom"
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
          labelTitle="Date de naissance"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.dateDeNaissance}
          onChange={handleChange}
          name="dateDeNaissance"
          type="date"
          onBlur={handleBlur}
        />
        {errors.dateDeNaissance && touched.dateDeNaissance && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.dateDeNaissance}
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
          labelTitle="Sexe"
          labelWidth="30%"
          inputWidth="12rem"
          typeOfField="selectField"
          selectOptions={gender}
          value={values.sexe}
          onChange={handleChange}
          name="sexe"
          type="text"
          onBlur={handleBlur}
        />
        {errors.sexe && touched.sexe && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.sexe}
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
          labelTitle="Téléphone"
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
          labelTitle="Adresse au Sénégal"
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
        <CustomFormControl
          labelTitle="Adresse pays origine"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.adressePaysOrigine}
          onChange={handleChange}
          name="adressePaysOrigine"
          type="text"
          onBlur={handleBlur}
        />
        {errors.adressePaysOrigine && touched.adressePaysOrigine && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.adressePaysOrigine}
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
          labelTitle="Lieu de Naissance"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.lieuDeNaissance}
          onChange={handleChange}
          name="lieuDeNaissance"
          type="text"
          onBlur={handleBlur}
        />
        {errors.lieuDeNaissance && touched.lieuDeNaissance && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.lieuDeNaissance}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Adresse"
          labelWidth="30%"
          inputWidth="12rem"
        />
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
          labelTitle="Nom utilisateur"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.username}
          onChange={handleChange}
          name="username"
          type="text"
          onBlur={handleBlur}
        />
        {errors.username && touched.username && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
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
          value={values.password}
          onChange={handleChange}
          name="password"
          type="text"
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
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
          value={values.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="text"
          onBlur={handleBlur}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.confirmPassword}
          </Box>
        )}
      </TabPanel>
      <TabPanel
        value={1}
        sx={{
          p: 2,
          paddingTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography
          sx={{
            color: "rgb(177,187,198,100)",
            fontWeight: "600",
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: "12px",
          }}
        >
          Papa
        </Typography>
        <CustomFormControl
          labelTitle="Nom & prenom"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.nomPrenomPere}
          onChange={handleChange}
          name="nomPrenomPere"
          type="text"
          onBlur={handleBlur}
        />
        {errors.nomPrenomPere && touched.nomPrenomPere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.nomPrenomPere}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Adresse père"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.adressePere}
          onChange={handleChange}
          name="adressePere"
          type="text"
          onBlur={handleBlur}
        />
        {errors.adressePere && touched.adressePere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.adressePere}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Téléphone"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.telPere}
          onChange={handleChange}
          name="telPere"
          type="number"
          onBlur={handleBlur}
        />
        {errors.telPere && touched.telPere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.telPere}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Profession"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.professionPere}
          onChange={handleChange}
          name="professionPere"
          type="text"
          onBlur={handleBlur}
        />
        {errors.professionPere && touched.professionPere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.professionPere}
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
          Maman
        </Typography>
        <CustomFormControl
          labelTitle="Nom & prenom"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.nomPrenomMere}
          onChange={handleChange}
          name="nomPrenomMere"
          type="text"
          onBlur={handleBlur}
        />
        {errors.nomPrenomMere && touched.nomPrenomMere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.nomPrenomMere}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Adresse mère"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.adresseMere}
          onChange={handleChange}
          name="adresseMere"
          type="text"
          onBlur={handleBlur}
        />
        <CustomFormControl
          labelTitle="Téléphone"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.telMere}
          onChange={handleChange}
          name="telMere"
          type="number"
          onBlur={handleBlur}
        />
        {errors.telMere && touched.telMere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.telMere}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Profession"
          labelWidth="30%"
          inputWidth="12rem"
          value={values.professionMere}
          onChange={handleChange}
          name="professionMere"
          type="text"
          onBlur={handleBlur}
        />
        {errors.professionMere && touched.professionMere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.professionMere}
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
          Personne à contacter en cas d'urgence
        </Typography>
        <CustomFormControl
          labelTitle="Nom & prénom"
          labelWidth="25%"
          inputWidth="12rem"
          value={values.nomPrenomTuteur}
          onChange={handleChange}
          name="nomPrenomTuteur"
          type="text"
          onBlur={handleBlur}
        />
        {errors.nomPrenomTuteur && touched.nomPrenomTuteur && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.nomPrenomTuteur}
          </Box>
        )}

        <CustomFormControl
          labelTitle="Téléphone"
          labelWidth="25%"
          inputWidth="12rem"
          value={values.telTuteur}
          onChange={handleChange}
          name="telTuteur"
          type="number"
          onBlur={handleBlur}
        />
        {errors.telTuteur && touched.telTuteur && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "65px",
              color: "red",
            }}
          >
            {errors.telTuteur}
          </Box>
        )}

        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            buttonText="Annuler"
            bgNormalColor="#C74040"
            margin_=""
            width_="30%"
          />
          <FormBtn
            type="submit"
            disable={isSubmitting || !isValid}
            buttonText="Enregistrer"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
        </Box>
      </TabPanel>
    </form>
  );
};

export default RegisterForm;
