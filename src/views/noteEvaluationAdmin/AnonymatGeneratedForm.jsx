import React, { useState } from "react";
import api from "services/api";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { CustomFormControl, FormBtn } from "components";

const categories = ["DEVOIR", "EXAMEN", "TP"];

const anonymatSchema = yup.object().shape({
  categorie: yup.string().required("Champ obligatoire"),
  semestre: yup.string().required("Champ obligatoire"),
});

const AnonymatGeneratedForm = () => {
  const semestre = useSelector((state) => state.semestre);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const [anonymatData, setAnonymatData] = useState([]);
  const [loader, setLoader] = useState(null);

  const onSubmit = async (values, actions) => {
    setLoader(<ClockLoader color="#e95060" />);
    api
      .getListeAnonymat({
        Cycle: anAcad,
        classprofId: classId,
        semestreId: values?.semestre,
        categorie: values?.categorie,
      })
      .then((res) => {
        if (res) {
          setLoader(null);
          setAnonymatData(res.data);
        }
      });
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
    <Box className="DisplayForm" style={{ width: "50%" }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" mt={5} bgcolor="#fff" p={2} pl={2} borderRadius={8}>
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
                selectOptionsFromApiSemestre={semestre}
                typeOfField="selectField"
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
              disable={isSubmitting || !isValid}
              type="submit"
              buttonText="Voir N° Anonymat"
              bgNormalColor="#3c7628"
              padding_="5px 0"
              margin_="0 1rem"
              width_="100%"
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
            {" "}
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
  );
};

export default AnonymatGeneratedForm;
