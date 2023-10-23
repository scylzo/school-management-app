import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { CustomFormControl, FormBtn } from "components";
import { useFormik } from "formik";
import * as yup from "yup";
import { createNotes, fetchClasseStudent } from "redux/notesFeatures";
import { fetchEC, fetchSemestre, fetchUE } from "redux/scolariteFeatures";
import api from "services/api";

const categories = ["DEVOIR", "EXAMEN", "TP"];

const anonymatSchema = yup.object().shape({
  ue: yup.string().required("Champ obligatoire"),
  ec: yup.string().required("Champ obligatoire"),
  categorie: yup.string().required("Champ obligatoire"),
  semestre: yup.string().required("Champ obligatoire"),
});

export const GenerateEmptyNoteData = ({ getAllAnonymat }) => {
  const dispatch = useDispatch();
  const semestre = useSelector((state) => state.semestre);
  const ue = useSelector((state) => state.ue);
  const ec = useSelector((state) => state.ec);
  const classeStudents = useSelector((state) => state.classeStudent);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchClasseStudent({ anAcad, classId }));
      dispatch(fetchSemestre());
      dispatch(fetchUE());
      dispatch(fetchEC());
    }
    return () => {
      isCancelled = true;
    };
  }, [classId]);

  const handleUpload = (notesToSend) => {
    let progress = 0;
    const increment = 100 / 50; // montant à ajouter à la progression à chaque étape
    const interval = setInterval(() => {
      progress += increment;
      setPercentage(progress);

      if (progress >= 100) {
        clearInterval(interval);
      }

      if (progress === 100) {
        dispatch(createNotes(notesToSend));
      }
    }, 100); // Mettez à jour la progression toutes les 100 millisecondes
  };

  const onSubmit = async (values, actions) => {
    let notesToSend = classeStudents?.data?.map((item) => {
      const newNotes = {
        categorie: values?.categorie,
        note: "",
        matiereId: values?.ue,
        elementId: values?.ec,
        Cycle: anAcad,
        classprofId: classId,
        userId: item?.user?.id,
        semestreId: values?.semestre,
      };
      return newNotes;
    });
    localStorage.setItem("anonymatEcId", values?.ec);
    localStorage.setItem("anonymatSemestreId", values?.semestre);
    localStorage.setItem("anonymatUeId", values?.ue);
    localStorage.setItem("anonymatCat", values?.categorie);
    handleUpload(notesToSend);
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
      ue: "",
      ec: "",
      categorie: "",
      semestre: "",
    },
    validationSchema: anonymatSchema,
    onSubmit,
  });

  const filtredEc = ec?.data?.filter((item) => item?.matiereId === values.ue);

  return (
    <Box
      mb={5}
      display="flex"
      mt={5}
      bgcolor="#fff"
      p={2}
      pl={2}
      borderRadius={8}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={3}
        >
          <Box>
            {" "}
            <Box display="flex" mb={3}>
              <Box display={"flex"} flexDirection="column" width={"100%"}>
                <CustomFormControl
                  labelTitle="UE"
                  fontWeight="800"
                  labelWidth="30%"
                  inputWidth="10rem"
                  margin_=""
                  typeOfField="selectField"
                  value={values.ue}
                  selectOptionsFromApiUeId={ue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="ue"
                  type="text"
                />
                <Box>
                  {errors.ue && touched.ue && (
                    <Box
                      sx={{
                        fontSize: "10px",
                        color: "red",
                        position: "relative",
                        left: "5.5rem",
                      }}
                    >
                      {errors.ue}
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection="column"
                width={"100%"}
                ml={3}
              >
                <CustomFormControl
                  labelTitle="EC"
                  fontWeight="800"
                  labelWidth="30%"
                  inputWidth="10rem"
                  typeOfField="selectField"
                  value={values.ec}
                  selectOptionsFromApiEcFiltred={filtredEc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="ec"
                  type="text"
                />
                <Box>
                  {errors.ec && touched.ec && (
                    <Box
                      sx={{
                        fontSize: "10px",
                        color: "red",
                        position: "relative",
                        left: "5.5rem",
                      }}
                    >
                      {errors.ec}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Box display="flex">
              <Box display={"flex"} flexDirection="column" width={"100%"}>
                <CustomFormControl
                  labelTitle="Catégorie"
                  fontWeight="800"
                  labelWidth="30%"
                  inputWidth="10rem"
                  typeOfField="selectField"
                  value={values.categorie}
                  selectOptions={categories}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="categorie"
                  type="text"
                />
                <Box>
                  {errors.categorie && touched.categorie && (
                    <Box
                      sx={{
                        fontSize: "10px",
                        color: "red",
                        position: "relative",
                        left: "5.5rem",
                      }}
                    >
                      {errors.categorie}
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection="column"
                width={"100%"}
                ml={3}
              >
                <CustomFormControl
                  labelTitle="Semestre"
                  fontWeight="800"
                  labelWidth="30%"
                  inputWidth="10rem"
                  value={values.semestre}
                  typeOfField="selectField"
                  selectOptionsFromApiSemestre={semestre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="semestre"
                  type="text"
                />
                <Box>
                  {errors.semestre && touched.semestre && (
                    <Box
                      sx={{
                        fontSize: "10px",
                        color: "red",
                        position: "relative",
                        left: "5.5rem",
                      }}
                    >
                      {errors.semestre}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <FormBtn
              disable={isSubmitting || !isValid}
              type="submit"
              buttonText="Generer"
              bgNormalColor="#3c7628"
              margin_="0 1rem"
              width_="30%"
            />
            <FormBtn
              onClick={() => {
                getAllAnonymat();
              }}
              type="button"
              buttonText="Afficher"
              bgNormalColor="#765328"
              margin_="0 1rem"
              width_="30%"
            />
          </Box>
          <Box display={"flex"} pl={5}>
            <CircularProgressbar
              minValue={0}
              maxValue={100}
              value={percentage}
              text={`
            ${percentage}%`}
            />
            ;
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default GenerateEmptyNoteData;
