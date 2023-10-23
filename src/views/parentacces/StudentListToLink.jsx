/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";
import CloseIcon from "@mui/icons-material/Close";
import Popover from "@mui/material/Popover";
import PreviewIcon from "@mui/icons-material/Preview";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { fetchStudents } from "redux/studentFeatures";
import Notiflix from "notiflix";
import { affectParent } from "redux/parentFeatures";
import { FormBtn } from "components";

Notiflix.Confirm.init({
  fontFamily: ["Poppins", "sans-serif"].join(","),
  titleColor: "red",
  messageColor: "#9fa9b2",
  okButtonBackground: "#43a81f",
  cancelButtonBackground: "#e95060",
  buttonsFontSize: "12px",
  position: "right-top",
});
const StudentListToLink = ({ parentFirstName, parentLastName, parentId }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.student);
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
  }, [parentId]);

  const handleAffectation = (ids) => {
    const { idParent, childId } = ids;
    if (parentId === idParent) {
      Notiflix.Notify.warning("Enfant dèja affecté");
    } else {
      dispatch(affectParent({ parentId, childId }));
    }
  };

  const confirmLink = (ids) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir Affecter cet etudiant à ce parent ?",
      "Confirmer",
      "Annuler",
      () => {
        handleAffectation(ids);
      }
    );
  };

  //get students
  const allStudents = data?.rows;

  //student data columns
  const columnsStudent = [
    { label: "Code", name: "id", options: { display: false } },
    {
      name: "nom",
      label: "Nom",
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
    { label: "Matricule", name: "Matricule", options: { display: false } },
    { label: "Numéro", name: "tel_mobile", options: { display: false } },
    {
      label: "Affecté",
      name: "parentId",
      options: {
        display: true,
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
          const id = tableMeta.rowData[4];
          if (id !== null) {
            return (
              <td style={{ color: "#1B2126", fontWeight: "700" }}>
                <SpellcheckIcon sx={{ color: "green" }} />
              </td>
            );
          } else
            return (
              <td style={{ color: "#1B2126", fontWeight: "700" }}>
                <CloseIcon sx={{ color: "red" }} />
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
                  <Typography sx={{ fontSize: "12px" }}>
                    Nom : {studentName}
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    Matricule : {studentMatricule}
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    Num : {studentNumero}
                  </Typography>
                </Box>
              </Popover>
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
                  confirmLink({
                    idParent: tableMeta.rowData[2],
                    childId: tableMeta.rowData[0],
                  });
                }}
              >
                Lier
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
      <div className="right-content" style={{ padding: "1rem" }}>
        {parentFirstName && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h1 style={{ fontSize: "14px" }}>
              Parent :{" "}
              <span style={{ color: "green" }}>
                {" "}
                {parentFirstName} {parentLastName}
              </span>
            </h1>
            <FormBtn
              onClick={() => window.location.reload(true)}
              buttonText="Annuler"
              bgNormalColor="#e95060"
              width_="20%"
            />
          </Box>
        )}
        {loading ? (
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
    </>
  );
};

export default StudentListToLink;
