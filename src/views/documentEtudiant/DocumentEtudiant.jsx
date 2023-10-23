/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import "./documentEtudiant.scss";
import { Topbar } from "components";
import { Sidebar, tabStyle } from "views";
import MUIDataTable from "mui-datatables";
import { Box, Button, Menu, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchpaymentById } from "redux/paymentFeatures";
import { ClockLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import api from "services/api";

export const DocumentEtudiant = () => {
  const [toggle, setToggle] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  const userParent = JSON.parse(localStorage.getItem("userData"));
  const parent = user?.roles[0] === "ROLE_PARENT" ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentById = useSelector((state) => state.paymentById);
  const [studentId, setStudentId] = useState("");
  const childId = studentId || user?.id;
  const [studentNote, setStudentNote] = useState();
  const [studentAttendances, setStudentAttendances] = useState([]);
  const [loader, setLoader] = useState(null);

  //mui menu handler
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchpaymentById(childId));
      getStudentAttendance();
      studentNotes();
    }
    return () => {
      isCancelled = true;
    };
  }, [childId]);

  const displayAttestation = () => {
    navigate(`paiement/${childId}`);
  };

  const studentNotes = () => {
    api.getStudentNotes(childId).then((res) => {
      setStudentNote(res.data);
    });
  };

  const getStudentAttendance = () => {
    setLoader(<ClockLoader color="#43a81f" />);
    api.getAssiduteByStudent(childId).then((res) => {
      if (res?.data) {
        setLoader();
        setStudentAttendances(res?.data);
      }
    });
  };

  //get name firt letter
  const getFirstLetters = (nom) => {
    const firstLetters = nom
      ?.split(" ")
      ?.map((word) => word.charAt(0))
      .join("");

    return firstLetters;
  };

  //paiement data columns
  const columnsPaiments = [
    { label: "Code", name: "id", options: { display: false } },

    {
      label: "Date paiement",
      name: "date",
      options: {
        display: true,
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
      label: "Montant",
      name: "montant",
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
      label: "Mode paiement",
      name: "mode_paiement",
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
              <Button
                className="certificat-button"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => {
                  handleClick(event);
                }}
                style={{
                  background: "#F2F6F9",
                  color: "#393939",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: "500",
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  padding: 8,
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  width: "13rem",
                }}
              >
                Imprimer
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Button
                  className="afficher-button"
                  style={{
                    fontSize: "12px",
                    background: "#C3C2E0",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontFamily: ["Poppins", "sans-serif"].join(","),
                  }}
                  onClick={() => {
                    displayAttestation();
                  }}
                >
                  Imprimer paiement
                </Button>
              </Menu>
            </>
          );
        },
      },
    },
  ];

  const columnsNotes = [
    { label: "", name: "id", options: { display: false } },
    {
      label: "EC",
      name: "element.nom_element",
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
      label: "DEVOIR/EXAMEN/TP",
      name: "categorie",
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
      label: "N0TE",
      name: "note",
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
  ];

  const studentAttendancesList = [
    {
      label: "Date",
      name: "date",
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
              {tableMeta.rowData[0]}
            </td>
          );
        },
      },
    },
    {
      label: "Cours",
      name: "ec",
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
      label: "Absence/Retard",
      name: "categorie",
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
              {tableMeta.rowData[2] === "Absent" && (
                <span style={{ color: "#e08d8d" }}>
                  {" "}
                  {tableMeta.rowData[2]}{" "}
                </span>
              )}
              {tableMeta.rowData[2] === "En retard" && (
                <span style={{ color: "#939372" }}>
                  {" "}
                  {tableMeta.rowData[2]}{" "}
                </span>
              )}
            </td>
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
          {parent && (
            <Topbar
              currentViewTitle="USSD > Parent > Enfants > Dossiers"
              afficherBtn={false}
            />
          )}
          {!parent && (
            <Topbar
              currentViewTitle={`USSD > Etudiants > Dossiers > ${user?.nom}`}
              afficherBtn={false}
            />
          )}
          {parent && (
            <Box
              style={{
                marginTop: "1rem",
                background: "#fff",
                padding: "15px",
                borderRadius: "10px",
                display: "flex",
                gap: "1rem",
                cursor: "pointer",
              }}
            >
              {userParent?.enfant?.map((child) => {
                return (
                  <Box
                    key={child.id}
                    onClick={() => setStudentId(child.id)}
                    style={{
                      background: "#F3F9F2",
                      borderRadius: "10px",
                      padding: "10px 15px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Box
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50px",
                        background: "lightgray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box> {getFirstLetters(child?.nom)}</Box>
                    </Box>
                    <Box>
                      {" "}
                      <Typography style={{ fontSize: "10px" }}>
                        {" "}
                        {child?.nom}
                      </Typography>{" "}
                      <Typography style={{ fontSize: "10px" }}>
                        {" "}
                        2022M141{" "}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

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
                  <Tab sx={tabStyle}>Paiements</Tab>

                  <Tab sx={tabStyle}> Notes & Évaluation </Tab>
                  <Tab sx={tabStyle}>Assiduités </Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2 }}>
                  {paymentById?.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    <MUIDataTable
                      data={paymentById?.data?.paiements}
                      columns={columnsPaiments}
                      options={options}
                    />
                  )}
                </TabPanel>

                <TabPanel value={1} sx={{ p: 2 }}>
                  <MUIDataTable
                    data={studentNote}
                    columns={columnsNotes}
                    options={options}
                  />
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2 }}>
                  {loader && (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      {loader}
                    </Box>
                  )}
                  <MUIDataTable
                    data={studentAttendances}
                    columns={studentAttendancesList}
                    options={options}
                  />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
