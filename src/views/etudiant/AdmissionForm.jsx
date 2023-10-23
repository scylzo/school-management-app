import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import { admissionSchema } from "validationSchemas";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import { CustomFileInput, CustomFormControl, FormBtn } from "components";
import {
  Box,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Typography,
} from "@mui/material";
import { TabPanel } from "@mui/joy";
import { medicalCheckStatus } from "services";
import { createAdmission, fetchAdmissionById } from "redux/admissionFeatures";
import { fetchClasse, fetchFiliere } from "redux/scolariteFeatures";
import api from "services/api";


//get the admission date
const date = new Date();
const admissionDate = date.toISOString();

const AdmissionForm = (studentId) => {
  const dispatch = useDispatch();
  const filiere = useSelector((state) => state.filiere);
  const niveauEtude = useSelector((state) => state.classe);
  const [images, setImages] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [studentData,setStudentData] = useState()

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchClasse());
      dispatch(fetchFiliere());
      dispatch(fetchAdmissionById(studentId));
      api.getUserById(studentId.studentId).then((res) => {
        if(res) {
          setStudentData(res?.data)
        }
      })
    }
    return () => {
      isCancelled = true;
    };
  }, []);



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
    const email = studentData?.email;
    const nationalite = studentData?.nationalite;
    const sexe = studentData?.sexe;
    const utilisateur = studentData?.nom;
    const userId = studentData?.id;
    dispatch(createAdmission({ values,pictures,admissionDate,email,
      nationalite,
      sexe,
      utilisateur,
      userId }));
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
      niveauEtude: "",
      niveauEtudeDemande:"",
      filiereDemande :"",
      filiere: "",
      medicalCheck: "",
      acceptedTos: false,
    },
    validationSchema: admissionSchema,
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
          Bac
        </Typography>
        <CustomFormControl
          labelTitle="Série"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="Baccalauréat série"
          value={values.serie}
          onChange={handleChange}
          name="serie"
          type="text"
          onBlur={handleBlur}
        />
        {errors.serie && touched.serie && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.serie}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Mention"
          labelWidth="30%"
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
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.mention}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Année d'obtention"
          labelWidth="30%"
          inputWidth="13rem"
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
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.anneeObtention}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Lycée"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="Dernier lycée ou collége "
          value={values.lycee}
          onChange={handleChange}
          name="lycee"
          type="text"
          onBlur={handleBlur}
        />
        {errors.lycee && touched.lycee && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.lycee}
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
          Parcours
        </Typography>
        <CustomFormControl
          labelTitle="Faculté ou Institut"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="Dernier faculté ou institut"
          value={values.facultyOurInstitute}
          onChange={handleChange}
          name="facultyOurInstitute"
          type="text"
          onBlur={handleBlur}
        />
        {errors.facultyOurInstitute && touched.facultyOurInstitute && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.facultyOurInstitute}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Période"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="Exemple : 2019"
          value={values.periode}
          onChange={handleChange}
          name="periode"
          type="text"
          onBlur={handleBlur}
        />
        {errors.periode && touched.periode && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.periode}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Raison"
          labelWidth="30%"
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
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.raison}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Niveau d'étude"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="Niveau d'étude"
          value={values.niveauEtude}
          selectOptionsFromApiNiveauEtude={niveauEtude.data}
          typeOfField="selectField"
          onChange={handleChange}
          name="niveauEtude"
          type="text"
          onBlur={handleBlur}
        />
        {errors.niveauEtude && touched.niveauEtude && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.niveauEtude}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Niveau d'étude demandé"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="Niveau d'étude"
          value={values.niveauEtudeDemande}
          selectOptionsFromApiNiveauEtude={niveauEtude.data}
          typeOfField="selectField"
          onChange={handleChange}
          name="niveauEtudeDemande"
          type="text"
          onBlur={handleBlur}
        />
        {errors.niveauEtudeDemande && touched.niveauEtudeDemande && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.niveauEtudeDemande}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Filière"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="Filére"
          value={values.filiere}
          typeOfField="selectField"
          selectOptionsFromApiFiliere={filiere.data}
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
        <CustomFormControl
          labelTitle="Filière demandée"
          labelWidth="30%"
          inputWidth="13rem"
          placeholder="Filére"
          value={values.filiereDemande}
          typeOfField="selectField"
          selectOptionsFromApiFiliere={filiere.data}
          onChange={handleChange}
          name="filiereDemande"
          type="text"
          onBlur={handleBlur}
        />
        {errors.filiereDemande && touched.filiereDemande && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.filiereDemande}
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
          Sante
        </Typography>
        <CustomFormControl
          labelTitle="Visite medical"
          labelWidth="30%"
          inputWidth="13rem"
          typeOfField="selectField"
          selectOptions={medicalCheckStatus}
          value={values.medicalCheck}
          onChange={handleChange}
          name="medicalCheck"
          type="text"
          onBlur={handleBlur}
        />
        {errors.medicalCheck && touched.medicalCheck && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.medicalCheck}
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
        <Box display="flex" flexDirection="column" gap="10px">
          <Box
            style={{
              borderRadius: "10px",
              border: "1px dashed #B1BBC6",
              display: "flex",
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
        </Box>
        <Box sx={{ paddingLeft: "15%" }} hidden={true}>
          <CustomFileInput
            className="readerId"
            onChange={handleImageChange}
            type="file"
            titre="Ajouter document(s)"
          />
        </Box>
        <Box
          sx={{
            paddingLeft: "15%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
              fontFamily: ["Poppins", "sans-serif"].join(","),
            }}
          >
            Lettre d'engagement.
          </FormLabel>
          {/* <ReadMoreReact
                            text={lettre}
                            min={minimumLength}
                            ideal={idealLength}
                            max={maxLength}
                            readMoreText={readMoreText}
                          /> */}
        </Box>
        {errors.acceptedTos && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "5rem",
              color: "red",
            }}
          >
            {errors.acceptedTos}
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
            disable={isSubmitting || !isValid || images.length < 4}
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

export default AdmissionForm;
