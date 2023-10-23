/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  CustomFileInput,
  CustomFormControl,
  FormBtn,
  Topbar,
} from "components";
import "./askAdmission.scss";
import { Sidebar } from "views";
import Notiflix from "notiflix";
import ReadMoreReact from "read-more-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudentAdmission,
  fetchAdmissionById,
} from "redux/admissionFeatures";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import { studentAdmissionSchema } from "validationSchemas";
import {
  fetchAnneeAcad,
  fetchClasse,
  fetchFiliere,
} from "redux/scolariteFeatures";

const lettre = `
Selon le réglement intérieur de l'Université des sciences de la sante de DAKAR (USSD),je m'engage : 
à ce que mes absences soient justifiées dans les délais fixés par l'établissement.
Quatre absences dûment constatées aux cours magistraux, aux séances de travaux pratiques et ou de travaux dirigés dans un élément constitutif, entraînent ma suspension lors des devoirs et examens semestriels sauf dérogation accordée par le Recteur de L'USSD aprés examen des justifications présentées.
`;

const minimumLength = 0;
const idealLength = 0;
const maxLength = 0;
const readMoreText = "Cliquez ici pour en lire plus";

//get the admission date
const date = new Date();
const admissionDate = date.toISOString();

export const AskAdmissionStudent = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userData"));
  const anneeAcad = useSelector((state) => state.anneeAcad);
  const niveauEtude = useSelector((state) => state.classe);
  const filiere = useSelector((state) => state.filiere);
  const [images, setImages] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const admissions = useSelector((state) => state.admissionById);
  const anAcad_ = anneeAcad?.data?.filter(
    (item) => item.annee_en_cours === "annee en cours"
  );

  const empAnAcad_ = anAcad_?.pop();
  const anAcad = empAnAcad_?.name;

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchAdmissionById({ studentId: user.id }));
      dispatch(fetchClasse());
      dispatch(fetchFiliere());
      dispatch(fetchAnneeAcad());
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const checkOfAdmissions = admissions.data.slice(-1).pop();
  const handleShowForm = () => {
    if (checkOfAdmissions?.Cycle === anAcad) {
      Notiflix.Notify.info(
        "Vous avez déja été admis a l'année académique en cours"
      );
    } else {
      setShowForm(!showForm);
    }
  };

  //handling notif images
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      setImages((prevImages) => [...prevImages, reader.result]);
    };
    files.forEach((file) => {
      setPictures([...pictures, file]);
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (values, actions) => {
    const email = user?.email;
    const nationalite = user?.nationalite;
    const sexe = user?.sexe;
    const utilisateur = user?.nom;
    const userId = user?.id;

    dispatch(
      addStudentAdmission({
        values,
        pictures,
        admissionDate,
        email,
        nationalite,
        sexe,
        utilisateur,
        userId,
      })
    );
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
      serie: "",
      mention: "",
      anneeObtention: "",
      lycee: "",
      facultyOurInstitute: "",
      periode: "",
      raison: "",
      niveauEtudeDemande: "",
      filiereDemande: "",
      acceptedTos: false,
    },
    validationSchema: studentAdmissionSchema,
    onSubmit,
  });

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container" style={{ width: "100%" }}>
          <Topbar
            currentViewTitle="USSD > Etudiant > Demande d'admission"
            afficherBtn={false}
          />
          <div className="main-content">
            <Box
              display={"flex"}
              justifyContent="space-between"
              pb={3}
              className="admission-state-container"
            >
              <Typography>
                {" "}
                Status Admisson :{" "}
                {checkOfAdmissions?.Statut === "EN ATTENTE" ? (
                  <span style={{ color: "orange" }}>EN ATTENTE</span>
                ) : checkOfAdmissions?.Statut === "VALIDER" ? (
                  <span style={{ color: "orange" }}>VALIDER</span>
                ) : (
                  "Pas encore admis"
                )}
              </Typography>
              <Button
                onClick={() => handleShowForm()}
                sx={{
                  background: "#e95060",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ fontSize: "12px", color: "#fff" }}>
                  {" "}
                  Afficher formulaire demande admission <br />
                  <span className="info">
                    utiliser un ordi pour une meilleur vue
                  </span>
                </Typography>
              </Button>
            </Box>
            <form onSubmit={handleSubmit} hidden={showForm}>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                style={{ width: "90%" }}
              >
                <Typography
                  sx={{
                    color: "rgb(177,187,198,100)",
                    fontWeight: "600",
                    fontFamily: ["Poppins", "sans-serif"].join(","),
                    fontSize: "12px",
                  }}
                >
                  Bac
                </Typography>
                <Box style={{ display: "flex", gap: "3rem" }}>
                  <Box display="flex" flexDirection="column">
                    <CustomFormControl
                      labelTitle="Série"
                      labelWidth="20%"
                      inputWidth="10rem"
                      placeholder="Baccalauréat série"
                      value={values.serie}
                      onChange={handleChange}
                      name="serie"
                      type="text"
                      onBlur={(event) => {
                        handleBlur(event);
                        handleShowForm(event);
                      }}
                    />

                    {errors.serie && touched.serie && (
                      <Box
                        sx={{
                          fontSize: "10px",
                          paddingLeft: "2.5rem",
                          color: "red",
                        }}
                      >
                        {errors.serie}
                      </Box>
                    )}
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <CustomFormControl
                      labelTitle="Mention"
                      labelWidth="25%"
                      inputWidth="13rem"
                      placeholder="Mention  au bac"
                      value={values.mention}
                      onChange={handleChange}
                      name="mention"
                      type="text"
                      onBlur={handleBlur}
                    />
                    {errors.mention && touched.mention && (
                      <Box
                        sx={{
                          fontSize: "10px",
                          paddingLeft: "3.6rem",
                          color: "red",
                        }}
                      >
                        {errors.mention}
                      </Box>
                    )}
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <CustomFormControl
                      labelTitle="Année d'obtention"
                      labelWidth="35%"
                      inputWidth="10rem"
                      placeholder="Année obtention bac"
                      value={values.anneeObtention}
                      onChange={handleChange}
                      name="anneeObtention"
                      type="text"
                      onBlur={handleBlur}
                    />
                    {errors.anneeObtention && touched.anneeObtention && (
                      <Box
                        sx={{
                          fontSize: "10px",
                          paddingLeft: "7rem",
                          color: "red",
                        }}
                      >
                        {errors.anneeObtention}
                      </Box>
                    )}
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <CustomFormControl
                      labelTitle="Lycée"
                      labelWidth="30%"
                      inputWidth="13rem"
                      placeholder="ancien lycée ou collège"
                      value={values.lycee}
                      onChange={handleChange}
                      name="lycee"
                      type="text"
                      onBlur={handleBlur}
                    />
                    {errors.lycee && touched.lycee && (
                      <Box
                        sx={{
                          fontSize: "10px",
                          paddingLeft: "5rem",
                          color: "red",
                        }}
                      >
                        {errors.lycee}
                      </Box>
                    )}
                  </Box>
                </Box>

                <Typography
                  sx={{
                    color: "rgb(177,187,198,100)",
                    fontWeight: "600",
                    fontFamily: ["Poppins", "sans-serif"].join(","),
                    fontSize: "12px",
                  }}
                >
                  Parcours
                </Typography>
                <Box style={{ display: "flex", gap: "2rem" }}>
                  <Box display="flex" flexDirection="column">
                    {" "}
                    <CustomFormControl
                      labelTitle="Faculté ou Institut"
                      labelWidth="30%"
                      inputWidth="14rem"
                      placeholder="Dernier faculté ou institut frequenté"
                      value={values.facultyOurInstitute}
                      onChange={handleChange}
                      name="facultyOurInstitute"
                      type="text"
                      onBlur={handleBlur}
                    />
                    {errors.facultyOurInstitute &&
                      touched.facultyOurInstitute && (
                        <Box
                          sx={{
                            fontSize: "10px",
                            paddingLeft: "7rem",
                            color: "red",
                          }}
                        >
                          {errors.facultyOurInstitute}
                        </Box>
                      )}
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <CustomFormControl
                      labelTitle="Période"
                      labelWidth="30%"
                      inputWidth="10rem"
                      placeholder="Exemple : 2019-2022"
                      value={values.periode}
                      onChange={handleChange}
                      name="periode"
                      type="text"
                      onBlur={handleBlur}
                    />
                    {errors.periode && touched.periode && (
                      <Box
                        sx={{
                          fontSize: "10px",
                          paddingLeft: "5rem",
                          color: "red",
                        }}
                      >
                        {errors.periode}
                      </Box>
                    )}
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <CustomFormControl
                      labelTitle="Raison"
                      labelWidth="25%"
                      inputWidth="13rem"
                      placeholder="pourquoi vous avez quitté ?"
                      value={values.raison}
                      onChange={handleChange}
                      name="raison"
                      type="text"
                      onBlur={handleBlur}
                    />
                    {errors.raison && touched.raison && (
                      <Box
                        sx={{
                          fontSize: "10px",
                          paddingLeft: "4rem",
                          color: "red",
                        }}
                      >
                        {errors.raison}
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box display="flex" gap="5rem">
                  <Box display="flex" flexDirection="column">
                    <CustomFormControl
                      labelTitle="Niveau d'étude demandé"
                      labelWidth="30%"
                      inputWidth="10rem"
                      selectOptionsFromApiClasse={niveauEtude.data}
                      typeOfField="selectField"
                      placeholder="Niveau d'étude demandé"
                      value={values.niveauEtudeDemande}
                      onChange={handleChange}
                      name="niveauEtudeDemande"
                      type="text"
                      onBlur={handleBlur}
                    />
                    {errors.niveauEtudeDemande &&
                      touched.niveauEtudeDemande && (
                        <Box
                          sx={{
                            fontSize: "10px",
                            paddingLeft: "6rem",
                            color: "red",
                          }}
                        >
                          {errors.niveauEtudeDemande}
                        </Box>
                      )}
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <CustomFormControl
                      labelTitle="Filière demandé"
                      labelWidth="30%"
                      inputWidth="10rem"
                      placeholder="Filére"
                      value={values.filiere}
                      typeOfField="selectField"
                      selectOptionsFromApiFiliere={filiere.data}
                      onChange={handleChange}
                      name="filiereDemande"
                      type="text"
                      onBlur={handleBlur}
                    />
                    {errors.raison && touched.raison && (
                      <Box
                        sx={{
                          fontSize: "10px",
                          paddingLeft: "4rem",
                          color: "red",
                        }}
                      >
                        {errors.raison}
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box display="flex" gap="10px">
                  <Box
                    style={{
                      borderRadius: "10px",
                      border: "1px dashed #B1BBC6",
                      display: "flex",
                      width: "10rem",
                    }}
                  >
                    <InputLabel
                      for="file-upload"
                      sx={{
                        fontFamily: ["Poppins", "sans-serif"].join(","),
                        fontSize: "10px",
                        whiteSpace: "normal",
                        width: "100%",
                        height: "40px",
                        paddingTop: "12px",
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "10px",
                      }}
                    >
                      Photo d'identité
                    </InputLabel>
                    {images[0] && (
                      <img
                        style={{ borderRadius: "10px" }}
                        width="70%"
                        height="70px"
                        src={images[0]}
                        alt="Preview"
                      />
                    )}
                  </Box>
                  <Box
                    style={{
                      borderRadius: "10px",
                      border: "1px dashed #B1BBC6",
                      display: "flex",
                      width: "10rem",
                    }}
                  >
                    <InputLabel
                      for="file-upload"
                      sx={{
                        fontFamily: ["Poppins", "sans-serif"].join(","),
                        fontSize: "10px",
                        whiteSpace: "normal",
                        width: "100%",
                        height: "40px",
                        paddingTop: "12px",
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "10px",
                      }}
                    >
                      Extrait de naissance
                    </InputLabel>
                    {images[1] && (
                      <img
                        style={{ borderRadius: "10px" }}
                        width="70%"
                        height="70px"
                        src={images[1]}
                        alt="Preview"
                      />
                    )}
                  </Box>
                  <Box
                    style={{
                      borderRadius: "10px",
                      border: "1px dashed #B1BBC6",
                      display: "flex",
                      width: "10rem",
                    }}
                  >
                    <InputLabel
                      for="file-upload"
                      sx={{
                        fontFamily: ["Poppins", "sans-serif"].join(","),
                        fontSize: "10px",
                        whiteSpace: "normal",
                        width: "100%",
                        height: "40px",
                        paddingTop: "12px",
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "10px",
                      }}
                    >
                      Diplôme
                    </InputLabel>
                    {images[2] && (
                      <img
                        style={{ borderRadius: "10px" }}
                        width="70%"
                        height="70px"
                        src={images[2]}
                        alt="Preview"
                      />
                    )}
                  </Box>
                  <Box
                    style={{
                      borderRadius: "10px",
                      border: "1px dashed #B1BBC6",
                      display: "flex",
                      width: "10rem",
                    }}
                  >
                    <InputLabel
                      for="file-upload"
                      sx={{
                        fontFamily: ["Poppins", "sans-serif"].join(","),
                        fontSize: "10px",
                        whiteSpace: "normal",
                        width: "100%",
                        height: "40px",
                        paddingTop: "12px",
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "10px",
                      }}
                    >
                      Relevé de note
                    </InputLabel>
                    {images[3] && (
                      <img
                        style={{ borderRadius: "10px" }}
                        height="70px"
                        width="70%"
                        src={images[3]}
                        alt="Preview"
                      />
                    )}
                  </Box>
                  <Box sx={{ paddingLeft: "15%" }} hidden={true}>
                    <CustomFileInput
                      className="readerId"
                      onChange={handleImageChange}
                      type="file"
                      titre="Ajouter document(s)"
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    paddingLeft: "15%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="acceptedTos"
                        type="checkbox"
                        sx={{
                          color: "#43a81f",
                          "&.Mui-checked": {
                            color: "#43a81f",
                          },
                        }}
                      />
                    }
                    sx={{
                      margin: 0,
                      fontSize: "20px",
                    }}
                  />
                  <FormLabel
                    component="legend"
                    sx={{
                      fontSize: "12px",
                      color: "#9FA9B2",
                      paddingRight: "1rem",
                      fontFamily: ["Poppins", "sans-serif"].join(","),
                    }}
                  >
                    Lettre d'engagement.
                  </FormLabel>
                  <ReadMoreReact
                    text={lettre}
                    min={minimumLength}
                    ideal={idealLength}
                    max={maxLength}
                    readMoreText={readMoreText}
                  />
                </Box>
                {errors.acceptedTos && (
                  <Box
                    sx={{
                      position: "relative",
                      fontSize: "10px",
                      top: "-1.3rem",
                      left: "12rem",
                      color: "red",
                    }}
                  >
                    {errors.acceptedTos}
                  </Box>
                )}
                <Box
                  display="flex"
                  justifyContent="center"
                  gap="2rem"
                  mt="1rem"
                >
                  <FormBtn
                    buttonText="Annuler"
                    bgNormalColor="#C74040"
                    margin_=""
                    width_="30%"
                  />
                  <FormBtn
                    type="submit"
                    disable={isSubmitting || !isValid || images.length < 4}
                    buttonText="Enregistrer"
                    bgNormalColor="#43A81F"
                    margin_=""
                    width_="30%"
                  />
                </Box>
              </Box>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
