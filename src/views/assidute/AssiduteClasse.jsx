/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { CustomFormControl, FormBtn, Sidebar, Topbar } from "components";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { ClockLoader } from "react-spinners";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import { fetchClasseStudent } from "redux/notesFeatures";
import { fetchEC } from "redux/scolariteFeatures";
import MUIDataTable from "mui-datatables";
import {
  addAssiduteAbsence,
  addAssiduteRetard,
  deleteAssidute,
} from "redux/assiduteFeatures";
import Notiflix from "notiflix";
import { tabStyle } from "views";
import api from "services/api";

const assiduteSchema = yup.object().shape({
  ec: yup.string().required("Champ obligatoire"),
});

let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();

const theDate = `${cYear}-${cMonth}-${cDay}`;

export const AssiduteClasse = () => {
  const [toggle, setToggle] = useState();
  const params = useParams();

  const dispatch = useDispatch();
  const ec = useSelector((state) => state.ec);
  const classeStudents = useSelector((state) => state.classeStudent);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const semestre = JSON.parse(localStorage.getItem("semestreData"));
  const [classeAttendance, setClasseAttendance] = useState([]);
  const [studentAttendances, setStudentAttendances] = useState([]);
  const [loader, setLoader] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchClasseStudent({ anAcad, classId }));
      dispatch(fetchEC());
    }
    return () => {
      isCancelled = true;
    };
  }, [classId]);

  const getClasseAllAttendance = () => {
    setLoader(<ClockLoader color="#43a81f" />);
    api
      .getClasseAssidute({
        classprofId: classId,
        semestreId: semestre?.id,
        cycle: anAcad,
      })
      .then((res) => {
        if (res?.data) {
          setLoader();
          setClasseAttendance(res?.data);
        }
      });
  };

  const getStudentAttendance = (id) => {
    setLoader(<ClockLoader color="#43a81f" />);
    api.getAssiduteByStudent(id).then((res) => {
      if (res?.data) {
        setLoader();
        setStudentAttendances(res?.data);
      }
    });
  };

  const onSubmit = async (values, actions) => {
    actions.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        ec: "",
      },
      validationSchema: assiduteSchema,
      onSubmit,
    });

  const addAttendanceAbsence = (body) => {
    const { studentId, categorie } = body;
    if (values?.ec) {
      dispatch(
        addAssiduteAbsence({
          date: theDate,
          categorie,
          ec: values?.ec,
          cycle: anAcad,
          userId: studentId,
          semestreId: semestre?.id,
          classprofId: classId,
        })
      );
    } else Notiflix.Notify.failure("Veuillez preciser le EC");
  };

  const addAttendanceRetard = (body) => {
    const { studentId, categorie } = body;
    if (values.ec) {
      dispatch(
        addAssiduteRetard({
          date: theDate,
          categorie,
          ec: values?.ec,
          cycle: anAcad,
          userId: studentId,
          semestreId: semestre?.id,
          classprofId: classId,
        })
      );
    } else Notiflix.Notify.failure("Veuillez preciser le EC");
  };

  //delete a payment
  const confirmDeleteAssidute = (assiduteId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir retirer?",
      "Confirmer",
      "Annuler",

      () => {
        dispatch(deleteAssidute(assiduteId));
      }
    );
  };

  const assiduteColumn = [
    { label: "Code", name: "userId", options: { display: false } },
    {
      label: "Nom & Prénom",
      name: "user.nom",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              style={{ color: "#1B2126", fontWeight: "700", fontSize: "10px" }}
            >
              {tableMeta.rowData[1]}
            </td>
          );
        },
      },
    },
    {
      label: "Matricule",
      name: "user.Matricule",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
      },
    },
    {
      label: "Absence/Retard",
      name: "Action",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <button
                type="button"
                style={{
                  background: "#F3F9F2",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  addAttendanceAbsence({
                    studentId: tableMeta.rowData[0],
                    categorie: "Absent",
                  });
                }}
              >
                Absent
              </button>
              <button
                type="button"
                style={{
                  background: "#eaf7d4",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  addAttendanceRetard({
                    studentId: tableMeta.rowData[0],
                    categorie: "En retard",
                  });
                }}
              >
                En Retard
              </button>
            </>
          );
        },
      },
    },
  ];
  const assiduteStudentsColumn = [
    { label: "Code", name: "userId", options: { display: false } },
    {
      label: "Nom & Prénom",
      name: "user.nom",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              style={{ color: "#1B2126", fontWeight: "700", fontSize: "10px" }}
            >
              {tableMeta.rowData[1]}
            </td>
          );
        },
      },
    },
    {
      label: "Select étudiant",
      name: "Action",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <button
                type="button"
                style={{
                  background: "#F3F9F2",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  getStudentAttendance(tableMeta.rowData[0]);
                }}
              >
                Assiduité
              </button>
            </>
          );
        },
      },
    },
  ];

  const classeAttendanceColumn = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Nom & Prénom",
      name: "user.nom",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              style={{ color: "#1B2126", fontWeight: "700", fontSize: "10px" }}
            >
              {tableMeta.rowData[1]}
            </td>
          );
        },
      },
    },
    {
      label: "Matricule",
      name: "user.Matricule",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
      },
    },
    {
      label: "Date",
      name: "date",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
      },
    },
    {
      label: "Cours",
      name: "ec",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
      },
    },
    {
      label: "Absence/Retard",
      name: "categorie",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              style={{ color: "#1B2126", fontWeight: "700", fontSize: "10px" }}
            >
              {tableMeta.rowData[5] === "Absent" && (
                <span style={{ color: "#e08d8d" }}>
                  {" "}
                  {tableMeta.rowData[5]}{" "}
                </span>
              )}
              {tableMeta.rowData[5] === "En retard" && (
                <span style={{ color: "#939372" }}>
                  {" "}
                  {tableMeta.rowData[5]}{" "}
                </span>
              )}
            </td>
          );
        },
      },
    },
    {
      name: "Action",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "12px",
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <button
                style={{
                  background: "#fdeeef",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => confirmDeleteAssidute(tableMeta.rowData[0])}
              >
                Supprimer
              </button>
            </>
          );
        },
      },
    },
  ];

  const studentAttendancesList = [
    {
      label: "Date",
      name: "date",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              style={{ color: "#1B2126", fontWeight: "700", fontSize: "10px" }}
            >
              {tableMeta.rowData[0]}
            </td>
          );
        },
      },
    },
    {
      label: "Cours",
      name: "ec",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
      },
    },
    {
      label: "Absence/Retard",
      name: "categorie",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              style={{ color: "#1B2126", fontWeight: "700", fontSize: "10px" }}
            >
              {tableMeta.rowData[2] === "Absent" && (
                <span style={{ color: "#e08d8d" }}>
                  {" "}
                  {tableMeta.rowData[2]}{" "}
                </span>
              )}
              {tableMeta.rowData[2] === "En retard" && (
                <span style={{ color: "#939372" }}>
                  {" "}
                  {tableMeta.rowData[2]}{" "}
                </span>
              )}
            </td>
          );
        },
      },
    },
  ];

  //mui options
  const options = {
    pagination: false,
    print: true,
    viewColumns: false,
    selectableRows: false,
    filter: false,
    textLabels: {
      body: {
        noMatch: "Pas de données",
      },
    },
    enableNestedDataAccess: ".",
    downloadOptions: {
      filename: "Ussd.csv",
      separator: ";",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
  };

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
          <Topbar
            currentViewTitle={`USSD > Administration > Assidutés > Classe  > ${params?.id}`}
            afficheSearchInput={false}
            afficherBtn={false}
          />

          <Box className="DisplayForm">
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                mt={5}
                bgcolor="#fff"
                p={2}
                pl={2}
                borderRadius={8}
              >
                <Box display={"flex"} flexDirection="column" width={"20%"}>
                  <CustomFormControl
                    labelTitle="Selectionner le EC"
                    fontWeight="800"
                    labelWidth="40%"
                    inputWidth="10rem"
                    typeOfField="selectField"
                    value={values.ec}
                    selectOptionsFromApiEc={ec}
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
            </form>
            <Box mt={2}>
              <Tabs
                aria-label="Basic tabs"
                defaultValue={0}
                sx={{
                  borderRadius: "lg",
                  p: "1rem",
                  pt: "2rem",
                }}
              >
                <TabList>
                  <Tab sx={tabStyle}>Ajouter Fiche de présence</Tab>
                  <Tab
                    sx={tabStyle}
                    onClick={() => {
                      getClasseAllAttendance();
                    }}
                  >
                    {" "}
                    Fiche de présence classe{" "}
                  </Tab>
                  <Tab sx={tabStyle}> Fiche de présence étudiant </Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2 }}>
                  <Box
                    style={{
                      background: "#fff",
                      padding: "15px",
                      borderRadius: "8px",

                      marginTop: "3rem",
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
                      {" "}
                      Cours : {values.ec}
                    </h1>

                    <Box>
                      {classeStudents?.loading ? (
                        <Box display="flex" justifyContent="center" m={"1rem"}>
                          <ClockLoader color="#43a81f" />
                        </Box>
                      ) : (
                        <>
                          <MUIDataTable
                            data={classeStudents?.data}
                            columns={assiduteColumn}
                            options={options}
                          />
                        </>
                      )}
                      <Box display={"flex"} justifyContent="flex-end" pt={6}>
                        {" "}
                        <FormBtn
                          onClick={() => window.location.reload()}
                          buttonText="Terminer"
                          bgNormalColor="#C74040"
                          margin_=""
                          width_="20%"
                        />
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={1} sx={{ p: 2 }}>
                  {loader && (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      {loader}
                    </Box>
                  )}

                  <MUIDataTable
                    data={classeAttendance}
                    columns={classeAttendanceColumn}
                    options={options}
                  />
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2 }}>
                  <Box display={"flex"} gap={6}>
                    <Box sx={{ width: "35%" }} borderRight="1px solid #e95060">
                      {classeStudents?.loading ? (
                        <Box display="flex" justifyContent="center" m={"1rem"}>
                          <ClockLoader color="#43a81f" />
                        </Box>
                      ) : (
                        <>
                          <h1
                            style={{
                              borderBottom: "1px solid #F0F5F8",
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#393939",
                              padding: "5px 0",
                            }}
                          >
                            {" "}
                            Listes des étudiant de la classe
                          </h1>
                          <MUIDataTable
                            data={classeStudents?.data}
                            columns={assiduteStudentsColumn}
                            options={options}
                          />
                        </>
                      )}
                    </Box>

                    <Box sx={{ width: "63%" }}>
                      {loader && (
                        <Box display="flex" justifyContent="center" m={"1rem"}>
                          {loader}
                        </Box>
                      )}

                      <MUIDataTable
                        data={studentAttendances}
                        columns={studentAttendancesList}
                        options={options}
                      />
                    </Box>
                  </Box>
                </TabPanel>
              </Tabs>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
