/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { ClockLoader } from "react-spinners";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "redux/studentFeatures";
import { fetchUser } from "redux/userFeatures";
import { archiveAdmission, fetchAdmission } from "redux/admissionFeatures";
import { Topbar } from "components";
import { Sidebar, tabStyle } from "views";
import RegisterForm from "./RegisterForm";
import AdmissionForm from "./AdmissionForm";
import VerifyAdmissionForm from "./VerifyAdmissionForm";
import EditAdmissionForm from "./EditAdmissionForm";
import AdmissionControlForm from "./AdmissionControlForm";
import Notiflix from "notiflix";
import EditRegisterForm from "./EditRegisterForm";
import api from "services/api";

export const Etudiants = () => {
  const [toggle, setToggle] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [lastAdmission, setLastAdmission] = useState();
  const [displayAddCompteForm, setDisplayAddCompteForm] = useState(false);
  const [displayAddAdmissionForm, setDisplayAddAdmissionForm] = useState(true);
  const [displayVerifyAdmissionForm, setDisplayVerifyAdmissionForm] =
    useState(false);
  const [displayEditAdmissionForm, setDisplayEditAdmissionForm] =
    useState(false);
  const [displayControlAdmissionForm, setDisplayControlAdmissionForm] =
    useState(false);
  const [displayEditRegisterForm, setDisplayEditRegisterForm] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.student);
  const admissions = useSelector((state) => state.admission);
  const student = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchAdmission());
    dispatch(fetchUser(studentId));
  }, [studentId]);

  const getFirstLetters = () => {
    const firstLetters = student?.data?.nom
      ?.split(" ")
      ?.map((word) => word.charAt(0))
      .join("");

    return firstLetters;
  };

  const confirmArchive = (id) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir archiver ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(archiveAdmission({ admissionId: id }));
      }
    );
  };

  const handleDisplayAddAdmission = () => {
    setDisplayAddAdmissionForm(true);
    setDisplayVerifyAdmissionForm(false);
    setDisplayAddCompteForm(false);
    setDisplayEditAdmissionForm(false);
    setDisplayControlAdmissionForm(false);
    setDisplayEditRegisterForm(false);
  };

  const handleDisplayVerifyAdmissionForm = () => {
    setDisplayVerifyAdmissionForm(true);
    setDisplayAddCompteForm(false);
    setDisplayEditAdmissionForm(false);
    setDisplayAddAdmissionForm(false);
    setDisplayControlAdmissionForm(false);
    setDisplayEditRegisterForm(false);
  };
  const handleDisplayEditAdmissionForm = () => {
    setDisplayEditAdmissionForm(true);
    setDisplayVerifyAdmissionForm(false);
    setDisplayAddCompteForm(false);
    setDisplayAddAdmissionForm(false);
    setDisplayControlAdmissionForm(false);
    setDisplayEditRegisterForm(false);
  };

  const handleDisplayCreateCompte = () => {
    setDisplayAddCompteForm(true);
    setDisplayEditAdmissionForm(false);
    setDisplayVerifyAdmissionForm(false);
    setDisplayAddAdmissionForm(false);
    setDisplayControlAdmissionForm(false);
    setDisplayEditRegisterForm(false);
  };
  const handleDisplayControlAdmissionForm = () => {
    setDisplayControlAdmissionForm(true);
    setDisplayAddCompteForm(false);
    setDisplayEditAdmissionForm(false);
    setDisplayVerifyAdmissionForm(false);
    setDisplayAddAdmissionForm(false);
    setDisplayEditRegisterForm(false);
  };
  const handleDisplayEditRegisterForm = () => {
    setDisplayEditRegisterForm(true);
    setDisplayControlAdmissionForm(false);
    setDisplayAddCompteForm(false);
    setDisplayEditAdmissionForm(false);
    setDisplayVerifyAdmissionForm(false);
    setDisplayAddAdmissionForm(false);
  };

  //get students
  const allStudents = data?.rows;
  //get validated admissions
  const validatedAdmissions = admissions?.data?.filter(
    (admission) => admission?.Statut === "VALIDER"
  );

  const getStudentLastAdmission = ({ anneeAcad, studentId }) => {
    api
      .getStudentLastAdmissionApi({ cycle: anneeAcad, studentId })
      .then((res) => {
        if (res) {
          setLastAdmission(res.data[0]);
        }
      });
  };

  //get pending admissions
  const pendingAdmissions = admissions?.data?.filter(
    (admission) =>
      admission?.Statut === "EN ATTENTE" ||
      admission?.Statut === "EN COURS DE TRAITEMENT"
  );

  //student data columns
  const columnsStudent = [
    { label: "Code", name: "id", options: { display: false } },
    {
      name: "nom",
      label: "Nom",
      options: {
        sort: true,
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
      name: "nationalite",
      label: "Nationalite",
      options: {
        display: false,
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
      },
    },
    {
      name: "tel_fixe",
      label: "Tél fixe",
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
      name: "tel_mobile",
      label: "Téléphone",
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
      name: "email",
      label: "Email",
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
      name: "sexe",
      label: "Sexe",
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
      name: "etat",
      label: "Statut",
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
          const index = tableMeta.rowData.findIndex(
            (el) => el === "activated" || el === "deactivated"
          );
          if (tableMeta.rowData[index] === "activated") {
            return <span style={{ color: "green" }}>Activer</span>;
          }
          if (tableMeta.rowData[index] === "deactivated") {
            return <span style={{ color: "red" }}>Désactiver </span>;
          }
        },
      },
    },

    {
      name: "Action",
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
            <>
              <button
                type="button"
                style={{
                  background: "#F3F9F2",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStudentId(tableMeta.rowData[0]);
                }}
              >
                Préinscription
              </button>
              <button
                style={{
                  background: "#eaf7d4",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStudentId(tableMeta.rowData[0]);
                  handleDisplayEditRegisterForm();
                }}
              >
                Editer
              </button>
            </>
          );
        },
      },
    },
  ];
  // admission data column
  const columnsAdmission = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "user.nom",
      sort: true,
      options: {
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
      label: "Sexe",
      name: "user.sexe",
      options: {
        display: false,
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
      },
    },
    {
      label: "Nom utilisateur",
      name: "user.username",
      options: {
        display: false,
      },
    },
    {
      label: "Date de naissance",
      name: "user.date_naissance",
      options: {
        display: false,
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[5]} </span>;
        },
      },
    },
    {
      label: "Lieu de naissance",
      name: "user.lieu_naissance",
      options: {
        display: false,
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
      },
    },
    {
      label: "Nationalite",
      name: "user.nationalite",
      options: {
        display: false,
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
      },
    },
    {
      label: "Adresse senegal",
      name: "user.adresse_senegal",
      options: {
        display: false,
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
      },
    },
    {
      label: "Adresse pays origine",
      name: "user.adresse_pays_origine",
      options: {
        display: false,
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
      },
    },
    {
      label: "Tel fixe ",
      name: "user.tel_fixe",
      options: {
        display: false,
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
      },
    },
    {
      label: "Teléphone ",
      name: "user.tel_mobile",
      options: {
        display: false,
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
      },
    },
    {
      label: "Email ",
      name: "user.email",
      options: {
        display: false,
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
      },
    },
    {
      label: "Nom  pere ",
      name: "user.Nom_pere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Profession pere ",
      name: "user.Profession_pere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Telephone pere ",
      name: "user.Telephone_pere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Adresse pere ",
      name: "user.Adresse_pere",
      options: {
        display: false,
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
      },
    },

    {
      label: "Adresse mere ",
      name: "user.Adresse_mere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Nom mere ",
      name: "user.Nom_mere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Profession mere ",
      name: "user.Profession_mere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Adresse mere ",
      name: "user.Telephone_mere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Personne a contacter ",
      name: "user.Personne_contact",
      options: {
        display: false,
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
      },
    },
    {
      label: "Date demande admission",
      name: "Date_admission",
      options: {
        filter: false,
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[21]} </span>;
        },
      },
    },
    {
      label: "Baccalaureat Serie",
      name: "Baccalaureat_serie",
      options: {
        display: false,
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
      },
    },
    {
      label: "Annee obtention",
      name: "Annee_obtention",
      options: {
        display: false,
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
      },
    },
    {
      label: "ID user",
      name: "user.id",
      options: {
        display: false,
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
      },
    },
    {
      label: "Mention",
      name: "Mention",
      options: {
        display: false,
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
      },
    },
    {
      label: "Lycee ou  college",
      name: "Lycee_college",
      options: {
        display: false,
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
      },
    },
    {
      label: "Faculte ou institut",
      name: "Facute_institut",
      options: {
        display: false,
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
      },
    },
    {
      label: "Periode",
      name: "Periode",
      options: {
        display: false,
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
      },
    },
    {
      label: "Annee Academique",
      name: "Cycle",
      options: {
        display: false,
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
      },
    },
    {
      label: "Classe",
      name: "classprof.classe",
      options: {
        display: false,
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
      },
    },
    {
      label: "Statut",
      name: "Statut",
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
        customBodyRender: (value, tableMeta, updateValue) => {
          const index = tableMeta.rowData.findIndex(
            (el) =>
              el === "VALIDER" ||
              el === "EN ATTENTE" ||
              el === "EN COURS DE TRAITEMENT"
          );
          if (tableMeta.rowData[index] === "VALIDER") {
            return (
              <span style={{ color: "green", textTransform: "uppercase" }}>
                validé
              </span>
            );
          }
          if (tableMeta.rowData[index] === "EN ATTENTE") {
            return <span style={{ color: "red" }}>En attente </span>;
          }
          if (tableMeta.rowData[index] === "EN COURS DE TRAITEMENT") {
            return (
              <span style={{ color: "orange" }}>En cours de traitement </span>
            );
          }
        },
      },
    },
    {
      name: "Action",
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {" "}
              <button
                type="button"
                style={{
                  background: "#F3F9F2",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStudentId(tableMeta.rowData[24]);
                  handleDisplayVerifyAdmissionForm();
                }}
              >
                Verifier{" "}
              </button>
              <button
                type="button"
                style={{
                  background: "#eaf7d4",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStudentId(tableMeta.rowData[24]);
                  handleDisplayEditAdmissionForm();
                  getStudentLastAdmission({
                    anneeAcad: tableMeta.rowData[29],
                    studentId: tableMeta.rowData[24],
                  });
                }}
              >
                Editer
              </button>
              <button
                type="button"
                style={{
                  background: "#fdeeef",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => confirmArchive(tableMeta.rowData[0])}
              >
                Archiver
              </button>
            </>
          );
        },
      },
    },
  ];
  //validated admission columns
  const validatedAdmissionsColumn = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "Matricule",
      name: "user.Matricule",
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
      label: "Nom",
      name: "user.nom",
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
      },
    },
    {
      label: "Sexe",
      name: "user.sexe",
      options: {
        display: false,
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
      },
    },
    {
      label: "Nom utilisateur",
      name: "user.username",
      options: {
        display: false,
      },
    },
    {
      label: "Date de naissance",
      name: "user.date_naissance",
      options: {
        display: false,
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[5]} </span>;
        },
      },
    },
    {
      label: "Lieu de naissance",
      name: "user.lieu_naissance",
      options: {
        display: false,
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
      },
    },
    {
      label: "Nationalite",
      name: "user.nationalite",
      options: {
        display: false,
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
      },
    },
    {
      label: "Adresse senegal",
      name: "user.adresse_senegal",
      options: {
        display: false,
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
      },
    },
    {
      label: "Adresse pays origine",
      name: "user.adresse_pays_origine",
      options: {
        display: false,
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
      },
    },
    {
      label: "Tel fixe ",
      name: "user.tel_fixe",
      options: {
        display: false,
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
      },
    },
    {
      label: "Teléphone ",
      name: "user.tel_mobile",
      options: {
        display: false,
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
      },
    },
    {
      label: "Email ",
      name: "user.email",
      options: {
        display: false,
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
      },
    },
    {
      label: "Nom  pere ",
      name: "user.Nom_pere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Profession pere ",
      name: "user.Profession_pere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Telephone pere ",
      name: "user.Telephone_pere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Adresse pere ",
      name: "user.Adresse_pere",
      options: {
        display: false,
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
      },
    },

    {
      label: "Adresse mere ",
      name: "user.Adresse_mere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Nom mere ",
      name: "user.Nom_mere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Profession mere ",
      name: "user.Profession_mere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Adresse mere ",
      name: "user.Telephone_mere",
      options: {
        display: false,
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
      },
    },
    {
      label: "Personne a contacter ",
      name: "user.Personne_contact",
      options: {
        display: false,
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
      },
    },
    {
      label: "Date admission",
      name: "Date_admission",
      options: {
        filter: false,
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[22]} </span>;
        },
      },
    },
    {
      label: "Baccalaureat Serie",
      name: "Baccalaureat_serie",
      options: {
        display: false,
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
      },
    },
    {
      label: "Annee obtention",
      name: "Annee_obtention",
      options: {
        display: false,
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
      },
    },
    {
      label: "ID user",
      name: "user.id",
      options: {
        display: false,
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
      },
    },
    {
      label: "Mention",
      name: "Mention",
      options: {
        display: false,
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
      },
    },
    {
      label: "Lycee ou  college",
      name: "Lycee_college",
      options: {
        display: false,
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
      },
    },
    {
      label: "Faculte ou institut",
      name: "Facute_institut",
      options: {
        display: false,
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
      },
    },
    {
      label: "Periode",
      name: "Periode",
      options: {
        display: false,
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
      },
    },
    {
      label: "Annee Academique",
      name: "Cycle",
      options: {
        display: false,
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
      },
    },
    {
      label: "Classe",
      name: "classprof.classe",
      options: {
        display: false,
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
      },
    },
    {
      label: "Statut",
      name: "Statut",
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
        customBodyRender: (value, tableMeta, updateValue) => {
          const index = tableMeta.rowData.findIndex(
            (el) =>
              el === "VALIDER" ||
              el === "EN ATTENTE" ||
              el === "EN COURS DE TRAITEMENT"
          );
          if (tableMeta.rowData[index] === "VALIDER") {
            return <span style={{ color: "green" }}>validé</span>;
          }
          if (tableMeta.rowData[index] === "EN ATTENTE") {
            return (
              <span style={{ color: "red" }}>{tableMeta.rowData[index]} </span>
            );
          }
          if (tableMeta.rowData[index] === "EN COURS DE TRAITEMENT") {
            return (
              <span style={{ color: "orange" }}>
                {tableMeta.rowData[index]}{" "}
              </span>
            );
          }
        },
      },
    },
    {
      name: "Action",
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {" "}
              <button
                type="button"
                style={{
                  background: "#F3F9F2",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStudentId(tableMeta.rowData[25]);
                  handleDisplayControlAdmissionForm();
                }}
              >
                Controler{" "}
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
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD > Administration > Etudiants"
            afficherBtn={true}
            onClick={() => handleDisplayCreateCompte()}
            title="Créer un compte"
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
              <Tabs
                aria-label="Basic tabs"
                defaultValue={0}
                sx={{
                  borderRadius: "lg",
                }}
              >
                <TabList>
                  <Tab
                    sx={tabStyle}
                    onClick={() => handleDisplayAddAdmission()}
                  >
                    Faire une demande d'admission
                  </Tab>
                  <Tab sx={tabStyle}> Liste des demandes en attente</Tab>
                  <Tab sx={tabStyle}> Liste des étudiants </Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2 }}>
                  {allStudents?.loading ? (
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
                </TabPanel>
                <TabPanel value={1} sx={{ p: 2 }}>
                  {admissions?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={pendingAdmissions}
                      columns={columnsAdmission}
                      options={options}
                    />
                  )}
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2 }}>
                  {admissions?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={validatedAdmissions}
                      columns={validatedAdmissionsColumn}
                      options={options}
                    />
                  )}
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
        {displayAddCompteForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            <Tabs
              aria-label="Basic tabs"
              defaultValue={0}
              sx={{
                borderRadius: "lg",
              }}
            >
              <TabList>
                <Tab sx={tabStyle}>Information</Tab>
                <Tab sx={tabStyle}> Parents</Tab>
              </TabList>
              <RegisterForm />
            </Tabs>
          </div>
        )}
        {displayAddAdmissionForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            {student?.loading ? (
              <Box display="flex" justifyContent="center" m={"1rem"}>
                <ClockLoader color="#43a81f" />
              </Box>
            ) : (
              <>
                {student?.data && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <Box
                        sx={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "100px",
                          background: "#E4EBF3",
                          display: "flex",
                          fontSize: "1rem",
                          fontWeight: 500,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box> {getFirstLetters()}</Box>
                      </Box>
                      <h1 className="level-two student-info">
                        <span> {student?.data?.nom} </span>
                        <br /> <span>{student?.data?.Matricule} </span>
                      </h1>
                    </Box>
                  </Box>
                )}
                <Tabs
                  aria-label="Basic tabs"
                  defaultValue={0}
                  sx={{
                    borderRadius: "lg",
                  }}
                >
                  <TabList>
                    <Tab sx={tabStyle}>Information</Tab>
                    <Tab sx={tabStyle}> Documents</Tab>
                  </TabList>
                  <AdmissionForm studentId={studentId} />
                </Tabs>
              </>
            )}
          </div>
        )}
        {displayVerifyAdmissionForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            <VerifyAdmissionForm studentId={studentId} student={student} />
          </div>
        )}
        {displayEditAdmissionForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            <EditAdmissionForm
              studentId={studentId}
              lastAdmission={lastAdmission}
            />
          </div>
        )}
        {displayControlAdmissionForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            {student?.loading ? (
              <Box display="flex" justifyContent="center" m={"1rem"}>
                <ClockLoader color="#43a81f" />
              </Box>
            ) : (
              <>
                {" "}
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "100px",
                        background: "#E4EBF3",
                        display: "flex",
                        fontSize: "1rem",
                        fontWeight: 500,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box> {getFirstLetters()}</Box>
                    </Box>
                    <h1 className="level-two student-info">
                      <span> {student?.data?.nom} </span>
                      <br /> <span>{student?.data?.Matricule} </span>
                    </h1>
                  </Box>
                </Box>
                <AdmissionControlForm studentId={studentId} student={student} />
              </>
            )}
          </div>
        )}
        {displayEditRegisterForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            {student?.loading ? (
              <Box display="flex" justifyContent="center" m={"1rem"}>
                <ClockLoader color="#43a81f" />
              </Box>
            ) : (
              <>
                <Tabs
                  aria-label="Basic tabs"
                  defaultValue={0}
                  sx={{
                    borderRadius: "lg",
                  }}
                >
                  <TabList>
                    <Tab sx={tabStyle}>Information</Tab>
                    <Tab sx={tabStyle}> Parent</Tab>
                  </TabList>
                  <EditRegisterForm studentId={studentId} student={student} />
                </Tabs>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
