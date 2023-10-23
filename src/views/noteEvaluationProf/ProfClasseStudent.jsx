/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FormBtn, Sidebar, Topbar } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { ClockLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasseStudent } from "redux/notesFeatures";
import MUIDataTable from "mui-datatables";

export const ProfClasseStudent = () => {
  const [toggle, setToggle] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const classeStudents = useSelector((state) => state.classeStudent);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchClasseStudent({ anAcad, classId }));
    }
    return () => {
      isCancelled = true;
    };
  }, [classId]);

  const columnsClasseStudents = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Nom & prénom",
      name: "user.nom",
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
      label: "Email",
      name: "user.email",
      options: {
        display: false,

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
      label: "N° Tél",
      name: "user.tel_mobile",
      options: {
        display: false,
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
      label: "Sexe",
      name: "user.sexe",
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
      label: "Date admission",
      name: "Date_admission",
      options: {
        display: false,
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
    filter: false,
    viewColumns: false,
    pagination: false,
    textLabels: {
      body: {
        noMatch: "Pas de données",
      },
    },
    print: true,
    download: true,
    selectableRows: false,
    enableNestedDataAccess: ".",
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
                  `/app/professeur/notes-et-evaluations/saisie-notes/${params?.id}`
                )
              }
              buttonText="Notes"
              bgNormalColor="#C74040"
              margin_="0 10px"
              width_="10%"
            />
          </Box>
          <div className="main-content">
            <div className="div-area-main-content-elt">
              {classeStudents?.data?.loading ? (
                <Box display="flex" justifyContent="center" m={"1rem"}>
                  <ClockLoader color="#43a81f" />
                </Box>
              ) : (
                <MUIDataTable
                  data={classeStudents?.data}
                  columns={columnsClasseStudents}
                  options={options}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
