/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { ClockLoader } from "react-spinners";
import { Box } from "@mui/system";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { useDispatch, useSelector } from "react-redux";

import { Topbar } from "components";
import { Sidebar, tabStyle } from "views";
import { fetchPer } from "redux/personnelFeatures/perFeatures";
import { fetchPats } from "redux/personnelFeatures/patsFeatures";
import PerForm from "./PerForm";
import PatsForm from "./PatsForm";
import EditPerForm from "./EditPerForm";
import EditPatsForm from "./EditPatsForm";
import { updateUserStatus } from "redux/userFeatures";

export const Personnel = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const per = useSelector((state) => state.per);
  const pats = useSelector((state) => state.pats);

  const [userId, setUserId] = useState("");
  const [displayPerForm, setDisplayPerForm] = useState(true);
  const [displayPatsForm, setDisplayPatsForm] = useState(false);
  const [displayPatsEditForm, setDisplayPatsEditForm] = useState(false);
  const [displayPerEditForm, setDisplayPerEditForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPer());
    dispatch(fetchPats());
  }, []);

  const displayPer = () => {
    setDisplayPerForm((prev) => (prev = true));
    setDisplayPatsForm((prev) => (prev = false));
    setDisplayPatsEditForm((prev) => (prev = false));
    setDisplayPerEditForm((prev) => (prev = false));
  };
  const displayPats = () => {
    setDisplayPerForm((prev) => (prev = false));
    setDisplayPatsForm((prev) => (prev = true));
    setDisplayPatsEditForm((prev) => (prev = false));
    setDisplayPerEditForm((prev) => (prev = false));
  };

  const displayEditPer = () => {
    setDisplayPerForm((prev) => (prev = false));
    setDisplayPatsForm((prev) => (prev = false));
    setDisplayPatsEditForm((prev) => (prev = false));
    setDisplayPerEditForm((prev) => (prev = true));
  };

  const displayEditPats = () => {
    setDisplayPerForm((prev) => (prev = false));
    setDisplayPatsForm((prev) => (prev = false));
    setDisplayPatsEditForm((prev) => (prev = true));
    setDisplayPerEditForm((prev) => (prev = false));
  };

  const updateStatus = (body) => {
    const { id, etat } = body;
    dispatch(updateUserStatus({ id, etat }));
  };

  //Per data columns
  const columnsPer = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "nom",
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
                  displayEditPer();
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
  const columnsPats = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "nom",
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
                  displayEditPats();
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
            currentViewTitle="USSD > Administration > Personnels"
            afficherBtn={false}
          />
          <div className="main-content">
            <Tabs
              aria-label="Basic tabs"
              defaultValue={0}
              sx={{
                borderRadius: "lg",
              }}
            >
              <TabList>
                <Tab sx={tabStyle} onClick={() => displayPer()}>
                  {" "}
                  PER
                </Tab>
                <Tab sx={tabStyle} onClick={() => displayPats()}>
                  {" "}
                  PATS
                </Tab>
              </TabList>
              <TabPanel value={0} sx={{ p: 2 }}>
                {per?.loading ? (
                  <Box display="flex" justifyContent="center" m={"1rem"}>
                    <ClockLoader color="#122a0a" />
                  </Box>
                ) : (
                  <MUIDataTable
                    data={per?.data?.rows}
                    columns={columnsPer}
                    options={options}
                  />
                )}
              </TabPanel>
              <TabPanel value={1} sx={{ p: 2 }}>
                {pats?.loading ? (
                  <Box display="flex" justifyContent="center" m={"1rem"}>
                    <ClockLoader color="#122a0a" />
                  </Box>
                ) : (
                  <MUIDataTable
                    data={pats?.data?.rows}
                    columns={columnsPats}
                    options={options}
                  />
                )}
              </TabPanel>
            </Tabs>
          </div>
        </div>
        {displayPerForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            <PerForm />
          </div>
        )}
        {displayPatsForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            <PatsForm />
          </div>
        )}
        {displayPatsEditForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            <EditPatsForm userId={userId} />
          </div>
        )}
        {displayPerEditForm && (
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            <EditPerForm userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
};
