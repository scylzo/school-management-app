/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  CustomFormControl,
  CustomInput,
  FormBtn,
  Sidebar,
  Topbar,
} from "components";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ClockLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasseStudent, updateNotes } from "redux/notesFeatures";
import { fetchEC, fetchSemestre, fetchUE } from "redux/scolariteFeatures";
import { useFormik } from "formik";
import api from "services/api";
import GenerateEmptyNoteData from "./GenerateEmptyNoteData";

const categories = ["DEVOIR", "EXAMEN", "TP"];

const anonymatSchema = yup.object().shape({
  ue: yup.string().required("Champ obligatoire"),
  ec: yup.string().required("Champ obligatoire"),
  categorie: yup.string().required("Champ obligatoire"),
  semestre: yup.string().required("Champ obligatoire"),
});

export const AddNotesForm = () => {
  const [toggle, setToggle] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const semestre = useSelector((state) => state.semestre);
  const ue = useSelector((state) => state.ue);
  const ec = useSelector((state) => state.ec);
  const classeStudents = useSelector((state) => state.classeStudent);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const anonymatEcId = localStorage.getItem("anonymatEcId");
  const anonymatSemestreId = localStorage.getItem("anonymatSemestreId");
  const anonymatUeId = localStorage.getItem("anonymatUeId");
  const anonymatCat = localStorage.getItem("anonymatCat");
  const [anonymatData, setAnonymatData] = useState();
  const [notesValues, setNotesValues] = useState();

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

  const getAllAnonymatWithoutGenerate = () => {
    api
      .getAllAnonymat({
        Cycle: anAcad,
        classprofId: classId,
        elementId: values.ec,
        matiereId: values.ue,
        semestreId: values.semestre,
        categorie: values.categorie,
      })
      .then((res) => {
        if (res) {
          setAnonymatData(res.data);
        }
      });
  };

  const getAllAnonymat = () => {
    const anonymatEcId = localStorage.getItem("anonymatEcId");
    const anonymatSemestreId = localStorage.getItem("anonymatSemestreId");
    const anonymatUeId = localStorage.getItem("anonymatUeId");
    const anonymatCat = localStorage.getItem("anonymatCat");
    api
      .getAllAnonymat({
        Cycle: anAcad,
        classprofId: classId,
        elementId: anonymatEcId,
        matiereId: anonymatUeId,
        semestreId: anonymatSemestreId,
        categorie: anonymatCat,
      })
      .then((res) => {
        if (res) {
          setAnonymatData(res.data);
        }
      });
  };

  const handleChangeNote = (event) => {
    setNotesValues({
      ...notesValues,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    let allNotes = [];
    event.preventDefault();
    for (const key in notesValues) {
      anonymatData.map((item) => {
        if (item.user.Matricule === key) {
          const newNote = {
            categorie: anonymatCat,
            note: notesValues[key],
            matiereId: anonymatUeId,
            elementId: anonymatEcId,
            semestreId: anonymatSemestreId,
            Cycle: anAcad,
            classprofId: classId,
            userId: item.userId,
            id: item?.id,
          };
          allNotes.push(newNote);
          return;
        }
      });
    }
    dispatch(updateNotes(allNotes));
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
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div
          className="main-container"
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Box display={"flex"}>
            <Topbar
              currentViewTitle={`USSD > Administration > Notes > Classe  > ${params?.id}`}
              afficheSearchInput={false}
              afficherBtn={false}
            />
            <FormBtn
              onClick={() =>
                navigate(
                  `/app/administration/notes-et-evaluations/etudiants/${params?.id}/generer-anonymat`
                )
              }
              buttonText="Anonymat"
              bgNormalColor="#C74040"
              margin_="0 10px"
              width_="10%"
            />
            <FormBtn
              onClick={() =>
                navigate(
                  `/app/administration/notes-et-evaluations/etudiants/${params?.id}`
                )
              }
              buttonText="Classe"
              bgNormalColor="#C74040"
              margin_="0 10px"
              width_="10%"
            />
            <FormBtn
              onClick={() =>
                navigate(
                  `/app/administration/notes-et-evaluations/pv/${params?.id}`
                )
              }
              buttonText="Pv"
              bgNormalColor="#C74040"
              margin_=""
              width_="10%"
            />
          </Box>
          <Box display={"flex"} gap={2}>
            <Box width={"43%"} sx={{ marginTop: "40px" }}>
              <GenerateEmptyNoteData getAllAnonymat={getAllAnonymat} />
            </Box>

            <Box
              width={"60%"}
              bgcolor={"#fff"}
              mt={5}
              p={2}
              pl={2}
              borderRadius={8}
            >
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Box
                  pl={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box>
                    {" "}
                    <Box display="flex" mb={3}>
                      <Box
                        display={"flex"}
                        flexDirection="column"
                        width={"100%"}
                      >
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
                      <Box
                        display={"flex"}
                        flexDirection="column"
                        width={"100%"}
                      >
                        <CustomFormControl
                          labelTitle="Catégorie"
                          fontWeight="800"
                          labelWidth="28%"
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
                  <Box display={"flex"} flexDirection={"column"} pl={1}>
                    <FormBtn
                      disable={isSubmitting || !isValid}
                      type="submit"
                      onClick={() => getAllAnonymatWithoutGenerate()}
                      buttonText="Afficher classe"
                      bgNormalColor="#3c7628"
                      width_="100%"
                    />
                    <FormBtn
                      onClick={() => window.location.reload()}
                      buttonText="Terminer"
                      bgNormalColor="#C74040"
                      width_="40%"
                    />
                  </Box>
                </Box>
              </form>
              <Box
                style={{
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "8px",
                  marginTop: "2rem",
                }}
              >
                <h1
                  style={{
                    borderBottom: "1px solid #F0F5F8",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#393939",
                    padding: "5px 0",
                  }}
                >
                  {values?.categorie}
                </h1>
                <Box display={"flex"} gap="1rem" mt={2} alignItems="center">
                  {" "}
                  <Typography
                    style={{ color: "#393939", fontSize: "12px", width: "43%" }}
                  >
                    Nom & Prénom
                  </Typography>{" "}
                  <Typography
                    style={{
                      color: "#393939",
                      fontSize: "12px",
                      width: "16%",
                      textAlign: "left",
                    }}
                  >
                    Matricule
                  </Typography>{" "}
                  <Typography
                    style={{ color: "#393939", fontSize: "12px", width: "20%" }}
                  >
                    Anonymat
                  </Typography>{" "}
                  <Typography
                    style={{ color: "#393939", fontSize: "12px", width: "15%" }}
                  >
                    Note
                  </Typography>{" "}
                </Box>
                <form onSubmit={onSubmit}>
                  {classeStudents?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <>
                      {anonymatData?.map((note) => {
                        if (note.categorie === values?.categorie) {
                          return (
                            <Box display={"flex"} mt={2} alignItems="center">
                              {" "}
                              <Typography
                                style={{
                                  color: "#68727B",
                                  fontSize: "10px",
                                  textAlign: "left",
                                  width: "45%",
                                }}
                              >
                                {note?.user?.nom}
                              </Typography>{" "}
                              <Typography
                                style={{
                                  color: "#68727B",
                                  fontSize: "10px",
                                  textAlign: "left",
                                  width: "18%",
                                }}
                              >
                                {note?.user?.Matricule}
                              </Typography>{" "}
                              <Typography
                                style={{
                                  color: "#68727B",
                                  fontSize: "10px",
                                  textAlign: "left",
                                  width: "18%",
                                }}
                              >
                                {note?.numeroAnonymat}
                              </Typography>{" "}
                              <Typography
                                style={{
                                  color: "#68727B",
                                  fontSize: "10px",
                                  textAlign: "left",
                                  width: "17%",
                                  display: "flex",
                                }}
                              >
                                {" "}
                                <CustomInput
                                  name={note?.user?.Matricule}
                                  onChange={handleChangeNote}
                                />
                                <Typography
                                  fontSize={11}
                                  fontWeight="600"
                                  mt="10px"
                                  ml={1}
                                >
                                  <span style={{ color: "green" }}>
                                    {note?.note}
                                  </span>
                                  /20
                                </Typography>
                              </Typography>
                            </Box>
                          );
                        } else
                          return (
                            <Box display={"flex"} mt={2} alignItems="center">
                              {" "}
                              <Typography
                                style={{
                                  color: "#68727B",
                                  fontSize: "10px",
                                  textAlign: "left",
                                  width: "45%",
                                }}
                              >
                                {note?.user?.nom}
                              </Typography>{" "}
                              <Typography
                                style={{
                                  color: "#68727B",
                                  fontSize: "10px",
                                  textAlign: "left",
                                  width: "18%",
                                }}
                              >
                                {note?.user?.Matricule}
                              </Typography>{" "}
                              <Typography
                                style={{
                                  color: "#68727B",
                                  fontSize: "10px",
                                  textAlign: "left",
                                  width: "18%",
                                }}
                              >
                                {note?.numeroAnonymat}
                              </Typography>{" "}
                              <Typography
                                style={{
                                  color: "#68727B",
                                  fontSize: "10px",
                                  textAlign: "left",
                                  width: "17%",
                                  display: "flex",
                                }}
                              >
                                {" "}
                                <CustomInput
                                  name={note?.user?.Matricule}
                                  onChange={handleChangeNote}
                                />
                                <Typography
                                  fontSize={11}
                                  fontWeight="600"
                                  mt="10px"
                                  ml={1}
                                >
                                  <span style={{ color: "green" }}>
                                    {note?.note}
                                  </span>
                                  /20
                                </Typography>
                              </Typography>
                            </Box>
                          );
                      })}
                    </>
                  )}
                  <Box display="flex" justifyContent="center" gap="2rem" mt={5}>
                    <FormBtn
                      type="submit"
                      buttonText="Enregistrer"
                      bgNormalColor="#43A81F"
                      margin_=""
                      width_="30%"
                    />
                    <FormBtn
                      onClick={() => window.location.reload()}
                      buttonText="Annuler"
                      bgNormalColor="#C74040"
                      margin_=""
                      width_="30%"
                    />
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
