/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";
import CloseIcon from "@mui/icons-material/Close";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { fetchStudents } from "redux/studentFeatures";
import Notiflix from "notiflix";
import { FormBtn } from "components";

Notiflix.Confirm.init({
  fontFamily: ["Poppins", "sans-serif"].join(","),
  titleColor: "red",
  messageColor: "#9fa9b2",
  okButtonBackground: "#43a81f",
  cancelButtonBackground: "#e95060",
  buttonsFontSize: "12px",
  position: "right-top",
});
const StudentList = ({ parentFirstName, parentLastName, parentId }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [parentId]);

  //get students
  const allStudents = data?.rows;

  //student data columns
  const columnsStudent = [
    { label: "Code", name: "id", options: { display: false } },
    {
      name: "nom",
      label: "Nom",
      sort: true,
      options: {
        // customHeadRender: (columnMeta) => (
        //   <th
        //     style={{
        //       textAlign: "left",
        //       cursor: "pointer",
        //       borderBottom: "1px solid #F0F5F8",
        //       color: "#B5BFC9",
        //       fontSize: "10px",
        //       fontWeight: 600,
        //     }}
        //   >
        //     {columnMeta.label}
        //   </th>
        // ),
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
      label: "Affectation",
      name: "parentId",
      options: {
        display: true,
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
          const id = tableMeta.rowData[2];
          if (id !== null) {
            return (
              <td style={{ color: "#1B2126", fontWeight: "700" }}>
                <SpellcheckIcon sx={{ color: "green" }} />
              </td>
            );
          } else
            return (
              <td style={{ color: "#1B2126", fontWeight: "700" }}>
                <CloseIcon sx={{ color: "red" }} />
              </td>
            );
        },
      },
    },
  ];

  //mui options
  const options = {
    filter: false,
    viewColumns: false,
    pagination: false,
    print: false,
    textLabels: {
      body: {
        noMatch: "Pas de données",
      },
    },
    download: false,
    selectableRows: false,
    enableNestedDataAccess: ".",
  };

  return (
    <>
      <div className="right-content" style={{ padding: "1rem" }}>
        {parentFirstName && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h1 style={{ fontSize: "14px" }}>
              Parent :{" "}
              <span style={{ color: "green" }}>
                {" "}
                {parentFirstName} {parentLastName}
              </span>
            </h1>
            <FormBtn
              onClick={() => window.location.reload(true)}
              buttonText="Annuler"
              bgNormalColor="#e95060"
              width_="20%"
            />
          </Box>
        )}
        {loading ? (
          <Box display="flex" justifyContent="center" m={"1rem"}>
            <ClockLoader color="#43a81f" />
          </Box>
        ) : (
          <MUIDataTable
            data={allStudents}
            columns={columnsStudent}
            options={options}
          />
        )}
      </div>
    </>
  );
};

export default StudentList;
