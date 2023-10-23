/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ReactToPrint from "react-to-print";
import api from "services/api";
import ussdlogo from "../../assets/images/factureLogo.jpg";
import wadeSignature from "../../assets/images/SIGNATURESwade.png";
import { Sidebar } from "views";
import { Topbar } from "components";

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

export const AttestationToPrint = () => {
  const componentRef = useRef();
  const [toggle, setToggle] = useState(false);
  const params = useParams();
  const [studentData, setStudentData] = useState();

  const attestationCycle = localStorage.getItem("CycleAttestation");

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      api
        .getStudentAttestation({ Cycle: attestationCycle, userId: params?.id })
        .then((res) => {
          if (res) setStudentData(res?.data[0]);
        });
    }
    return () => {
      isCancelled = true;
    };
  }, [params?.id]);

  console.log(studentData);

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container" style={{ width: "100%" }}>
          <Topbar
            currentViewTitle={"USSD > Administration > Attestations"}
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
              <Box ref={componentRef} style={{ background: "#fff" }} p={3}>
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
                <Box style={{ textAlign: "center" }}>
                  {" "}
                  <img
                    style={{ transform: "scale(0.7)" }}
                    src={ussdlogo}
                    alt=""
                    srcset=""
                  />{" "}
                </Box>
                <h4 style={{ textAlign: "center", fontSize: "14px" }}>
                  SERVICE DE LA SCOLARITE ET DES EXAMENS
                </h4>
                {studentData ? (
                  <Box>
                    <h4
                      style={{
                        margin: "15px auto",
                        textAlign: "center",
                        fontSize: "14px",
                        textTransform: "uppercase",
                        width: "35%",
                        border: "2px solid black",
                        marginTop: 10,
                        marginBottom: 30,
                      }}
                    >
                      {studentData?.totalCreditAnnuel === 60
                        ? "Attestation de réussite"
                        : studentData?.totalCreditAnnuel >= 42 &&
                          studentData?.totalCreditAnnuel < 60
                        ? "Attetation de passage conditionel"
                        : ""}
                    </h4>

                    {studentData?.totalCreditAnnuel < 42 ? (
                      <Typography
                        sx={{
                          fontSize: "30px",
                          textAlign: "center",
                          color: "red",
                        }}
                      >
                        Attestation pas disponible !!
                      </Typography>
                    ) : (
                      <>
                        <Typography sx={{ fontSize: "14px" }}>
                          Je soussigné, le chef du service de la scolarité et
                          des examens atteste que :
                        </Typography>
                        <Typography sx={{ fontSize: "12px", pt: 3 }}>
                          <ul>
                            <li style={{ listStyle: "none" }}>
                              Nom et Prénom : {studentData?.nom}
                            </li>
                            <li style={{ listStyle: "none" }}>
                              Née le : {studentData?.DOB}
                            </li>
                            <li style={{ listStyle: "none" }}>
                              A : {studentData?.lieu}
                            </li>
                          </ul>
                        </Typography>

                        <Typography sx={{ fontSize: "14px", pt: 3 }}>
                          A été declaré recu aux examens de{" "}
                          {studentData?.classe} pour l'année universitaire{" "}
                          {attestationCycle} avec{" "}
                          {studentData?.totalCreditAnnuel} crédits.
                        </Typography>
                        <Typography sx={{ fontSize: "14px", pt: 1 }}>
                          En foi de quoi, la présente attestation lui est
                          délivrée pour servir et valoir de ce que de droit
                        </Typography>

                        <Box
                          sx={{
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "flex-end",
                            flexDirection: "column",

                            pt: 3,
                          }}
                        >
                          <Box style={{ marginRight: "2.5rem" }}>
                            <Box> {certifDate}</Box>
                            <Box>Mme Aminata WADE</Box>
                          </Box>
                          <Box>
                            <img
                              src={wadeSignature}
                              style={{ transform: "scale(0.8)" }}
                            />{" "}
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      fontSize: "30px",
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    Attestation pas disponible !!
                  </Typography>
                )}
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
