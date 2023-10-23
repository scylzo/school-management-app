/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ClockLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

import { url } from "config/config";
import { fetchAdmissionById, validateAdmission } from "redux/admissionFeatures";
import { FormBtn } from "components";

const AdmissionControlForm = ({ studentId }) => {
  const dispatch = useDispatch();
  const admission = useSelector((state) => state.admissionById);

  //retrieve student last admission
  const lastAdmission = admission?.data[admission?.data?.length - 1];

  useEffect(() => {
    dispatch(fetchAdmissionById({ studentId }));
  }, [studentId]);
  return (
    <>
      {admission?.loading ? (
        <Box display="flex" justifyContent="center" m={"1rem"}>
          <ClockLoader color="#43a81f" />
        </Box>
      ) : (
        <>
          <Box display="flex" flexDirection="column" gap="10px">
            <Typography style={{ fontSize: "12px" }}>
              Baccalauréat :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.Baccalaureat_serie === "undefined" ||
                lastAdmission?.Baccalaureat_serie?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {" "}
                    {lastAdmission?.Baccalaureat_serie}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Année obtention du bac :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.Annee_obtention === "undefined" ||
                lastAdmission?.Annee_obtention?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {lastAdmission?.Annee_obtention}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Mention obtenue :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.Mention === "undefined" ||
                lastAdmission?.Mention?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {" "}
                    {lastAdmission?.Mention}{" "}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Lycée ou collége :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.Lycee_college === "undefined" ||
                lastAdmission?.Lycee_college?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {" "}
                    {lastAdmission?.Lycee_college}{" "}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Faculté ou institut :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.Facute_institut === "undefined" ||
                lastAdmission?.Facute_institut?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {lastAdmission?.Facute_institut}{" "}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Période :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.Periode === "undefined" ||
                lastAdmission?.Periode?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {" "}
                    {lastAdmission?.Periode}{" "}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Année académique :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.Cycle === "undefined" ||
                null ||
                lastAdmission?.Cycle?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini </span>
                ) : (
                  <span style={{ color: "green" }}>
                    {lastAdmission?.Cycle}{" "}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Filière :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.filiere === "undefined" ||
                null ||
                lastAdmission?.filiere?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini </span>
                ) : (
                  <span style={{ color: "green" }}>
                    {lastAdmission?.filiere}{" "}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Filière demandée :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.filiere_demande === "undefined" ||
                null ||
                lastAdmission?.filiere_demande?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini </span>
                ) : (
                  <span style={{ color: "green" }}>
                    {lastAdmission?.filiere_demande}{" "}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Niveau d'étude :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.filiere_etude === null ||
                lastAdmission?.filiere_etude?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {lastAdmission?.filiere_etude}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Niveau d'étude demandé :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.niveau_etude_demande === null ||
                lastAdmission?.niveau_etude_demande?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {lastAdmission?.niveau_etude_demande}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px" }}>
              Visite médical :{" "}
              <span style={{ fontWeight: "300", color: "red" }}>
                {" "}
                {lastAdmission?.Certificat_medical === "undefined" ||
                lastAdmission?.Certificat_medical?.length < 2 ? (
                  <span style={{ color: "red" }}>non defini</span>
                ) : (
                  <span style={{ color: "green" }}>
                    {lastAdmission?.Certificat_medical}
                  </span>
                )}
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px", display: "flex" }}>
              Photo d'identité :{" "}
              <span
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                }}
                onClick={() => window.open(`${url}/${lastAdmission?.Photo}`)}
              >
                Visualiser{" "}
                <RemoveRedEyeOutlinedIcon
                  sx={{ fontSize: "15px", marginLeft: "2px" }}
                />
              </span>
              /
              <span
                onClick={() =>
                  saveAs(`${url}/${lastAdmission?.Photo}`, "image.jpg")
                }
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                }}
              >
                {" "}
                Imprimer{" "}
                <LocalPrintshopOutlinedIcon
                  sx={{ fontSize: "15px", marginLeft: "2px" }}
                />
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px", display: "flex" }}>
              Extrait de naissance :{" "}
              <span
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                }}
                onClick={() =>
                  window.open(`${url}/${lastAdmission?.Extrait_naissance}`)
                }
              >
                Visualiser{" "}
                <RemoveRedEyeOutlinedIcon
                  sx={{ fontSize: "15px", marginLeft: "2px" }}
                />
              </span>
              /
              <span
                onClick={() =>
                  saveAs(
                    `${url}/${lastAdmission?.Extrait_naissance}`,
                    "image.jpg"
                  )
                }
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                }}
              >
                {" "}
                Imprimer{" "}
                <LocalPrintshopOutlinedIcon
                  sx={{ fontSize: "15px", marginLeft: "2px" }}
                />
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px", display: "flex" }}>
              Diplôme :{" "}
              <span
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                }}
                onClick={() => window.open(`${url}/${lastAdmission?.Diplome}`)}
              >
                Visualiser{" "}
                <RemoveRedEyeOutlinedIcon
                  sx={{ fontSize: "15px", marginLeft: "2px" }}
                />
              </span>
              /
              <span
                onClick={() =>
                  saveAs(`${url}/${lastAdmission?.Diplome}`, "image.jpg")
                }
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                }}
              >
                {" "}
                Imprimer{" "}
                <LocalPrintshopOutlinedIcon
                  sx={{ fontSize: "15px", marginLeft: "2px" }}
                />
              </span>
            </Typography>
            <Typography style={{ fontSize: "12px", display: "flex" }}>
              Relevé de notes :{" "}
              <span
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                }}
                onClick={() =>
                  window.open(`${url}/${lastAdmission?.Releve_notes}`)
                }
              >
                Visualiser{" "}
                <RemoveRedEyeOutlinedIcon
                  sx={{ fontSize: "15px", marginLeft: "2px" }}
                />
              </span>
              /
              <span
                onClick={() =>
                  saveAs(`${url}/${lastAdmission?.Releve_notes}`, "image.jpg")
                }
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                }}
              >
                {" "}
                Imprimer{" "}
                <LocalPrintshopOutlinedIcon
                  sx={{ fontSize: "15px", marginLeft: "2px" }}
                />
              </span>
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" gap="10px" mt="1.5rem">
            <FormBtn
              onClick={() => window.location.reload(true)}
              type="button"
              buttonText="Annuler"
              bgNormalColor="#C74040"
              width_="30%"
            />
            <FormBtn
              type="button"
              buttonText="Traitement"
              bgNormalColor="orange"
              width_="30%"
              onClick={() =>
                dispatch(
                  validateAdmission({
                    Statut: "EN COURS DE TRAITEMENT",
                    admissionId: lastAdmission?.id,
                  })
                )
              }
            />
          </Box>
        </>
      )}
    </>
  );
};

export default AdmissionControlForm;
