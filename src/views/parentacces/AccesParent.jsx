/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { ClockLoader } from "react-spinners";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar, Topbar } from "components";
import { fetchParents, updateParentStatus } from "redux/parentFeatures";
import AddParentForm from "./AddParentForm";
import EditParentForm from "./EditParentForm";
import StudentListToLink from "./StudentListToLink";
import StudentList from "./StudentList";

export const AccesParent = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const parents = useSelector((state) => state.parents);
  const [displayAddParentForm, setDisplayAddParentForm] = useState(false);
  const [displayEditParentForm, setDisplayEditParentForm] = useState(false);
  const [displayStudentList, setDisplayStudentList] = useState(false);
  const [displayStudentFirst, setDisplayStudentFirst] = useState(true);
  const [parentId, setParentId] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");

  useEffect(() => {
    handleDisplayFirstStudentLisk();
    dispatch(fetchParents());
  }, []);

  const updateStatus = (body) => {
    const { id, etat } = body;
    dispatch(updateParentStatus({ id, etat }));
  };

  const displayEditForm = () => {
    setDisplayAddParentForm((prev) => (prev = false));
    setDisplayEditParentForm((prev) => (prev = true));
    setDisplayStudentList((prev) => (prev = false));
    setDisplayStudentFirst((prev) => (prev = false));
  };

  const displayList = () => {
    setDisplayAddParentForm((prev) => (prev = false));
    setDisplayEditParentForm((prev) => (prev = false));
    setDisplayStudentList((prev) => (prev = true));
    setDisplayStudentFirst((prev) => (prev = false));
  };

  const handleDisplayCreateCompteParent = () => {
    setDisplayAddParentForm((prev) => (prev = true));
    setDisplayEditParentForm((prev) => (prev = false));
    setDisplayStudentList((prev) => (prev = false));
    setDisplayStudentFirst((prev) => (prev = false));
  };
  const handleDisplayFirstStudentLisk = () => {
    setDisplayStudentFirst((prev) => (prev = true));
    setDisplayAddParentForm((prev) => (prev = false));
    setDisplayEditParentForm((prev) => (prev = false));
    setDisplayStudentList((prev) => (prev = false));
  };

  //Parents data columns
  const columnsParent = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Prénom",
      name: "prenom",
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
      name: "nom",
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
      label: "Username",
      name: "username",
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
      label: "Tél",
      name: "tel",
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
      label: "Email",
      name: "email",
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
      name: "etat",
      label: "Etat",
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
      label: "Action",
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
          return (
            <>
              {tableMeta.rowData[5] === "activated" ? (
                <button
                  onClick={() =>
                    updateStatus({
                      etat: tableMeta.rowData[5],
                      id: tableMeta.rowData[0],
                    })
                  }
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
                >
                  Désactiver{" "}
                </button>
              ) : tableMeta.rowData[5] === "deactivated" ? (
                <button
                  onClick={() =>
                    updateStatus({
                      etat: tableMeta.rowData[5],
                      id: tableMeta.rowData[0],
                    })
                  }
                  style={{
                    background: "#d7f7d4",
                    padding: "3px 5px",
                    margin: "2px",
                    borderRadius: "3px",
                    color: "#68727B",
                    fontSize: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Activer{" "}
                </button>
              ) : (
                ""
              )}

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
                  displayEditForm();
                  setParentId((prev) => (prev = tableMeta.rowData[0]));
                }}
              >
                Editer
              </button>
              <button
                type="button"
                style={{
                  background: "#d4e6f7",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  displayList();
                  setParentId((prev) => (prev = tableMeta.rowData[0]));
                  setParentFirstName((prev) => (prev = tableMeta.rowData[1]));
                  setParentLastName((prev) => (prev = tableMeta.rowData[2]));
                }}
              >
                Affecter
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
            currentViewTitle={"USSD > Administration > Accès Parents"}
            afficheSearchInput={false}
            afficherBtn={true}
            onClick={() => handleDisplayCreateCompteParent()}
            title="Créer un compte parent"
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
              {parents?.loading ? (
                <Box display="flex" justifyContent="center" m={"1rem"}>
                  <ClockLoader color="#122a0a" />
                </Box>
              ) : (
                <MUIDataTable
                  data={parents?.data}
                  columns={columnsParent}
                  options={options}
                />
              )}
            </div>
          </div>
        </div>

        {displayAddParentForm && <AddParentForm parentId={parentId} />}
        {displayEditParentForm && <EditParentForm parentId={parentId} />}
        {displayStudentFirst && (
          <StudentList
            parentId={parentId}
            parentFirstName={parentFirstName}
            parentLastName={parentLastName}
          />
        )}
        {displayStudentList && (
          <StudentListToLink
            parentId={parentId}
            parentFirstName={parentFirstName}
            parentLastName={parentLastName}
          />
        )}
      </div>
    </div>
  );
};
