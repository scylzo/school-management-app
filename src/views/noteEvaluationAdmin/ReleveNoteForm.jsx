/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "./releve.scss";
import { Sidebar, Topbar } from "components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchClasseStudent } from "redux/notesFeatures";
import { Box, Typography, Button } from "@mui/material";
import ReactToPrint from "react-to-print";
import api from "services/api";
import MUIDataTable from "mui-datatables";
import { ClockLoader } from "react-spinners";
import logo from "../../assets/images/ussdlogo.png";
import wadeSignature from "../../assets/images/SIGNATURESwade.png";

const dateDays = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];
const dateDaysLitteral = new Date().getDate();
const theYears = new Date().getFullYear();
const theMounth = new Date().getMonth();
const certifDate = `Dakar, le ${dateDaysLitteral} ${dateDays[theMounth]} ${theYears}`;

export const ReleveNoteForm = () => {
  const [toggle, setToggle] = useState();
  const params = useParams();
  const componentRef = useRef();
  const dispatch = useDispatch();
  const semestre = localStorage.getItem("semestreData");
  const semst = JSON.parse(semestre);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const [pv, setPvData] = useState();
  const [releveDataArray, setReleveDataArray] = useState();
  const [releveNoteId, setReleveNoteId] = useState();
  const [loader, setLoader] = useState();

  const Cycle = anAcad;
  const classprofId = classId;
  const semestreId = semst?.id;

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      api.getReleveNote({ Cycle, classprofId }).then((res) => {
        setLoader(<ClockLoader color="#43a81f" />);
        if (res.data) {
          setLoader();
          console.log(res.data);
          setReleveDataArray(res.data);
        }
      });
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
                  setReleveNoteId(tableMeta.rowData[0]);
                }}
              >
                Releve de notes
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
            currentViewTitle={`USSD > Administration > Releve De Notes > Classe  > ${params.id}`}
            afficheSearchInput={false}
            afficherBtn={false}
          />
          <Box display="flex" mt={2} gap="2rem">
            <Box
              style={{
                width: "40%",
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
                width: "60%",
                background: "#fff",
                borderRadius: "8px",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {releveDataArray?.map((releveData) => {
                if (releveData.id === releveNoteId) {
                  return (
                    <>
                      <Box display={"flex"} justifyContent={"flex-end"}>
                        <ReactToPrint
                          trigger={() => (
                            <Button
                              sx={{
                                color: "#fff",
                                height: "30px",
                                borderRadius: "40px",
                                background: "#43a81f",
                                fontFamily: ["Poppins", "sans-serif"].join(","),
                                textTransform: "capitalize",
                                fontSize: "12px",
                                padding: "0 10px",
                              }}
                            >
                              Imprimer
                            </Button>
                          )}
                          content={() => componentRef.current}
                        />
                      </Box>

                      <Box className="to-print" ref={componentRef}>
                        <Box mb={1}>
                          <Typography
                            style={{
                              fontSize: "14px",
                              textTransform: "uppercase",
                              fontWeight: "500",
                            }}
                          >
                            Universite des sciences de la santé de dakar <br />
                            service de la scolarite et des examens <br />
                            Annee universitaire {Cycle} <br />
                            Releve de notes <br />
                            Nom : {releveData?.nom} <br />
                          </Typography>

                          <Typography
                            style={{
                              fontSize: "14px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-end",
                              fontWeight: "500",
                            }}
                          >
                            <span>
                              Né le :{" "}
                              {releveData?.DOB?.split("-").reverse().join("/")}{" "}
                            </span>
                            <div>Niveau : {params.id}</div>
                            <div style={{ position: "relative", top: "-10px" }}>
                              <img
                                style={{
                                  transform: "scale(1.5)",
                                  marginRight: "10px",
                                }}
                                src={logo}
                              />
                            </div>
                          </Typography>
                        </Box>
                        <Box className="releve-style">
                          <table>
                            <thead>
                              <tr>
                                <th rowspan="2">Semestre</th>
                                <th rowspan="2">UE</th>
                                <th rowspan="2">Crédits alloués</th>
                                <th colspan="5">Filière Medecine</th>
                              </tr>
                              <tr>
                                <th>EC</th>
                                <th>Note EC</th>
                                <th>Moyenne UE</th>
                                <th>Crédits obtenus</th>
                                <th>Validation Semestre</th>
                              </tr>
                            </thead>
                          </table>
                          <div>
                            {releveData?.semestres?.map((semestre, i) => {
                              return (
                                <>
                                  <div
                                    key={i}
                                    style={{ display: "flex" }}
                                    className="sem_iter"
                                  >
                                    <div className="sem_cell">
                                      {semestre.semestre}
                                    </div>
                                    <div className="ue_cell ue_cell1 ">
                                      {semestre.matieres.map((ue, i) => {
                                        return (
                                          <div
                                            key={i}
                                            className="ue_cell_inner"
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {ue.nom_matiere}{" "}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="ue_cell ue_cell2">
                                      {semestre.matieres.map((ue, i) => {
                                        return (
                                          <div
                                            className="ue_cell_inner"
                                            key={i}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {ue.credit}{" "}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="ue_cell ue_cell3">
                                      {semestre.matieres.map((ue, i) => {
                                        return (
                                          <div className="ue_cell_inner">
                                            {ue.elements.map((ec, i) => {
                                              return (
                                                <div
                                                  key={i}
                                                  className="ue_cell_inner_ec"
                                                >
                                                  {ec.nom_element}
                                                </div>
                                              );
                                            })}{" "}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="ue_cell ue_cell4">
                                      {semestre.matieres.map((ue, i) => {
                                        return (
                                          <div
                                            key={i}
                                            className="ue_cell_inner"
                                          >
                                            {ue.elements.map((ec, i) => {
                                              return (
                                                <div
                                                  index={i}
                                                  className="ue_cell_inner_ec"
                                                >
                                                  {ec.average
                                                    .toString()
                                                    .substring(0, 4)}
                                                </div>
                                              );
                                            })}{" "}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="ue_cell ue_cell5">
                                      {semestre.matieres?.map((ue, i) => {
                                        return (
                                          <div
                                            className="ue_cell_inner"
                                            key={i}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {ue.moyenneUE
                                              .toString()
                                              .substring(0, 4)}{" "}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="ue_cell ue_cell6">
                                      {semestre.matieres?.map((ue, i) => {
                                        return (
                                          <div
                                            className="ue_cell_inner"
                                            key={i}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {ue.credit_obtenu}{" "}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    <div className="sem_cell ue_cell7 sem_cell_last">
                                      {semestre.validation_semestre}
                                    </div>
                                  </div>
                                  <div className="total_semestre_cell">
                                    <div
                                      className="tl_sem_cell"
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      Total {semestre.semestre}
                                    </div>
                                    <div className="tl_sem_cell_empty"></div>
                                    <div
                                      className="tl_sem_cell_value"
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      {semestre.Total_Credit}
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div className="end_cells">
                            <div
                              className="ends_cells_title"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              Total Credit Annuel
                            </div>
                            <div className="ends_cells_empty"></div>
                            <div className="ends_cells_value">
                              {releveData?.totalCreditAnnuel}{" "}
                            </div>
                          </div>
                          <div className="end_cells">
                            <div
                              className="ends_cells_title"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              Credit Annuel manquant
                            </div>
                            <div className="ends_cells_empty"></div>
                            <div className="ends_cells_value">
                              {releveData?.CreditAnnuelManquant}{" "}
                            </div>
                          </div>
                          <div className="end_cells">
                            <div
                              className="ends_cells_title"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              Validation année
                            </div>
                            <div
                              className="ends_cells_empty"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "none",
                              }}
                            >
                              {" "}
                              {releveData?.ValidationAnnee}
                            </div>
                          </div>
                          <div className="end_cells">
                            <div
                              className="ends_cells_title"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              Resultat
                            </div>
                            <div
                              className="ends_cells_empty"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "none",
                              }}
                            >
                              {" "}
                              {releveData?.Resultats}
                            </div>
                          </div>
                          <Box
                            pb={5}
                            display={"flex"}
                            justifyContent={"space-between"}
                            mt={1}
                            mb={1}
                          >
                            <Typography
                              style={{
                                fontWeight: "600",
                                fontFamily: ["Times"],
                              }}
                            >
                              Fait à {certifDate}
                            </Typography>
                            <Box
                              display="flex"
                              justifyContent={"center"}
                              alignItems={"center"}
                              flexDirection={"column"}
                            >
                              <Typography
                                style={{
                                  fontWeight: "600",
                                  fontFamily: ["Times"],
                                  textDecoration: "underline",
                                }}
                              >
                                Responsable de la Scolarité et des Examens
                              </Typography>
                              <Box>
                                <img src={wadeSignature} />{" "}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                }
              })}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
