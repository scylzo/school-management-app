import React, { useState } from "react";
import "./register.scss";
import { CustomFormControl, CustomButton } from "components";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ReadMoreReact from "read-more-react";
import { useFormik } from "formik";
import { registerSchema } from "validationSchemas";
import { useDispatch } from "react-redux";
import { register } from "redux/authFeatures";
import { countries, gender } from "services";

const lettre = `
Selon le réglement intérieur de l'Université des sciences de la sante de DAKAR (USSD),je m'engage : 
à ce que mes absences soient justifiées dans les délais fixés par l'établissement.
Quatre absences dûment constatées aux cours magistraux, aux séances de travaux pratiques et ou de travaux dirigés dans un élément constitutif, entraînent ma suspension lors des devoirs et examens semestriels sauf dérogation accordée par le Recteur de L'USSD aprés examen des justifications présentées.
`;

const minimumLength = 0;
const idealLength = 0;
const maxLength = 0;
const readMoreText = "Cliquez ici pour en lire plus";

export const Register = () => {
  const dispatch = useDispatch();
  const [steps, setSteps] = useState(1);

  const onSubmit = async (values, actions) => {
    const roles = ["etudiant"];
    dispatch(register({ values, roles }));
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

  //form stepper
  const handleSteps = () => {
    setSteps(steps + 1);
  };
  const handleStepsBack = () => {
    setSteps(steps - 1);
  };
  return (
    <div className="register-container">
      <div className="form-container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <div
            style={
              steps === 1
                ? {
                    display: "flex",
                    flexDirection: "column",
                  }
                : { display: "none" }
            }
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
                  marginLeft: "10px",
                }}
              >
                Primo
              </FormLabel>
              <Box
                sx={{
                  width: "12rem",
                  display: "flex",
                  justifyContent: "flex-start !important",
                  marginLeft: "12px",
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
                    <span style={{ fontSize: "10px" }}>Nouveau</span>{" "}
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
                    <span style={{ fontSize: "10px" }}>Ancien</span>{" "}
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
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.nomPrenom}
              onChange={handleChange}
              name="nomPrenom"
              type="text"
              onBlur={handleBlur}
            />
            {errors.nomPrenom && touched.nomPrenom && (
              <Box
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.dateDeNaissance}
              onChange={handleChange}
              name="dateDeNaissance"
              type="date"
              onBlur={handleBlur}
            />
            {errors.dateDeNaissance && touched.dateDeNaissance && (
              <Box
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.cni}
              onChange={handleChange}
              name="cni"
              type="number"
              onBlur={handleBlur}
            />
            {errors.cni && touched.cni && (
              <Box
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
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
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.email}
              onChange={handleChange}
              name="email"
              type="email"
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <Box
                className="mode-res"
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
              labelTitle="Tél"
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.tel}
              onChange={handleChange}
              name="tel"
              type="number"
              onBlur={handleBlur}
            />
            {errors.tel && touched.tel && (
              <Box
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.adresseSenegal}
              onChange={handleChange}
              name="adresseSenegal"
              type="text"
              onBlur={handleBlur}
            />
            {errors.adresseSenegal && touched.adresseSenegal && (
              <Box
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.adressePaysOrigine}
              onChange={handleChange}
              name="adressePaysOrigine"
              type="text"
              onBlur={handleBlur}
            />
            {errors.adressePaysOrigine && touched.adressePaysOrigine && (
              <Box
                className="mode-res"
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
              typeOfField="selectField"
              selectOptions={countries}
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.nationalite}
              onChange={handleChange}
              name="nationalite"
              type="text"
              onBlur={handleBlur}
            />
            {errors.nationalite && touched.nationalite && (
              <Box
                className="mode-res"
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
          </div>
          <div
            style={
              steps === 2
                ? { display: "flex", flexDirection: "column" }
                : { display: "none" }
            }
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
                className="mode-res"
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
                className="mode-res"
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
                className="mode-res"
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
                className="mode-res"
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
                className="mode-res"
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
            {errors.adresseMere && touched.adresseMere && (
              <Box
                className="mode-res"
                sx={{
                  position: "relative",
                  fontSize: "10px",
                  top: "-15px",
                  left: "65px",
                  color: "red",
                }}
              >
                {errors.adresseMere}
              </Box>
            )}
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
                className="mode-res"
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
                className="mode-res"
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
          </div>
          <div
            style={
              steps === 3
                ? { display: "flex", flexDirection: "column" }
                : { display: "none" }
            }
          >
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
                className="mode-res"
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
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.username}
              onChange={handleChange}
              name="username"
              type="text"
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <Box
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.password}
              onChange={handleChange}
              name="password"
              type="password"
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <Box
                className="mode-res"
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
              labelWidth={"25%"}
              inputWidth={"12rem"}
              value={values.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              type="password"
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Box
                className="mode-res"
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
            <ReadMoreReact
              text={lettre}
              min={minimumLength}
              ideal={idealLength}
              max={maxLength}
              readMoreText={readMoreText}
            />
          </div>
          <Box display="flex" my={"1.5rem"}>
            <CustomButton
              type="button"
              fullWidth={undefined}
              width_={"40%"}
              bgHoverColor="#4e9a3361"
              bgNormalColor="#C74040"
              buttonText="Precedent"
              hidden={
                steps > 1
                  ? false
                  : steps > 2
                  ? false
                    ? steps > 3
                    : true
                  : true
              }
              onClick={() => {
                handleStepsBack();
              }}
            />
            <CustomButton
              disable={
                (steps === 1 &&
                  (values.nomPrenom === "" ||
                    values.primo === "" ||
                    values.cni === "" ||
                    values.dateDeNaissance === "" ||
                    values.nationalite === "" ||
                    values.adresse === "" ||
                    values.sexe === "" ||
                    values.email === "" ||
                    // values.lieuDeNaissance === "" ||
                    values.adresseSenegal === "" ||
                    values.adressePaysOrigine === "" ||
                    values.tel === "")) ||
                (steps === 2 &&
                  (values.nomPrenomPere === "" ||
                    values.adressePere === "" ||
                    values.telPere === "" ||
                    values.professionPere === "" ||
                    values.nomPrenomMere === "" ||
                    values.adresseMere === "" ||
                    values.telMere === "" ||
                    values.professionMere === ""))
              }
              type="button"
              fullWidth={undefined}
              width_={"40%"}
              bgHoverColor="#4e9a3361"
              bgNormalColor="#43a81f"
              buttonText="Suivant"
              hidden={steps < 3 ? false : true}
              onClick={() => {
                handleSteps();
              }}
            />
            <CustomButton
              type="button"
              fullWidth={undefined}
              width_={"40%"}
              bgHoverColor="#4e9a3361"
              bgNormalColor="#C74040"
              buttonText="Annuler"
              hidden={steps < 3 ? false : true}
              onClick={() => {
                window.location.href = "/";
              }}
            />
            <CustomButton
              type="submit"
              disable={isSubmitting || !isValid}
              fullWidth={undefined}
              width_={"40%"}
              bgHoverColor="#4e9a3361"
              bgNormalColor="#43a81f"
              buttonText="Soumettre"
              hidden={steps === 3 ? false : true}
            />
          </Box>
        </form>
      </div>
    </div>
  );
};
