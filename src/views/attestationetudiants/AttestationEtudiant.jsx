/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import "./attestationEtudiant.scss";
import ReactToPrint from "react-to-print";
import api from "services/api";
import ussdlogo from "../../assets/images/factureLogo.jpg";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import CallIcon from "@mui/icons-material/Call";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
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

export const AttestationEtudiant = () => {
  const componentRef = useRef();
  const [toggle, setToggle] = useState(false);
  const params = useParams();
  const [studentData, setStudentData] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      api.getUserById(params.id).then((res) => {
        if (res) setStudentData(res.data);
      });
    }
    return () => {
      isCancelled = true;
    };
  }, [params?.id]);

  const checkOfAdmissions = studentData?.admission?.slice(-1).pop();

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container" style={{ width: "100%" }}>
          <Topbar
            currentViewTitle={
              "USSD > Etudiant > Attestation de pré-inscription"
            }
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
                className="certificat-container"
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
                <Box display="flex" pt={7} justifyContent="space-between">
                  <Box style={{ textAlign: "center" }}>
                    {" "}
                    <img
                      style={{ transform: "scale(0.9)" }}
                      src={ussdlogo}
                      alt=""
                      srcset=""
                    />{" "}
                  </Box>
                  <Box>
                    <Box display={"flex"}>
                      {" "}
                      <DesktopWindowsOutlinedIcon
                        style={{ fontSize: "15px" }}
                      />
                      <Box pl={2}>
                        {" "}
                        <Typography sx={{ fontWeight: 300, fontSize: "12px" }}>
                          EMAIL : contact@universitesciencesante.com{" "}
                        </Typography>
                        <Typography sx={{ fontWeight: 300, fontSize: "12px" }}>
                          WEB : www.universitesciencesante.com{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display={"flex"} mt={1} mb={1}>
                      {" "}
                      <CallIcon style={{ fontSize: "15px" }} />
                      <Box pl={2}>
                        {" "}
                        <Box display={"flex"}>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "12px" }}
                          >
                            {" "}
                            TELEPHONE :
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 300,
                              fontSize: "12px",
                              pl: "10px",
                            }}
                          >
                            (221) 33 859 01 31 <br /> (221) 78 528 85 85{" "}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box display={"flex"}>
                      {" "}
                      <FmdGoodOutlinedIcon style={{ fontSize: "15px" }} />
                      <Box pl={2}>
                        {" "}
                        <Box display={"flex"}>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "12px" }}
                          >
                            {" "}
                            ADRESSE : Point E, rue Birago Diop x E, <br />
                            BP 15 326, CP 10 700, Dakar, Sénégal
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <h4
                  style={{
                    margin: "5rem auto 4rem",
                    textAlign: "center",
                    fontSize: "21px",
                    textTransform: "uppercase",
                    marginTop: 10,
                    marginBottom: 30,
                    fontFamily: ["Times"],
                  }}
                >
                  Certificat d'inscription
                </h4>
                <Typography sx={{ fontSize: "18px", fontFamily: ["Times"] }}>
                  Je soussigné, le chef du service de la scolarité et des
                  examens atteste que :
                </Typography>
                <Typography
                  sx={{ fontSize: "18px", pt: 3, fontFamily: ["Times"] }}
                >
                  <ul>
                    <li
                      style={{
                        listStyle: "none",
                        fontFamily: ["Times"],
                        fontWeight: "bolder",
                      }}
                    >
                      {studentData?.sexe === "Masculin" ? "Monsieur" : "Madame"}{" "}
                      :{" "}
                      <span
                        style={{
                          paddingLeft: "5rem",
                          fontFamily: ["Times"],
                          fontWeight: "bolder",
                          textTransform: "capitalize",
                        }}
                      >
                        {studentData?.nom}
                      </span>
                    </li>
                    <li
                      style={{
                        listStyle: "none",
                        fontFamily: ["Times"],
                        fontWeight: "bolder",
                      }}
                    >
                      Né(e) le :{" "}
                      <span
                        style={{
                          paddingLeft: "6rem",
                          fontFamily: ["Times"],
                          fontWeight: "bolder",
                        }}
                      >
                        {studentData?.date_naissance
                          ?.split("-")
                          .reverse()
                          .join("/")}{" "}
                        à {studentData?.lieu_naissance}
                      </span>
                    </li>
                    <li
                      style={{
                        listStyle: "none",
                        fontFamily: ["Times"],
                        fontWeight: "bolder",
                      }}
                    >
                      Nationalité:{" "}
                      <span
                        style={{
                          paddingLeft: "4.5rem",
                          fontFamily: ["Times"],
                          fontWeight: "bolder",
                        }}
                      >
                        {" "}
                        {studentData?.nationalite}{" "}
                      </span>
                    </li>
                  </ul>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    pt: 5,
                    fontFamily: ["Times"],
                  }}
                >
                  Est régulièrement inscrit(e) en{" "}
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: ["Times"],
                      fontWeight: "bolder",
                    }}
                  >
                    {" "}
                    {checkOfAdmissions?.filiere_etude
                      ?.split("/")
                      .reverse("")
                      ?.join(" de ")}
                  </span>{" "}
                  à la dite faculté pour l'année universitaire{" "}
                  {checkOfAdmissions?.Cycle}.
                </Typography>

                <Typography
                  sx={{
                    fontSize: "18px",
                    pt: 1,
                    fontFamily: ["Times"],
                  }}
                >
                  Cette attestation lui est délivrée pour servir et valoir de ce
                  que de droit
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
                  <Typography>Mme Aminata WADE</Typography>
                  <Box>
                    <img src={wadeSignature} />{" "}
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
