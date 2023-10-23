/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Box } from "@mui/system";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { ClockLoader } from "react-spinners";
import { Topbar } from "components";
import { Sidebar, tabStyle } from "views";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteAnneeAcad,
  deleteClasse,
  deleteFiliere,
  deleteNiveau,
  deleteSemestre,
  deleteUe,
  fetchAnneeAcad,
  fetchClasse,
  fetchEC,
  fetchFiliere,
  fetchNiveau,
  fetchSemestre,
  fetchUE,
} from "redux/scolariteFeatures";
import AddAnneeAcadForm from "./AddAnneeAcadForm";
import EditAnneeAcadForm from "./EditAnneeAcadForm";
import Notiflix from "notiflix";
import AddSemestreForm from "./AddSemestreForm";
import AddNiveauForm from "./AddNiveauForm";
import AddFiliereForm from "./AddFiliereForm";
import AddUeForm from "./AddUeForm";
import EditUeForm from "./EditUeForm";
import AddEcForm from "./AddEcForm";
import EditEcForm from "./EditEcForm";
import AddClasseForm from "./AddClasseForm";
import EditClasseForm from "./EditClasseForm";

export const Scolarite = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  //scolarite reducers
  const filieres = useSelector((state) => state.filiere);
  const anneeAcad = useSelector((state) => state.anneeAcad);
  const semestre = useSelector((state) => state.semestre);
  const niveaux = useSelector((state) => state.niveau);
  const ue = useSelector((state) => state.ue);
  const ec = useSelector((state) => state.ec);
  const classes = useSelector((state) => state.classe);

  //ids
  const [anneeAcadId, setAnneeAcadId] = useState("");
  const [ueId, setUeId] = useState("");
  const [ecId, setEcId] = useState("");
  const [idClasse, setIdClasse] = useState();

  useEffect(() => {
    dispatch(fetchFiliere());
    dispatch(fetchAnneeAcad());
    dispatch(fetchSemestre());
    dispatch(fetchNiveau());
    dispatch(fetchUE());
    dispatch(fetchEC());
    dispatch(fetchClasse());
  }, []);

  const confirmDeleteAnneeAcad = (anneeAcadId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir supprimer?",
      "Confirmer",
      "Annuler",

      () => {
        dispatch(deleteAnneeAcad(anneeAcadId));
      }
    );
  };

  const confirmDeleteSemestre = (semestreId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteSemestre(semestreId));
      }
    );
  };

  const confirmDeleteNiveau = (niveauId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteNiveau(niveauId));
      }
    );
  };
  const confirmDeleteFiliere = (filiereId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteFiliere(filiereId));
      }
    );
  };
  const confirmDeleteUe = (ueId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteUe(ueId));
      }
    );
  };
  const confirmDeleteClasse = (classeId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteClasse(classeId));
      }
    );
  };

  //switch between add forms
  const [anneeForm, setAnneeForm] = useState(true);
  const [semestreForm, setSemestreForm] = useState(false);
  const [niveauForm, setNiveauForm] = useState(false);
  const [filiereForm, setFiliereForm] = useState(false);
  const [ueForm, setUeForm] = useState(false);
  const [ecForm, setEcForm] = useState(false);
  const [classe, setClasse] = useState(false);

  const columnsFilieres = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "name",
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
      label: "Date création",
      name: "createdAt",
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
          const index = tableMeta.rowData.findIndex((el) => el?.length === 24);
          return <span>{tableMeta.rowData[index]?.substring(0, 10)} </span>;
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
              <button
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
                onClick={() => confirmDeleteFiliere(tableMeta.rowData[0])}
              >
                Supprimer
              </button>
            </>
          );
        },
      },
    },
  ];
  const columnsAnneeAcad = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Année Académique",
      name: "name",
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
      label: "Année en cours",
      name: "annee_en_cours",
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
                  afficheEditAnneeForm();
                  setAnneeAcadId((prev) => (prev = tableMeta.rowData[0]));
                }}
              >
                Editer
              </button>
              <button
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
                onClick={() => confirmDeleteAnneeAcad(tableMeta.rowData[0])}
              >
                Supprimer
              </button>
            </>
          );
        },
      },
    },
  ];
  const columnSemestre = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "name",
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
                style={{
                  background: "#fdeeef",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                }}
                onClick={() => confirmDeleteSemestre(tableMeta.rowData[0])}
              >
                Retirer
              </button>
            </>
          );
        },
      },
    },
  ];
  const columnsNiveau = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "name",
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
              <button
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
                onClick={() => confirmDeleteNiveau(tableMeta.rowData[0])}
              >
                Retirer
              </button>
            </>
          );
        },
      },
    },
  ];
  const columnsUE = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "nom_matiere",
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
      label: "Reference",
      name: "reference",
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
      label: "Semestre",
      name: "nom_semestre",
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
      label: "Crédit",
      name: "credit",
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
      label: "Type",
      name: "Type_matiere",
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
                  afficheUeEditForm();
                  setUeId((prev) => (prev = tableMeta.rowData[0]));
                }}
              >
                Editer
              </button>
              <button
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
                onClick={() => confirmDeleteUe(tableMeta.rowData[0])}
              >
                Supprimer
              </button>
            </>
          );
        },
      },
    },
  ];
  const columnsEC = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "REFERENCE",
      name: "reference",
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
      label: "NOM E.C",
      name: "nom_element",
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
      label: "CM",
      name: "cm",
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
      label: "STAGE",
      name: "stage",
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
      label: "TP_TD",
      name: "TP_TD",
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
      label: "TPE",
      name: "TPE",
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
      label: "VHT",
      name: "VHT",
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
                  afficheEcEditForm();
                  setEcId((prev) => (prev = tableMeta.rowData[0]));
                }}
              >
                Editer
              </button>

              <button
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
                // onClick={() => confirmDelete(tableMeta.rowData[0])}
              >
                Supprimer
              </button>
            </>
          );
        },
      },
    },
  ];
  const columnsClasses = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Classe",
      name: "classe",
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
      label: "Filière",
      name: "departement",
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
      label: "Niveau",
      name: "niveau",
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
              <button
                onClick={() => {
                  afficheclasseEditForm();
                  setIdClasse(tableMeta.rowData[0]);
                }}
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
              >
                Editer
              </button>
              <button
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
                onClick={() => confirmDeleteClasse(tableMeta.rowData[0])}
              >
                Retirer
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

  //switch between edit forms
  const [anneeAcadEditForm, setAnneeAcadEditForm] = useState(false);
  const [ueEditForm, setUeEditForm] = useState(false);
  const [ecEditForm, setEcEditForm] = useState(false);
  const [classeEditForm, setClasseEditForm] = useState(false);

  const afficheAnneeForm = () => {
    setAnneeForm(true);
    setAnneeAcadEditForm(false);
    setSemestreForm(false);
    setNiveauForm(false);
    setFiliereForm(false);
    setUeForm(false);
    setEcForm(false);
    setClasse(false);
    setUeEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };
  const afficheEditAnneeForm = () => {
    setAnneeAcadEditForm(true);
    setAnneeForm(false);
    setSemestreForm(false);
    setNiveauForm(false);
    setFiliereForm(false);
    setUeForm(false);
    setEcForm(false);
    setClasse(false);
    setUeEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };
  const afficheSemestreForm = () => {
    setSemestreForm(true);
    setAnneeForm(false);
    setNiveauForm(false);
    setFiliereForm(false);
    setUeForm(false);
    setEcForm(false);
    setClasse(false);
    setAnneeAcadEditForm(false);
    setUeEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };

  const afficheCycleForm = () => {
    setNiveauForm(true);
    setSemestreForm(false);
    setAnneeForm(false);
    setFiliereForm(false);
    setUeForm(false);
    setEcForm(false);
    setClasse(false);
    setAnneeAcadEditForm(false);
    setUeEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };
  const afficheFiliereForm = () => {
    setFiliereForm(true);
    setNiveauForm(false);
    setSemestreForm(false);
    setAnneeForm(false);
    setUeForm(false);
    setEcForm(false);
    setClasse(false);
    setAnneeAcadEditForm(false);
    setUeEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };
  const afficheUeForm = () => {
    setUeForm(true);
    setFiliereForm(false);
    setNiveauForm(false);
    setSemestreForm(false);
    setAnneeForm(false);
    setEcForm(false);
    setClasse(false);
    setAnneeAcadEditForm(false);
    setUeEditForm(false);
    setUeEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };
  const afficheUeEditForm = () => {
    setUeEditForm(true);
    setUeForm(false);
    setFiliereForm(false);
    setNiveauForm(false);
    setSemestreForm(false);
    setAnneeForm(false);
    setEcForm(false);
    setClasse(false);
    setAnneeAcadEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };
  const afficheEcForm = () => {
    setEcForm(true);
    setUeForm(false);
    setFiliereForm(false);
    setNiveauForm(false);
    setSemestreForm(false);
    setAnneeForm(false);
    setClasse(false);
    setAnneeAcadEditForm(false);
    setUeEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };
  const afficheEcEditForm = () => {
    setEcEditForm(true);
    setEcForm(false);
    setUeForm(false);
    setFiliereForm(false);
    setNiveauForm(false);
    setSemestreForm(false);
    setAnneeForm(false);
    setClasse(false);
    setAnneeAcadEditForm(false);
    setUeEditForm(false);
    setClasseEditForm(false);
  };
  const afficheclasse = () => {
    setClasse(true);
    setEcForm(false);
    setUeForm(false);
    setFiliereForm(false);
    setNiveauForm(false);
    setSemestreForm(false);
    setAnneeForm(false);
    setAnneeAcadEditForm(false);
    setUeEditForm(false);
    setEcEditForm(false);
    setClasseEditForm(false);
  };
  const afficheclasseEditForm = () => {
    setClasseEditForm(true);
    setClasse(false);
    setEcForm(false);
    setUeForm(false);
    setFiliereForm(false);
    setNiveauForm(false);
    setSemestreForm(false);
    setAnneeForm(false);
    setAnneeAcadEditForm(false);
    setUeEditForm(false);
    setEcEditForm(false);
  };

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD >  Administration > Filières"
            afficherBtn={false}
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
              <h1 className="level-two level-two_"> Scolarité</h1>
              <Tabs
                aria-label="Basic tabs"
                defaultValue={0}
                sx={{
                  borderRadius: "lg",
                }}
              >
                <TabList>
                  <Tab sx={tabStyle} onClick={() => afficheAnneeForm()}>
                    Années Academique
                  </Tab>
                  <Tab sx={tabStyle} onClick={() => afficheSemestreForm()}>
                    {" "}
                    Semestre
                  </Tab>
                  <Tab sx={tabStyle} onClick={() => afficheCycleForm()}>
                    Niveau{" "}
                  </Tab>
                  <Tab sx={tabStyle} onClick={() => afficheFiliereForm()}>
                    Filière{" "}
                  </Tab>
                  <Tab sx={tabStyle} onClick={() => afficheUeForm()}>
                    UE{" "}
                  </Tab>
                  <Tab sx={tabStyle} onClick={() => afficheEcForm()}>
                    EC{" "}
                  </Tab>
                  <Tab sx={tabStyle} onClick={() => afficheclasse()}>
                    {" "}
                    Classe{" "}
                  </Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2 }}>
                  {anneeAcad?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={anneeAcad?.data}
                      columns={columnsAnneeAcad}
                      options={options}
                    />
                  )}
                </TabPanel>
                <TabPanel value={1} sx={{ p: 2 }}>
                  {semestre?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={semestre?.data}
                      columns={columnSemestre}
                      options={options}
                    />
                  )}
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2 }}>
                  {niveaux?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={niveaux?.data}
                      columns={columnsNiveau}
                      options={options}
                    />
                  )}
                </TabPanel>
                <TabPanel value={3} sx={{ p: 2 }}>
                  {filieres?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={filieres?.data}
                      columns={columnsFilieres}
                      options={options}
                    />
                  )}
                </TabPanel>
                <TabPanel value={4} sx={{ p: 2 }}>
                  {ue?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={ue?.data}
                      columns={columnsUE}
                      options={options}
                    />
                  )}
                </TabPanel>
                <TabPanel value={5} sx={{ p: 2 }}>
                  {ec?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={ec?.data}
                      columns={columnsEC}
                      options={options}
                    />
                  )}
                </TabPanel>
                <TabPanel value={6} sx={{ p: 2 }}>
                  {classes?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={classes?.data}
                      columns={columnsClasses}
                      options={options}
                    />
                  )}
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
          {anneeForm && <AddAnneeAcadForm />}
          {anneeAcadEditForm && <EditAnneeAcadForm anneeAcadId={anneeAcadId} />}
          {semestreForm && <AddSemestreForm />}
          {niveauForm && <AddNiveauForm />}
          {filiereForm && <AddFiliereForm />}
          {ueForm && <AddUeForm />}
          {ueEditForm && <EditUeForm ueId={ueId} />}
          {ecForm && <AddEcForm />}
          {ecEditForm && <EditEcForm ecId={ecId} />}
          {classe && <AddClasseForm />}
          {classeEditForm && <EditClasseForm idClasse={idClasse} />}
        </div>
      </div>
    </div>
  );
};
