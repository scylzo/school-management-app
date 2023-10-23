/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Box, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import { ClockLoader } from "react-spinners";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector, useDispatch } from "react-redux";
import { Sidebar, Topbar } from "components";
import {
  fetchAnneeAcad,
  fetchClasse,
  fetchSemestre,
} from "redux/scolariteFeatures";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";

export const Assidute = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  //mui menu handler
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classe);
  const anneeAcad = useSelector((state) => state.anneeAcad);
  const [semestreData, setSemestreData] = useState();
  const [anAcad, setAnAcad] = useState("");
  const [classeName, setClasseName] = useState("");
  const [classeId, setClasseId] = useState("");
  const transformedName = classeName?.split("/").join("-");
  const classeSemestre = classes?.data?.filter((item) => item.id === classeId);

  useEffect(() => {
    dispatch(fetchClasse());
    dispatch(fetchAnneeAcad());
    dispatch(fetchSemestre());
  }, []);

  const handleChangeAnneeAcad = (event) => {
    setAnAcad(event.target.value);
  };
  const handleSemestreData = (event) => {
    setSemestreData(event.target.value);
  };

  const handlePersitClasseData = () => {
    if (semestreData) {
      localStorage.setItem("semestreData", semestreData);
    }

    localStorage.setItem("anAcad", anAcad);
    localStorage.setItem("classId", classeId);
  };

  const displayAssidute = () => {
    if (semestreData) {
      navigate(`absence-retard/${transformedName}`);
    } else {
      Notiflix.Notify.warning(
        "veuillez spécifier l'année académique et/ou le semestre"
      );
    }
  };

  const columnsClasse = [
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
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => {
                  handleClick(event);
                  setClasseId(tableMeta.rowData[0]);
                  setClasseName(tableMeta.rowData[1]);
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
                  width: "15rem",
                }}
              >
                Absence/Retard
                <ArrowDropDownIcon sx={{ ml: 5, color: "#B1BBC6" }} />
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
                <Box display="flex" flexDirection="column" gap="1rem" pt={1}>
                  <select
                    onChange={handleChangeAnneeAcad}
                    className="dropdown-custom"
                    style={{
                      color: "#9FA9B2",
                      fontSize: "12px",
                      fontFamily: ["Poppins", "sans-serif"].join(","),
                      border: "none",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Année académique</option>
                    {anneeAcad?.data?.map((item) => {
                      return <option value={item?.name}>{item.name}</option>;
                    })}
                  </select>
                  <select
                    onChange={handleSemestreData}
                    className="dropdown-custom"
                    style={{
                      color: "#9FA9B2",
                      fontSize: "12px",
                      fontFamily: ["Poppins", "sans-serif"].join(","),
                      border: "none",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Semestre</option>
                    {classeSemestre[0]?.semestre?.map((item) => {
                      return (
                        <option value={JSON.stringify(item)}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>

                  <Box display="flex" flexDirection="column" gap="6px">
                    <Button
                      style={{
                        fontSize: "12px",
                        background: " #9fa9b2",
                        color: "#fff",
                        textTransform: "capitalize",
                        fontFamily: ["Poppins", "sans-serif"].join(","),
                      }}
                      onClick={() => {
                        displayAssidute();
                        handlePersitClasseData();
                      }}
                    >
                      Assiduité
                    </Button>
                  </Box>
                </Box>
              </Menu>
            </>
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
    textLabels: {
      body: {
        noMatch: "Pas de données",
      },
    },
    selectableRows: false,
    enableNestedDataAccess: ".",
  };

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container" style={{ width: "100%" }}>
          <Topbar
            currentViewTitle="USSD > Administration > Emploi du temps"
            afficheSearchInput={false}
            afficherBtn={false}
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
              {classes?.loading ? (
                <Box display="flex" justifyContent="center" m={"1rem"}>
                  <ClockLoader color="#43a81f" />
                </Box>
              ) : (
                <MUIDataTable
                  data={classes?.data}
                  columns={columnsClasse}
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
