/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import ReactToPrint from "react-to-print";
import api from "services/api";
import ussdlogo from "../../assets/images/factureLogo.jpg";

import signature from "../../assets/images/SIGNATURESndir.png";
import { Sidebar } from "views";
import { Topbar } from "components";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchpaymentById } from "redux/paymentFeatures";

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

export const DocumentEtudiantFacture = () => {
  const componentRef = useRef();
  const [toggle, setToggle] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const paymentById = useSelector((state) => state.paymentById);
  const [studentData, setStudentData] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchpaymentById(params?.id));
      api.getUserById(params.id).then((res) => {
        if (res) setStudentData(res.data);
      });
    }
    return () => {
      isCancelled = true;
    };
  }, [params?.id]);

  function createData(name, designation, montant) {
    return { name, designation, montant };
  }

  const rows = [
    createData("Frais d'inscription administrative", "100.000"),
    createData("Frais pédagogiques annuels", "2.800.000"),
    createData(
      "Visite médicale, assurance scolaire et adhésion à l'amicale des étudiants",
      "20.000"
    ),
    createData("TOTAL", "2.920.000"),
  ];

  const allPayments = (name, date, mois, montant) => {
    return { name, date, mois, montant };
  };

  const rows_ = paymentById?.data?.paiements?.map((item) => {
    const motifs = item.tarifications.map((item) => {
      return `${" "} ${item?.mois}`;
    });

    return allPayments(item.date, motifs, item.montant);
  });

  return (
    <>
      <div className="div-container">
        <div className={toggle ? "sidebar close" : "sidebar"}>
          <Sidebar toggleAction={() => setToggle(!toggle)} />
        </div>
        <div className="content-wrapper">
          <div className="main-container" style={{ width: "100%" }}>
            <Topbar
              currentViewTitle={`USSD > Administration > Facture >   ${studentData?.nom}`}
              afficherBtn={false}
            />
            <div
              className="main-content"
              style={{ width: "60%", margin: "20px auto" }}
            >
              <Box>
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
                <Box
                  ref={componentRef}
                  style={{ background: "#fff" }}
                  p={3}
                  className="paiement-facture-container"
                >
                  <h1
                    style={{
                      textTransform: "uppercase",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: 500,
                    }}
                  >
                    Université des sciences de la santé de dakar
                  </h1>
                  <h4 style={{ textAlign: "center", fontSize: "10px" }}>
                    Avenue Birago Diop x 5, Point E, Tel : 33 8590131 Email :
                    universitesciencesante.com
                  </h4>
                  <Box style={{ textAlign: "center", maxHeight: "8.5rem" }}>
                    <img
                      style={{ transform: "scale(0.7)" }}
                      src={ussdlogo}
                      alt=""
                      srcset=""
                    />{" "}
                  </Box>
                  <h4
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      textTransform: "uppercase",
                      paddingLeft: "8px",
                    }}
                  >
                    Facture
                  </h4>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      pt: 3,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ul>
                      <li style={{ listStyle: "none" }}>
                        Nom et Prénom : {studentData?.nom}
                      </li>
                      <li style={{ listStyle: "none" }}>
                        Né(e) le :{" "}
                        <span>
                          {studentData?.date_naissance
                            ?.split("-")
                            .reverse()
                            .join("/")}{" "}
                          à {studentData?.lieu_naissance}
                        </span>
                      </li>
                    </ul>
                    <p style={{ fontWeight: "bolder" }}> {certifDate} </p>
                  </Typography>

                  <Box>
                    <h3
                      style={{
                        fontWeight: 400,
                        fontSize: "15px",
                        textAlign: "center",
                        textTransform: "uppercase",
                      }}
                    >
                      Rappel du coût global de la formation
                    </h3>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">DESIGNATION</TableCell>
                            <TableCell align="left">
                              MONTANT TOTAL EN (FCFA)
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="left">
                                {row.designation}
                              </TableCell>
                              <TableCell align="left">{row.montant}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      <h3
                        style={{
                          fontWeight: 400,
                          fontSize: "15px",
                          textAlign: "center",
                          textTransform: "uppercase",
                        }}
                      >
                        PAIEMENTS DÉJÀ EFFECTUÉS
                      </h3>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">DATE</TableCell>
                            <TableCell align="left">MOTIF PAIEMENT</TableCell>
                            <TableCell align="left">MONTANT</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_?.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="left">{row.date}</TableCell>
                              <TableCell align="left">{row.mois}</TableCell>
                              <TableCell align="left">{row.montant}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Box
                              pt={2}
                              fontSize="12px"
                              sx={{
                                color: "#68727b",
                                fontFamily: ["Roboto", "sans-serif"].join(","),
                              }}
                            >
                              {" "}
                              Montant restant :
                              {`${2920000 - paymentById?.data?.total} frc`}{" "}
                            </Box>
                            <Box>
                              <Typography
                                fontSize={12}
                                fontWeight={"bold"}
                                pl={1}
                              >
                                Le Recteur
                              </Typography>
                              <img
                                style={{ height: "100px" }}
                                src={signature}
                                alt=""
                                srcset=""
                              />{" "}
                            </Box>
                          </Box>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
