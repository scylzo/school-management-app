/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Box, Button, Menu } from "@mui/material";
import { ClockLoader } from "react-spinners";
import { Sidebar, Topbar } from "components";
import { fetchStudents } from "redux/studentFeatures";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Certification = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.student);
  const [studentId, setStudentId] = useState();

  //mui menu handler
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //get students
  const allStudents = data?.rows;

  console.log(allStudents);

  // get student by Id
  const studentObject = allStudents?.find(
    (student) => student.id === studentId
  );

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchStudents());
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleRedirectToCertificat = () => {
    navigate(`certificat/${studentId}`);
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
      label: "Matricule",
      name: "Matricule",
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
            <Box>
              <Button
                id="basic-button_"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => {
                  handleClick(event);
                  setStudentId(tableMeta.rowData[0]);
                }}
                style={{
                  background: "#D4F4D7",
                  color: "#68727B",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: "500",
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  padding: 8,
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  width: "8rem",
                }}
              >
                Certificats
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button_",
                }}
              >
                <Box>
                  {studentObject?.admission.map((item) => {
                    return (
                      <Button
                        style={{
                          color: "#9FA9B2",
                          fontSize: "12px",
                          fontFamily: ["Poppins", "sans-serif"].join(","),
                          border: "none",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleRedirectToCertificat();
                          localStorage.setItem("admissionId", item?.id);
                        }}
                      >
                        {item?.Cycle}
                      </Button>
                    );
                  })}
                </Box>
              </Menu>
            </Box>
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
          <Topbar
            currentViewTitle={"USSD > Administration > Certificats"}
            afficherBtn={false}
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
