/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Sidebar } from "views";
import { Topbar } from "components";
import { Button, Menu } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AttestationCertificatEtudiant = () => {
  const [toggle, setToggle] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  const admissions = user?.admission;

  //mui menu handler
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const displayAttestation = () => {
    navigate(`certificat-inscription/${userId}`);
  };

  //student data columns
  const columnsStudent = [
    { label: "Code", name: "id", options: { display: false } },
    {
      name: "Date_admission",
      label: "Date ",
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
      name: "filiere_etude",
      label: "Filière",
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
      name: "userId",
      label: "ID",
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
              <Button
                className="certificat-button"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => {
                  handleClick(event);
                  setUserId(tableMeta.rowData[3]);
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
                Certificat
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
                  Afficher Certificat
                </Button>
              </Menu>
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
    textLabels: {
      body: {
        noMatch: "Pas de données",
      },
    },
    selectableRows: false,
    enableNestedDataAccess: ".",
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
            currentViewTitle="USSD > Etudiant > Attestations & Cértificats"
            afficherBtn={false}
          />
          <div className="main-content">
            <MUIDataTable
              data={admissions}
              columns={columnsStudent}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
