/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Box } from "@mui/material";
import { ClockLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { CustomFormControl, FormBtn, Sidebar, Topbar } from "components";
import {
  fetchadminUsers,
  updateUserProfil,
  updateUserStatus,
} from "redux/userFeatures";

import Notiflix from "notiflix";
import api from "services/api";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";

export const Gestionadministration = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminUser);
  const loggedUserData = JSON.parse(localStorage.getItem("userData"));
  const [fieldsData, setFieldsData] = useState();
  const [userId, setUserId] = useState("");
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [displayAddForm, setDisplayAddEditForm] = useState(true);
  const [values_, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      handleDisplayAddForm();
      dispatch(fetchadminUsers());
      api.getUserById(loggedUserData?.id).then((res) => {
        if (res.data) {
          setFieldsData(res);
        }
      });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleDisplayEditForm = () => {
    setDisplayEditForm((prev) => (prev = true));
    setDisplayAddEditForm((prev) => (prev = false));
  };
  const handleDisplayAddForm = () => {
    setDisplayAddEditForm((prev) => (prev = true));
    setDisplayEditForm((prev) => (prev = false));
  };

  const updateStatus = (body) => {
    const { id, etat } = body;
    dispatch(updateUserStatus({ id, etat }));
  };

  const handleChangeValues = (event) => {
    setValues({
      ...values_,
      [event.target.name]: event.target.value,
    });
    setFieldsData("");
  };

  const handleSubmitProfilForm = (event) => {
    event.preventDefault();
    if (values_?.password.length > 0 && values_?.password.length < 8) {
      Notiflix.Notify.failure(
        "Le mot de passe doit comporter au moins 8 carractéres !"
      );
    }
    if (
      values_?.password.length > 0 &&
      values_?.password !== values_?.confirmPassword
    ) {
      Notiflix.Notify.failure("Les champs mot de passe  ne correspondent pas ");
    } else {
      dispatch(updateUserProfil({ id: loggedUserData?.id, values_ }));
    }
  };

  //student data columns
  const columnUsers = [
    { label: "N°", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "nom",
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
                  handleDisplayEditForm();
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
            currentViewTitle={"USSD > Administration > Gestion Administration"}
            afficheSearchInput={false}
            afficherBtn={false}
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
              <h1
                className="level-two"
                style={{
                  marginBottom: "2rem",
                  fontWeight: 600,
                }}
              >
                Gerer profil
              </h1>
              <form
                onSubmit={handleSubmitProfilForm}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <CustomFormControl
                  labelTitle="Username"
                  labelWidth="15%"
                  inputWidth="17rem"
                  name="username"
                  value={fieldsData?.data?.username}
                  onChange={handleChangeValues}
                />
                <CustomFormControl
                  labelTitle="Email"
                  labelWidth="15%"
                  inputWidth="17rem"
                  name="email"
                  value={fieldsData?.data?.email}
                  onChange={handleChangeValues}
                />
                <CustomFormControl
                  labelTitle="Mot de passe "
                  labelWidth="15%"
                  inputWidth="17rem"
                  name="password"
                  onChange={handleChangeValues}
                />
                <CustomFormControl
                  labelTitle="Confirmer mot de passe"
                  labelWidth="15%"
                  inputWidth="17rem"
                  name="confirmPassword"
                  onChange={handleChangeValues}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  gap="2rem"
                  mt="1rem"
                >
                  <FormBtn
                    type="submit"
                    buttonText="Enregistrer"
                    bgNormalColor="rgb(219,239,196,100)"
                    margin_=""
                    width_="10%"
                    color="rgb(57,57,57,100)"
                  />
                </Box>
              </form>
            </div>
          </div>
          <div className="main-content ifOverflow" style={{ paddingTop: 0 }}>
            <div
              className="div-area-main-content-elt"
              style={{ padding: "2rem 0" }}
            >
              {users?.loading ? (
                <Box display="flex" justifyContent="center" m={"1rem"}>
                  <ClockLoader color="#43a81f" />
                </Box>
              ) : (
                <MUIDataTable
                  data={users?.data?.rows}
                  columns={columnUsers}
                  options={options}
                />
              )}
            </div>
          </div>
        </div>
        <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
          {displayAddForm && <AddAdmin />}
          {displayEditForm && <EditAdmin userId={userId} />}
        </div>
      </div>
    </div>
  );
};
