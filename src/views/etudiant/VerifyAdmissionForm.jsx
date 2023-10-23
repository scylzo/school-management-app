/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { ClockLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

import { url } from "config/config";
import {
  createMatricule,
  fetchAdmissionById,
  validateAdmission,
} from "redux/admissionFeatures";
import { CustomFormControl, FormBtn } from "components";
import { fetchAnneeAcad, fetchClasse } from "redux/scolariteFeatures";

const VerifyAdmissionForm = ({ studentId }) => {
  const dispatch = useDispatch();
  const admission = useSelector((state) => state.admissionById);
  const classes = useSelector((state) => state.classe);
  const anneeAcad = useSelector((state) => state.anneeAcad);

  const [classe, setClasse] = useState("");
  const [cycle, setCycle] = useState("");

  useEffect(() => {
    dispatch(fetchAdmissionById({ studentId }));
    dispatch(fetchClasse());
    dispatch(fetchAnneeAcad());
  }, [studentId]);

  //get student class and his cycle
  const handleChangeClasse = (event) => {
    setClasse(JSON.parse(event.target.value));
  };
  const handleChangeCycle = (event) => {
    setCycle(event.target.value);
  };

  //retrieve student last admission
  const lastAdmission = admission?.data[admission?.data?.length - 1];

  //create matricule
  const studentMatriculeObjet = {};
  studentMatriculeObjet.id = lastAdmission?.userId;
  const getFiliere = lastAdmission?.filiere?.split("/")[0]?.substr(0, 1)
    ? lastAdmission?.filiere?.split("/")[0]?.substr(0, 1)
    : "";
  studentMatriculeObjet.filiere = getFiliere;
  studentMatriculeObjet.sexe =
    lastAdmission?.user?.sexe === "Feminin"
      ? 2
      : lastAdmission?.user?.sexe === "Masculin"
      ? 1
      : "";
  studentMatriculeObjet.ordreArrive = lastAdmission?.id;
  studentMatriculeObjet.annee_acad = lastAdmission?.Cycle?.substring(5, 9);

  //attribution du matricule
  const setStudentMatricule = () => {
    if (studentMatriculeObjet.annee_acad !== "" || null) {
      dispatch(createMatricule(studentMatriculeObjet));
    }
  };

  useEffect(() => {
    dispatch(fetchAdmissionById({ studentId }));
    dispatch(fetchClasse());
    dispatch(fetchAnneeAcad());
  }, [studentId]);

  return (
    <>
      {admission?.loading ? (
        <Box display="flex" justifyContent="center" m={"1rem"}>
          <ClockLoader color="#43a81f" />
        </Box>
      ) : (
        <>
          {" "}
          <Typography
            sx={{
              color: "rgb(177,187,198,100)",
              fontWeight: "600",
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: "12px",
              margin: "0 0 1rem",
            }}
          >
            Vérification des informations
          </Typography>
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
                  <span>{lastAdmission?.Cycle} </span>
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
          <Divider sx={{ fontSize: "12px", margin: "1.5rem 0" }}>
            Validation
          </Divider>
          <Typography
            sx={{
              color: "rgb(177,187,198,100)",
              fontWeight: "600",
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: "12px",
              margin: "1rem 0",
            }}
          >
            Information complémentaire
          </Typography>
          <form>
            <Box display="flex" flexDirection="column" gap="1rem">
              <CustomFormControl
                labelTitle="Matricule"
                labelWidth="30%"
                inputWidth="13rem"
                placeholder="Matricule"
                disabled
                type="text"
                value={`${
                  studentMatriculeObjet?.annee_acad
                    ? studentMatriculeObjet?.annee_acad
                    : ""
                }${
                  studentMatriculeObjet?.filiere
                    ? studentMatriculeObjet?.filiere
                    : ""
                }${studentMatriculeObjet?.sexe}${
                  studentMatriculeObjet?.filiere
                    ? studentMatriculeObjet?.ordreArrive
                    : ""
                }`}
              />
              <CustomFormControl
                labelTitle="Année académique"
                labelWidth="30%"
                inputWidth="13rem"
                typeOfField="selectField"
                onChange={handleChangeCycle}
                selectOptionsFromApiAnneeAcad={anneeAcad?.data}
              />
              <CustomFormControl
                labelTitle="Classe"
                labelWidth="30%"
                inputWidth="13rem"
                typeOfField="selectField"
                onChange={handleChangeClasse}
                selectOptionsFromApiClasse={classes?.data}
              />
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
              <FormBtn
                type="button"
                onClick={() => {
                  setStudentMatricule();
                  dispatch(
                    validateAdmission({
                      Statut: "VALIDER",
                      classprofId: classe?.id,
                      filiere_etude: classe?.classe,
                      filiere: classe?.classe?.split("/")[0],
                      Cycle: cycle,
                      admissionId: lastAdmission?.id,
                    })
                  );
                }}
                buttonText="Valider"
                bgNormalColor="#43A81F"
                width_="30%"
              />
            </Box>
          </form>
        </>
      )}
    </>
  );
};

export default VerifyAdmissionForm;
