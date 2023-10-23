/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Box } from "@mui/material";
import { ClockLoader } from "react-spinners";
import { Sidebar, Topbar } from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserStatus } from "redux/userFeatures";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EditUser from "./EditUser";

export const Users = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const updateStatus = (body) => {
    const { id, etat } = body;
    dispatch(updateUserStatus({ id, etat }));
  };
  //student data columns
  const columnUsers = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "nom",
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
      label: "Nom d'utilisateur",
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
      name: "nationalite",
      label: "Nationalite",
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
        display: false,
      },
    },
    {
      name: "tel_fixe",
      label: "Tel fixe",
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
        display: false,
      },
    },
    {
      name: "tel_mobile",
      label: "Tel mobile",
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
      name: "email",
      label: "Email",
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
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {tableMeta.rowData[7] === "activated" ? (
                <button
                  onClick={() =>
                    updateStatus({
                      etat: tableMeta.rowData[7],
                      id: tableMeta.rowData[0],
                    })
                  }
                  style={{
                    background: "#fdeeef",
                    color: "#68727B",
                    fontSize: "10px",
                    border: "none",
                    padding: "3px 5px",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Désactiver{" "}
                </button>
              ) : tableMeta.rowData[7] === "deactivated" ? (
                <button
                  onClick={() =>
                    updateStatus({
                      etat: tableMeta.rowData[7],
                      id: tableMeta.rowData[0],
                    })
                  }
                  style={{
                    background: "#f2eefd",
                    margin: "2px",
                    borderRadius: "3px",
                    color: "#68727B",
                    fontSize: "10px",
                    border: "none",
                    padding: "3px 5px",
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
                  marginLeft: "5px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setUserId(tableMeta.rowData[0]);
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
            currentViewTitle={"USSD > Administration > Utilisateurs"}
            afficheSearchInput={false}
            afficherBtn={false}
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
              {users?.loading ? (
                <Box display="flex" justifyContent="center" m={"1rem"}>
                  <ClockLoader color="#43a81f" />
                </Box>
              ) : (
                <MUIDataTable
                  data={users?.data}
                  columns={columnUsers}
                  options={options}
                />
              )}
            </div>
          </div>
        </div>
        <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
          <EditUser userId={userId} />
        </div>
      </div>
    </div>
  );
};
