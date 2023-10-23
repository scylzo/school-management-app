/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { CustomFormControl, FormBtn, Sidebar, Topbar } from "components";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { ClockLoader, ClipLoader } from "react-spinners";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasseStudent, generateAnonymat } from "redux/notesFeatures";
import { fetchEC, fetchSemestre, fetchUE } from "redux/scolariteFeatures";
import api from "services/api";
import MUIDataTable from "mui-datatables";
import AnonymatGeneratedForm from "./AnonymatGeneratedForm";

const categories = ["DEVOIR", "EXAMEN", "TP"];

const anonymatSchema = yup.object().shape({
  categorie: yup.string().required("Champ obligatoire"),
  semestre: yup.string().required("Champ obligatoire"),
});

export const DisplayNotesForm = () => {
  const [toggle, setToggle] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const semestre = useSelector((state) => state.semestre);
  const classeStudents = useSelector((state) => state.classeStudent);
  const createAnonymat = useSelector((state) => state.generateAnomymat);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const [anonymatData, setAnonymatData] = useState([]);
  const [loader, setLoader] = useState(null);

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

  const getAllAnonymat = () => {
    setLoader(<ClockLoader color="#e95060" />);
    const anonymatSemestreId = localStorage.getItem("anonymatSemestreId");
    const anonymatCat = localStorage.getItem("anonymatCat");
    api
      .getListeAnonymat({
        Cycle: anAcad,
        classprofId: classId,
        semestreId: anonymatSemestreId,
        categorie: anonymatCat,
      })
      .then((res) => {
        if (res) {
          setLoader(null);
          setAnonymatData(res.data);
        }
      });
  };

  const onSubmit = async (values, actions) => {
    let notesToSend = classeStudents?.data?.map((item) => {
      const unique_id = Math.floor(Math.random() * (999 - 1 + 1)) + 1;
      const newNotes = {
        categorie: values?.categorie,
        Cycle: anAcad,
        classprofId: classId,
        userId: item?.user?.id,
        semestreId: values?.semestre,
        numeroAnonymat: unique_id,
      };
      return newNotes;
    });
    localStorage.setItem("anonymatEcId", values?.ec);
    localStorage.setItem("anonymatSemestreId", values?.semestre);
    localStorage.setItem("anonymatUeId", values?.ue);
    localStorage.setItem("anonymatCat", values?.categorie);
    dispatch(generateAnonymat(notesToSend));

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
      categorie: "",
      semestre: "",
    },
    validationSchema: anonymatSchema,
    onSubmit,
  });

  const anonymatColumn = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Nom & Prénom",
      name: "nom",
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
      name: "Matricule",
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
      label: "N° Anonymat",
      name: "numeroAnonymat",
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
          <Box display={"flex"}>
            <Topbar
              currentViewTitle={`USSD > Administration > Notes > Classe  > ${params?.id}`}
              afficheSearchInput={false}
              afficherBtn={false}
            />

            <FormBtn
              onClick={() =>
                navigate(
                  `/app/administration/notes-et-evaluations/etudiants/${params?.id}`
                )
              }
              buttonText="Classe "
              bgNormalColor="#C74040"
              margin_="0 10px"
              width_="10%"
            />
            <FormBtn
              onClick={() =>
                navigate(
                  `/app/administration/notes-et-evaluations/etudiants/${params?.id}/saisie-notes`
                )
              }
              buttonText="Notes"
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
          <Box display="flex" justifyContent="space-between" gap={2.5}>
            <Box className="DisplayForm" style={{ width: "50%" }}>
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  mt={5}
                  bgcolor="#fff"
                  p={2}
                  pl={2}
                  borderRadius={8}
                >
                  <Box
                    width={"65%"}
                    display="flex"
                    justifyContent="flex-start"
                    flexDirection={"column"}
                    gap={2}
                  >
                    <Box display={"flex"} flexDirection="column">
                      <CustomFormControl
                        labelTitle="Catégorie"
                        fontWeight="800"
                        labelWidth="30%"
                        inputWidth="12rem"
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
                              left: "9.5rem",
                            }}
                          >
                            {errors.categorie}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box display={"flex"} flexDirection="column">
                      <CustomFormControl
                        labelTitle="Semestre"
                        fontWeight="800"
                        labelWidth="30%"
                        inputWidth="12rem"
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
                              left: "9.5rem",
                            }}
                          >
                            {errors.semestre}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box display={"flex"} width="35%" pl={5}>
                    <FormBtn
                      disable={
                        isSubmitting || !isValid || createAnonymat.isSuccess
                      }
                      type="submit"
                      buttonText="Generer"
                      bgNormalColor="#43a81f"
                      margin_=""
                      width_="35%"
                    />
                    {createAnonymat.loading && <ClipLoader color="#36d7b7" />}
                    <FormBtn
                      type="button"
                      onClick={() => getAllAnonymat()}
                      buttonText="Aperçu"
                      bgNormalColor="#3c7628"
                      margin_="0 1rem"
                      width_="40%"
                    />
                  </Box>
                </Box>
              </form>

              <Box display={"flex"} mt={5}>
                <Box
                  style={{
                    background: "#fff",
                    padding: "15px",
                    borderRadius: "8px",
                    width: "100%",
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
                    {anonymatData[0]?.categorie}
                  </h1>
                  <Box display="flex" justifyContent={"center"} pt={1}>
                    {loader}
                  </Box>
                  <MUIDataTable
                    data={anonymatData}
                    columns={anonymatColumn}
                    options={options}
                  />
                </Box>
              </Box>
            </Box>
            <AnonymatGeneratedForm />
          </Box>
        </div>
      </div>
    </div>
  );
};
