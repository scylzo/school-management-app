/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Popover from "@mui/material/Popover";
import PreviewIcon from "@mui/icons-material/Preview";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "redux/studentFeatures";
import { AddPaiementForm } from "./AddPaiementForm";
import { Box, Typography } from "@mui/material";

const PaymentStudentList = (editForm) => {
  const dispatch = useDispatch();
  const allStudent = useSelector((state) => state.student);
  const [displayPaymentForm, setDisplayPaymentForm] = useState(false);
  const [displayPaymentList, setDisplayPaymentList] = useState(true);
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState("");
  const [studentMatricule, setStudentMaricule] = useState("");
  const [studentNumero, setStudentNumero] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const student = allStudent?.data.rows?.filter(
    (item) => item.id === studentId
  );

  const handleDisplayStudentList = () => {
    setDisplayPaymentList(true);
    setDisplayPaymentForm(false);
  };

  const handleDisplayPaymentForm = () => {
    setDisplayPaymentForm(true);
    setDisplayPaymentList(false);
  };

  //student data columns
  const columnsStudent = [
    { label: "Code", name: "id", options: { display: false } },
    {
      name: "nom",
      label: "Nom",
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
      name: "Matricule",
      label: "Matricule",
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
      name: "email",
      label: "Email",
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
            <Box display={"flex"} alignItems="center">
              <PreviewIcon
                sx={{ mr: "5px", cursor: "pointer" }}
                onClick={(event) => {
                  handleClick(event);
                  setStudentName(tableMeta.rowData[1]);
                  setStudentMaricule(tableMeta.rowData[2]);
                  setStudentNumero(tableMeta.rowData[3]);
                }}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box
                  p={2}
                  style={{ background: "#eaf7d4", borderRadius: "10px" }}
                >
                  {" "}
                  <Typography sx={{ fontSize: "10px" }}>
                    Nom : {studentName}
                  </Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    Matricule : {studentMatricule}
                  </Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    Num : {studentNumero}
                  </Typography>
                </Box>
              </Popover>
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
                  handleDisplayPaymentForm();
                  setStudentId(tableMeta.rowData[0]);
                }}
              >
                Paiement
              </button>
            </Box>
          );
        },
      },
    },
  ];

  //mui options
  const options = {
    filter: false,
    viewColumns: false,
    pagination: false,
    print: false,
    download: false,
    selectableRows: false,
    enableNestedDataAccess: ".",
  };

  return (
    <>
      {displayPaymentList && (
        <>
          {" "}
          {/* <h1 style={{ fontSize: "12px" }}>Faire un paiement</h1> */}
          <MUIDataTable
            data={allStudent?.data?.rows}
            columns={columnsStudent}
            options={options}
          />
        </>
      )}

      {displayPaymentForm && (
        <AddPaiementForm
          handleDisplayStudentList={handleDisplayStudentList}
          student={student[0]}
        />
      )}
    </>
  );
};

export default PaymentStudentList;
