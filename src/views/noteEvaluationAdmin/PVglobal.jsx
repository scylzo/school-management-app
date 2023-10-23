import React, { useState, useRef, useEffect } from "react";
import "./pvglobal.scss";
import ReactToPrint from "react-to-print";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "services/api";

const PVglobal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const componentRef = useRef();
  const semestre = localStorage.getItem("semestreData");
  const semst = JSON.parse(semestre);
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const [pvGlobalData, setPvData] = useState();

  const Cycle = anAcad;
  const classprofId = classId;
  const semestreId = semst?.id;

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      api.getPvGlobal({ Cycle, classprofId, semestreId }).then((res) => {
        if (res.data) {
          setPvData(res.data);
        }
      });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Box padding={2} sx={{ width: "100%" }}>
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Button
          onClick={() => navigate(-1)}
          sx={{
            color: "#fff",
            height: "30px",
            borderRadius: "40px",
            background: "#e95060",
            fontFamily: ["Poppins", "sans-serif"].join(","),
            textTransform: "capitalize",
            fontSize: "12px",
            padding: "0 10px",
          }}
        >
          Retour
        </Button>
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
      <Box
        classNameName="to-print"
        ref={componentRef}
        sx={{ background: "#fff", padding: "1rem", overflowX: "auto" }}
      >
        <Box mb={1}>
          <Typography
            style={{
              fontSize: "14px",
              textTransform: "uppercase",
              fontWeight: "800",
              fontFamily: ["Times New Roman", "Times", "sans-serif"].join(","),
            }}
          >
            Universite des sciences de la santé de dakar <br />
            service de la scolarite et des examens <br />
            Annee universitaire {Cycle} <br />
            Examens du{" "}
            {semst?.name === "Semestre 1"
              ? "1er semestre"
              : "second semestre"}{" "}
            (1ère session) <br />
            {params?.id} <br />
          </Typography>
        </Box>
        <h2
          style={{
            fontWeight: "800",
            fontSize: "18px",
            fontFamily: ["Times New Roman", "Times", "sans-serif"].join(","),
            textAlign: "center",
          }}
        >
          PROCES VERBAL DE RECAPITULATION{" "}
        </h2>
        <Box className="pv-style">
          <table>
            <thead>
              <tr>
                <th
                  rowspan="3"
                  className="text-vertical"
                  style={{ paddingTop: "5px" }}
                >
                  N° Anonymat devoir
                </th>
                <th
                  rowspan="3"
                  className="text-vertical"
                  style={{ paddingTop: "5px" }}
                >
                  N° Anonymat examen
                </th>
                <th
                  rowspan="3"
                  className="text-vertical"
                  style={{ paddingTop: "5px" }}
                >
                  N° ordre
                </th>
                <th rowspan="3" className="th-pv-title">
                  <div style={{ width: "170px" }}>Nom et Prenom</div>
                </th>

                {pvGlobalData?.pvGlobalMatiere?.map((matiere, index) => {
                  if (matiere.tp) {
                    return (
                      <th
                        key={index}
                        rowspan="4"
                        className="th-pv-title"
                        style={{ padding: "0" }}
                      >
                        <Box display="flex">
                          {/* bloc left */}
                          <Box>
                            <Box
                              className="ec-text"
                              sx={{
                                borderBottom: "1px solid",
                                height: "54px",
                                borderRight: "1px solid  ",
                              }}
                            >
                              UE : {matiere.nom_matiere}
                            </Box>
                            <Box display={"flex"}>
                              {matiere.elements.map((element, index) => {
                                return (
                                  <Box display="flex">
                                    <Box
                                      sx={{ borderRight: "1px solid" }}
                                      key={index}
                                    >
                                      <Box
                                        key={"index"}
                                        className="ec-text"
                                        sx={{
                                          borderBottom: "1px solid",
                                          height: "39px",
                                        }}
                                      >
                                        {" "}
                                        EC : {element.nom_element}
                                      </Box>

                                      <Box display="flex">
                                        <td
                                          className="ec-text"
                                          style={{
                                            borderLeft: "none",
                                            borderRight: "none",
                                            borderTop: "none",
                                            borderBottom: "none",
                                          }}
                                        >
                                          Note devoir / 20
                                        </td>
                                        <td
                                          className="ec-text"
                                          style={{
                                            borderRight: "none",
                                            borderTop: "none",
                                            borderBottom: "none",
                                          }}
                                        >
                                          40 % devoir
                                        </td>
                                        <td
                                          className="ec-text"
                                          style={{
                                            borderRight: "none",
                                            borderTop: "none",
                                            borderBottom: "none",
                                          }}
                                        >
                                          Note examen / 20
                                        </td>
                                        <td
                                          className="ec-text"
                                          style={{
                                            borderRight: "none",
                                            borderTop: "none",
                                            borderBottom: "none",
                                          }}
                                        >
                                          60 % examen
                                        </td>
                                        <td
                                          className="ec-text"
                                          style={{
                                            borderRight: "none",
                                            borderTop: "none",
                                            borderBottom: "none",
                                          }}
                                        >
                                          Moy EC / 20
                                        </td>
                                        <td
                                          className="ec-text"
                                          style={{
                                            borderRight: "none",
                                            borderTop: "none",
                                            borderBottom: "none",
                                          }}
                                        >
                                          80% note écrit
                                        </td>
                                      </Box>
                                    </Box>

                                    <Box
                                      display="flex"
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <Box
                                        className="ec-text"
                                        sx={{
                                          fontSize: "9px",
                                          borderBottom: "1px solid",
                                          borderRight: "1px solid  ",
                                        }}
                                      >
                                        {matiere.tp}
                                      </Box>
                                      <Box
                                        className="ec-text"
                                        display="flex"
                                        sx={{
                                          height: "100%",
                                          padding: "0 !important",
                                        }}
                                      >
                                        <td
                                          className="ec-text"
                                          style={{
                                            writingMode: "vertical-lr",
                                            fontSize: "9px",
                                            borderRight: "1px solid",
                                            borderLeft: "none",

                                            borderTop: "none",
                                            borderBottom: "none",
                                          }}
                                        >
                                          Note TP
                                        </td>
                                        <td
                                          className="ec-text"
                                          style={{
                                            writingMode: "vertical-lr",
                                            fontSize: "9px",
                                            borderLeft: "none",

                                            borderTop: "none",
                                            borderBottom: "none",
                                          }}
                                        >
                                          20% note TP
                                        </td>
                                      </Box>
                                    </Box>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                          {/* bloc right */}
                          <Box display={"flex"}>
                            <td
                              className="ec-text"
                              style={{
                                writingMode: "vertical-lr",
                                borderRight: "1px solid",
                                borderLeft: "none",
                                borderTop: "none",
                                borderBottom: "none",
                              }}
                            >
                              Moyenne {matiere?.nom_matiere.split(" ")[0]}/20
                            </td>
                            <td
                              className="ec-text"
                              style={{
                                writingMode: "vertical-lr",
                                borderRight: "1px solid",
                                borderLeft: "none",
                                borderTop: "none",
                                borderBottom: "none",
                              }}
                            >
                              Crédit obtenu
                            </td>
                            <td
                              className="ec-text"
                              style={{
                                writingMode: "vertical-lr",
                                borderTop: "none",
                                borderBottom: "none",
                                borderLeft: "none",
                                borderRight: "none",
                              }}
                            >
                              Observations
                            </td>
                          </Box>
                        </Box>
                      </th>
                    );
                  } else
                    return (
                      <th
                        key={index}
                        rowspan="4"
                        className="th-pv-title"
                        style={{ padding: "0" }}
                      >
                        <Box display="flex">
                          <Box>
                            <Box
                              className="ec-text"
                              sx={{
                                borderBottom: "1px solid",
                                borderRight: "1px solid",
                                height: "54px",
                              }}
                            >
                              UE : {matiere.nom_matiere}
                            </Box>

                            <Box key={index} display={"flex"}>
                              {matiere.elements.map((element, index) => {
                                return (
                                  <Box
                                    key={index}
                                    style={{ borderRight: "1px solid" }}
                                  >
                                    <Box
                                      className="ec-no-tp ec-repeat"
                                      style={{
                                        height: "39px",
                                        borderRight: "none",
                                      }}
                                    >
                                      {" "}
                                      EC : {element.nom_element}
                                    </Box>

                                    <Box display="flex">
                                      <td
                                        className="ec-text"
                                        style={{
                                          borderLeft: "none",
                                          borderRight: "none",
                                          borderTop: "none",
                                          borderBottom: "none",
                                        }}
                                      >
                                        Note devoir / 20
                                      </td>
                                      <td
                                        className="ec-text"
                                        style={{
                                          borderRight: "none",
                                          borderTop: "none",
                                          borderBottom: "none",
                                        }}
                                      >
                                        40 % devoir
                                      </td>
                                      <td
                                        className="ec-text"
                                        style={{
                                          borderRight: "none",
                                          borderTop: "none",
                                          borderBottom: "none",
                                        }}
                                      >
                                        Note examen / 20
                                      </td>
                                      <td
                                        className="ec-text"
                                        style={{
                                          borderRight: "none",
                                          borderTop: "none",
                                          borderBottom: "none",
                                        }}
                                      >
                                        60 % examen
                                      </td>
                                      <td
                                        className="ec-text"
                                        style={{
                                          borderTop: "none",
                                          borderBottom: "none",
                                          borderRight: "none",
                                        }}
                                      >
                                        Moy EC / 20
                                      </td>
                                    </Box>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                          <Box display={"flex"}>
                            <td
                              className="ec-text"
                              style={{
                                writingMode: "vertical-lr",
                                borderRight: "1px solid",
                                borderLeft: "none",
                                borderTop: "none",
                                borderBottom: "none",
                              }}
                            >
                              Moyenne {matiere?.nom_matiere.split(" ")[0]}/20
                            </td>
                            <td
                              className="ec-text"
                              style={{
                                writingMode: "vertical-lr",
                                borderRight: "1px solid",
                                borderLeft: "none",
                                borderTop: "none",
                                borderBottom: "none",
                              }}
                            >
                              Crédit obtenu
                            </td>
                            <td
                              className="ec-text"
                              style={{
                                writingMode: "vertical-lr",
                                borderTop: "none",
                                borderBottom: "none",
                                borderLeft: "none",
                                borderRight: "none",
                              }}
                            >
                              Observations
                            </td>
                          </Box>
                        </Box>
                      </th>
                    );
                })}

                <th
                  rowspan="3"
                  className="text-vertical"
                  style={{ fontWeight: "bolder", paddingTop: "5px" }}
                >
                  Total crédit S1 obtenus
                </th>
                <th
                  rowspan="3"
                  className="text-vertical"
                  style={{ fontWeight: "bolder", paddingTop: "5px" }}
                >
                  Validation semestre
                </th>
                <th
                  rowspan="3"
                  className="text-vertical"
                  style={{ fontWeight: "bolder", paddingTop: "5px" }}
                >
                  Moyenne semestre
                </th>
              </tr>
            </thead>
            <tbody>
              {pvGlobalData?.pvGlobalNote?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th
                      style={{
                        fontSize: "9px",
                        padding: "0 2px ",
                        fontFamily: [
                          "Times New Roman",
                          "Times",
                          "sans-serif",
                        ].join(","),
                      }}
                    >
                      {item.numeroAnonymatDevoir}
                    </th>
                    <th
                      style={{
                        fontSize: "9px",
                        padding: "0 2px ",
                        fontFamily: [
                          "Times New Roman",
                          "Times",
                          "sans-serif",
                        ].join(","),
                      }}
                    >
                      {item.numeroAnonymatExamen}
                    </th>
                    <th
                      style={{
                        fontSize: "9px",
                        padding: "0 2px ",
                        fontFamily: [
                          "Times New Roman",
                          "Times",
                          "sans-serif",
                        ].join(","),
                      }}
                    >
                      {index + 1}
                    </th>
                    <th
                      style={{
                        fontSize: "9px",
                        fontFamily: [
                          "Times New Roman",
                          "Times",
                          "sans-serif",
                        ].join(","),
                      }}
                    >
                      {item.nomPrenom}
                    </th>
                    {item.noteParEc.map((td, index) => {
                      if (!td.tp) {
                        return (
                          <td key={index}>
                            <Box display="flex">
                              {td.notes.map((note, index) => {
                                return (
                                  <Box
                                    key={index}
                                    sx={{ paddingLeft: "0.4px" }}
                                  >
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.noteDevoir
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.pourcentageDevoir
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.noteExamen
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.pourcentageExamen
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.average?.toString().substring(0, 4)}
                                    </td>
                                  </Box>
                                );
                              })}
                              <td
                                style={{
                                  borderTop: "none",
                                  borderBottom: "none",
                                  borderLeft: "none",
                                  fontSize: "9px",
                                  fontFamily: [
                                    "Times New Roman",
                                    "Times",
                                    "sans-serif",
                                  ].join(","),
                                }}
                              >
                                {td.moyenneUE?.toString().substring(0, 4)}
                              </td>
                              <td
                                style={{
                                  borderTop: "none",
                                  borderBottom: "none",
                                  borderLeft: "none",
                                  fontSize: "9px",
                                  fontFamily: [
                                    "Times New Roman",
                                    "Times",
                                    "sans-serif",
                                  ].join(","),
                                }}
                              >
                                {td.credit_obtenu}
                              </td>
                              <td
                                style={{
                                  borderTop: "none",
                                  borderBottom: "none",
                                  borderLeft: "none",
                                  borderRight: "none",
                                  fontSize: "9px",
                                  fontFamily: [
                                    "Times New Roman",
                                    "Times",
                                    "sans-serif",
                                  ].join(","),
                                }}
                              >
                                {td.observation}
                              </td>
                            </Box>
                          </td>
                        );
                      } else
                        return (
                          <td key={index}>
                            <Box display="flex">
                              {td.notes.map((note, index) => {
                                return (
                                  <Box
                                    key={index}
                                    style={{ paddingLeft: "0.4px" }}
                                  >
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.noteDevoir
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.pourcentageDevoir
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.noteExamen
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.pourcentageExamen
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.average?.toString().substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.pourcentageNoteEcrit
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.noteTp?.toString().substring(0, 4)}
                                    </td>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                        fontSize: "9px",
                                        fontFamily: [
                                          "Times New Roman",
                                          "Times",
                                          "sans-serif",
                                        ].join(","),
                                      }}
                                    >
                                      {note.pourcentageNoteTp
                                        ?.toString()
                                        .substring(0, 4)}
                                    </td>
                                  </Box>
                                );
                              })}
                              <td
                                style={{
                                  borderTop: "none",
                                  borderBottom: "none",
                                  borderLeft: "none",
                                  fontSize: "9px",
                                  fontFamily: [
                                    "Times New Roman",
                                    "Times",
                                    "sans-serif",
                                  ].join(","),
                                }}
                              >
                                {td.moyenneUE?.toString().substring(0, 4)}
                              </td>
                              <td
                                style={{
                                  borderTop: "none",
                                  borderBottom: "none",
                                  borderLeft: "none",
                                  fontSize: "9px",
                                  fontFamily: [
                                    "Times New Roman",
                                    "Times",
                                    "sans-serif",
                                  ].join(","),
                                }}
                              >
                                {td.credit_obtenu}
                              </td>
                              <td
                                style={{
                                  borderTop: "none",
                                  borderBottom: "none",
                                  borderLeft: "none",
                                  borderRight: "none",
                                  fontSize: "9px",
                                  fontFamily: [
                                    "Times New Roman",
                                    "Times",
                                    "sans-serif",
                                  ].join(","),
                                }}
                              >
                                {td.observation}
                              </td>
                            </Box>
                          </td>
                        );
                    })}
                    <td
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        fontSize: "9px",
                        fontFamily: [
                          "Times New Roman",
                          "Times",
                          "sans-serif",
                        ].join(","),
                      }}
                    >
                      {item.Total_Credit}
                    </td>
                    <td
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        fontSize: "9px",
                        fontFamily: [
                          "Times New Roman",
                          "Times",
                          "sans-serif",
                        ].join(","),
                      }}
                    >
                      {item.validation_semestre}
                    </td>
                    <td
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        fontSize: "9px",
                        fontFamily: [
                          "Times New Roman",
                          "Times",
                          "sans-serif",
                        ].join(","),
                      }}
                    >
                      {item.moyenneSemestre.toString().substring(0, 4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default PVglobal;
