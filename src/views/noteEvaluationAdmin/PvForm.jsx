/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Sidebar, Topbar } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchClasseStudent } from "redux/notesFeatures";
import { Box, Typography } from "@mui/material";
import api from "services/api";
import MUIDataTable from "mui-datatables";
import { ClockLoader } from "react-spinners";
import Divider from "@mui/material/Divider";

export const PvForm = () => {
  const [toggle, setToggle] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const semestre = localStorage.getItem("semestreData");
  const semst = JSON.parse(semestre);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const [pv, setPvData] = useState();
  const [pvId, setPvId] = useState();
  const [loader, setLoader] = useState();

  const Cycle = anAcad;
  const classprofId = classId;
  const semestreId = semst?.id;

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      api.getPv({ Cycle, classprofId, semestreId }).then((res) => {
        setLoader(<ClockLoader color="#43a81f" />);
        if (res.data) {
          setLoader();
          setPvData(res.data);
        }
      });
      dispatch(fetchClasseStudent({ anAcad, classId }));
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const hadleRedirect = () => {
    navigate("pv-global");
  };

  const pvColumn = [
    {
      label: "Code",
      name: "id",
      options: {
        display: false,
      },
    },
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
      label: "Crédit",
      name: "Total_Credit",
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
      label: "Moyenne",
      name: "moyenne",
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
          return <td>{tableMeta.rowData[4]?.toString().substring(0, 4)}</td>;
        },
      },
    },
    {
      label: "Validation Semestre",
      name: "validation_semestre",
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
      name: "Action",
      label: "Action",
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
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <button
                type="button"
                style={{
                  background: "#eaf7d4",
                  padding: "3px 5px",
                  marginLeft: "5px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPvId(tableMeta.rowData[0]);
                  //   displayEditPer();
                }}
              >
                Voir notes
              </button>
            </>
          );
        },
      },
    },
  ];

  //mui options
  const options = {
    filterType: "textField",
    pagination: false,
    print: false,
    selectableRows: false,
    enableNestedDataAccess: ".",
    textLabels: {
      body: {
        noMatch: "Pas de données",
      },
    },
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
        <div className="main-container" style={{ width: "100%" }}>
          <Topbar
            currentViewTitle={`USSD > Administration > PV > Classe  > ${params.id} > ${semst?.name}`}
            afficherBtn={true}
            title="pv global"
            onClick={() => hadleRedirect()}
          />
          <h1 style={{ textAlign: "center" }}>
            PROCES VERBAL DE RECAPITULATION
          </h1>
          <Box display="flex" mt={2} gap="2rem" height={"100%"}>
            <Box
              style={{
                width: "60%",
                background: "#fff",
                borderRadius: "8px",
                padding: "15px",
              }}
            >
              {loader ? (
                <Box display="flex" justifyContent={"center"}>
                  {loader}
                </Box>
              ) : (
                <MUIDataTable data={pv} columns={pvColumn} options={options} />
              )}
            </Box>
            <Box
              style={{
                width: "40%",
                background: "#fff",
                borderRadius: "8px",
                padding: "15px",
              }}
            >
              <Box
                display="flex"
                flexDirection={"column"}
                sx={{
                  border: "1px solid #f6f6f6",
                  boxShadow: "var(--boxShadow)",
                  borderRadius: "12px",
                  padding: "1rem",
                }}
              >
                {pv?.map((item, index) => {
                  if (item?.id === pvId) {
                    return (
                      <Box key={index} display="flex" flexDirection={"column"}>
                        <Typography fontSize={"12px"} fontWeight={700}>
                          {" "}
                          Nom & Prénom : {item?.nom}{" "}
                        </Typography>
                        <Typography fontSize={"12px"} fontWeight={700} mb={2}>
                          {" "}
                          Matricule : {item?.Matricule}{" "}
                        </Typography>
                        {item?.matieres?.map((elt, index) => {
                          return (
                            <Box
                              key={index}
                              display="flex"
                              flexDirection={"column"}
                            >
                              <Typography
                                fontSize={"15px"}
                                fontWeight={600}
                                sx={{ color: "#43a81f" }}
                              >
                                UE : {elt?.nom_matiere} <br />
                                Crédits obtenus : {elt?.credit_obtenu} <br />
                                Moyenne UE :{" "}
                                {elt?.moyenneUE.toString().substring(0, 4)}
                              </Typography>

                              <Divider />
                              {elt.elements.map((element, index) => {
                                return (
                                  <Box key={index}>
                                    <Typography
                                      fontSize={"12px"}
                                      sx={{
                                        color: "#e95060",
                                        fontWeight: "600",
                                      }}
                                    >
                                      EC : {element.nom_element}
                                    </Typography>
                                    {element?.resultats?.map((res, index) => {
                                      return (
                                        <Box
                                          key={index}
                                          display="flex"
                                          flexDirection="column"
                                        >
                                          <Box>
                                            {" "}
                                            <Typography
                                              fontSize={"12px"}
                                              fontWeight="600"
                                            >
                                              {" "}
                                              Note {res.categorie} : {res.note}
                                            </Typography>{" "}
                                          </Box>{" "}
                                          <Box>
                                            <Typography
                                              fontSize={"12px"}
                                              fontWeight="600"
                                            >
                                              {" "}
                                              Pourcentage {res.categorie}:{" "}
                                              {res.percentage
                                                .toString()
                                                .substring(0, 4)}
                                            </Typography>{" "}
                                          </Box>
                                        </Box>
                                      );
                                    })}
                                    <Box>
                                      <Typography
                                        fontSize={"12px"}
                                        sx={{
                                          color: "#f58590",
                                          fontWeight: "800",
                                        }}
                                        fontWeight="600"
                                      >
                                        {" "}
                                        Moyenne EC :{" "}
                                        {element.average
                                          .toString()
                                          .substring(0, 4)}
                                      </Typography>{" "}
                                    </Box>
                                  </Box>
                                );
                              })}
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  }
                })}
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
