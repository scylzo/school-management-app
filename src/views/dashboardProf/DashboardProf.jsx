/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./dashboardProf.scss";
import {
  Typography,
  Box,
  Button,
  FormLabel,
  FormControlLabel,
  Checkbox,
  TextField,
  FormControl,
} from "@mui/material";
import {
  CustomFileInput,
  CustomFormControl,
  FormBtn,
  RightSidebar,
  Topbar,
} from "components";
import * as yup from "yup";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "views";
import { fetchAnneeAcad } from "redux/scolariteFeatures";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { fetchEmpTemps } from "redux/emploiDuTempsFeature";
import { fetchClasse } from "redux/scolariteFeatures";
import { ClockLoader } from "react-spinners";
import { url } from "config/config";
import empty from "../../assets/images/empty.png";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import { addSupportCours, deleteSupport } from "redux/supportCoursFeatures";
import api from "services/api";
import Notiflix from "notiflix";
import { addMessage, getlistMessage } from "redux/messageFeatures";

//notification schema
export const supportSchema = yup.object().shape({
  titre: yup.string().required("Champ obligatoire"),
  date: yup.string().required("Champ obligatoire"),
  semestre: yup.string().required("Champ obligatoire"),
});

// url  for  setting emp images
const url_ = url;

const categorieCours = [
  {
    label: "Cours",
    value: "Cours",
  },
  { label: "Exercice", value: "Exercice" },
];

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    minHeight: "28px",
    fontSize: "10px",
    p: "1rem",
    color: "#B1BBC6",
    width: "12rem",
    border: "none",
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontSize: "10px",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#9fa9b2"
        : isFocused
        ? "rgb(125,177,124,5%)"
        : "",
    };
  },
};
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();

const theDate = `${cYear}-${cMonth}-${cDay}`;

export const DashboardProf = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userData"));
  const anneeAcad = useSelector((state) => state.anneeAcad);
  const listMessage = useSelector((state) => state.listMessage);
  const empTemps = useSelector((state) => state.empTemps);
  const [image, setImage] = useState();
  const [picture, setPicture] = useState();
  const [selectOptionCategorie, setSelectOptionCategorie] = useState();
  const [classeId, setClasseId] = useState();
  const [cours, setCours] = useState();
  const [message, setMessage] = useState();
  const [classeSelect, setClasseSelect] = useState();

  const username = user?.username;
  const anAcad_ = anneeAcad?.data?.filter(
    (item) => item.annee_en_cours === "annee en cours"
  );

  //delete a payment
  const confirmDeleteSupport = (anneeAcadId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir supprimer?",
      "Confirmer",
      "Annuler",

      () => {
        dispatch(deleteSupport(anneeAcadId));
      }
    );
  };

  const empAnAcad_ = anAcad_?.pop();
  const anAcad = empAnAcad_?.name;

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchAnneeAcad());
      dispatch(fetchClasse());
      fetchCours();
    }
    return () => {
      isCancelled = true;
    };
  }, [anAcad]);

  const fetchCours = () => {
    api.getSupportCours(user?.username).then((res) => {
      if (res) setCours(res.data);
    });
  };

  const handleChangeClasse = (event) => {
    setClasseId(event.target.value);
  };

  const handleSelectCategorie = (selectOptionCategorie) => {
    setSelectOptionCategorie((prev) => (prev = selectOptionCategorie));
  };

  //handling notif image
  const handleChangeImage = (event) => {
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPicture(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
    setImage(event.target.files[0]);
  };

  const onSubmit = async (values, actions) => {
    const categorie = selectOptionCategorie.value;
    dispatch(
      addSupportCours({ values, image, categorie, anAcad, classeId, username })
    );
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      titre: "",
      date: "",
      semestre: "",
    },
    validationSchema: supportSchema,
    onSubmit,
  });

  const classe = user?.Niveau_etude?.map((item) => {
    const newC = {
      value: item?.name,
      label: item?.name,
      id: item?.id,
    };
    return newC;
  });

  const handleSelectClasse = (classeSelect) => {
    setClasseSelect((prev) => (prev = classeSelect));
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    dispatch(
      addMessage({
        classprofId: classeSelect.id,
        Annee_academique: anAcad,
        message,
        username,
        date: theDate,
      })
    );
  };

  const handleDisplayMessage = () => {
    dispatch(
      getlistMessage({
        classprofId: classeSelect?.id,
        Annee_academique: anAcad,
      })
    );
  };

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} toggle={toggle} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD > Professeur > Tableau De Bord"
            afficherBtn={false}
          />
          <div
            className="main-content"
            style={{ background: "#f8f8f8", padding: "0 1rem" }}
          >
            <Box display="flex" gap={3} className="dashboard-respo">
              <Box
                style={{
                  width: "70%",
                  borderRadius: "8px",
                  padding: "1rem",
                }}
                className="bloc-top"
              >
                <Typography fontSize="12px" fontWeight="600" mt={2} mb={2}>
                  Emploi du temps
                </Typography>
                <Box
                  display="flex"
                  gap="1rem"
                  className="classes-container-div"
                >
                  {user?.Niveau_etude?.map((item) => {
                    const classId = item?.id;
                    return (
                      <Box>
                        <Typography
                          fontSize={12}
                          fontWeight="600"
                          p={2}
                          bgcolor="#fff"
                          borderRadius={4}
                          display="flex"
                          justifyContent="center"
                        >
                          {item?.name}
                        </Typography>
                        <Box display={"flex"} p={1} gap={0.5}>
                          {item?.semestre?.map((item) => {
                            const semestre = item;
                            return (
                              <Button
                                onClick={() =>
                                  dispatch(
                                    fetchEmpTemps({
                                      anAcad,
                                      classId,
                                      semestre,
                                    })
                                  )
                                }
                                sx={{
                                  fontSize: "8px",
                                  width: "80px",
                                  fontWeight: "700",
                                  borderRadius: "10px",
                                  background: "#DFF3D9",
                                  color: "#000",
                                }}
                              >
                                {item?.name}
                              </Button>
                            );
                          })}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  display="flex"
                  gap={2}
                  pt={2}
                  style={{ width: "100%" }}
                  className="emp-data"
                >
                  {empTemps.loading ? (
                    <Box display="flex" justifyContent="center" m={"1rem"}>
                      <ClockLoader color="#43a81f" />
                    </Box>
                  ) : (
                    empTemps?.data?.map((emp) => {
                      return (
                        <Box
                          p={2}
                          bgcolor="#fff"
                          borderRadius="8px"
                          style={{ overflow: "hidden" }}
                        >
                          <img
                            style={{ width: "90%" }}
                            src={`${url_}/${emp?.support}`}
                            alt=""
                            srcset=""
                          />
                          <Typography
                            onClick={() =>
                              window.open(`${url_}/${emp?.support}`)
                            }
                            sx={{
                              fontSize: "11px",
                              color: "#A098AE",
                              fontFamily: ["Poppins", "sans-serif"].join(","),
                              cursor: "pointer",
                            }}
                          >
                            <VisibilityOutlinedIcon />
                          </Typography>
                        </Box>
                      );
                    })
                  )}
                  {!empTemps.isSuccess && (
                    <img
                      width={100}
                      src={empty}
                      alt=""
                      srcset=""
                      style={{ transform: "scale(0.5)" }}
                    />
                  )}
                </Box>
                <Typography fontSize="12px" fontWeight="600" mt={2} mb={2}>
                  Support de cours
                </Typography>
                <form onSubmit={handleSubmit} style={{ background: "#fff" }}>
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    gap={1}
                    pt={2}
                    justifyContent={"left"}
                    alignItems="left"
                  >
                    <CustomFormControl
                      controlWidth={"50%"}
                      labelTitle="Titre"
                      type="text"
                      labelWidth="13%"
                      inputWidth="12rem"
                      placeholder="titre du support"
                      value={values.titre}
                      onChange={handleChange}
                      name="titre"
                      onBlur={handleBlur}
                    />
                    {errors.titre && touched.titre && (
                      <Box
                        sx={{
                          position: "relative",
                          fontSize: "10px",
                          top: "-8px",
                          left: "120px",
                          color: "red",
                        }}
                      >
                        {errors.titre}
                      </Box>
                    )}

                    <Box
                      display="flex"
                      flexDirection={"column"}
                      gap={1}
                      justifyContent={"left"}
                      alignItems="left"
                    >
                      <CustomFormControl
                        controlWidth={"50%"}
                        labelTitle="Date"
                        type="date"
                        labelWidth="13%"
                        inputWidth="12rem"
                        value={values.date}
                        onChange={handleChange}
                        name="date"
                        onBlur={handleBlur}
                      />
                      {errors.date && touched.date && (
                        <Box
                          sx={{
                            position: "relative",
                            fontSize: "10px",
                            top: "-8px",
                            left: "120px",
                            color: "red",
                          }}
                        >
                          {errors.date}
                        </Box>
                      )}
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      width="60%"
                      flexWrap={"wrap"}
                      paddingLeft={2.6}
                    >
                      <InputLabel
                        sx={{
                          fontFamily: ["Poppins", "sans-serif"].join(","),
                          mr: "0.4rem",
                          width: "20%",
                          textAlign: "center",
                          display: "flex",
                          fontSize: "12px",
                          whiteSpace: "normal",
                          justifyContent: "flex-start",
                        }}
                      >
                        Catégorie
                      </InputLabel>
                      <Select
                        onChange={handleSelectCategorie}
                        closeMenuOnSelect={true}
                        options={categorieCours}
                        styles={colourStyles}
                        type="text"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      padding: "15px 0",
                    }}
                  >
                    <Box display="flex" flexWrap={"wrap"} gap="1rem">
                      {user?.Niveau_etude?.map((item) => {
                        return (
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={handleChangeClasse}
                                    value={item?.id}
                                    type="checkbox"
                                    sx={{
                                      color: "#43a81f",
                                      "&.Mui-checked": {
                                        color: "#43a81f",
                                      },
                                    }}
                                  />
                                }
                                sx={{
                                  margin: 0,
                                  fontSize: "20px",
                                }}
                              />
                              <FormLabel
                                component="legend"
                                sx={{
                                  fontSize: "12px",
                                  color: "#9FA9B2",
                                  fontFamily: ["Poppins", "sans-serif"].join(
                                    ","
                                  ),
                                }}
                              >
                                {item?.name}
                              </FormLabel>
                            </Box>
                            <Box pl={1.5}>
                              <select
                                style={{
                                  color: "#9FA9B2",
                                  fontSize: "12px",
                                  fontFamily: ["Poppins", "sans-serif"].join(
                                    ","
                                  ),
                                  border: "none",
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                                name="semestre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>select semestre</option>
                                {item?.semestre?.map((item) => {
                                  return (
                                    <>
                                      <option value={item?.id}>
                                        {item?.name}{" "}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>

                    <Box
                      display="flex"
                      pl={2.5}
                      mt="1rem"
                      flexDirection={"column"}
                    >
                      {picture && (
                        <img
                          width={"100px"}
                          height={"100px"}
                          src={picture}
                          alt="notif_picture"
                          style={{ borderRadius: "10px" }}
                        />
                      )}
                      <CustomFileInput
                        onChange={handleChangeImage}
                        name="file"
                        type="file"
                        titre="Joindre Document"
                      />
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      gap="2rem"
                      mt="1rem"
                    >
                      <FormBtn
                        type="button"
                        onClick={() => window.location.reload()}
                        buttonText="Annuler"
                        bgNormalColor="#C74040"
                        margin_=""
                        width_="35%"
                      />
                      <FormBtn
                        type="submit"
                        disable={isSubmitting || !isValid}
                        buttonText="Enregistrer"
                        bgNormalColor="#43A81F"
                        margin_=""
                        width_="35%"
                      />
                    </Box>
                  </Box>
                </form>

                <Box pt={5}>
                  <Typography fontSize="12px" fontWeight="600" mt={2} mb={2}>
                    Support de Cours disponible
                  </Typography>
                  <Box display="flex" gap={2} className="support-cours">
                    {cours?.map((item) => {
                      return (
                        <Box bgcolor="#fff" p={1} borderRadius="8px">
                          <Box display={"flex"} justifyContent="flex-end">
                            <DeleteOutlineOutlinedIcon
                              fontSize={"8px"}
                              sx={{ color: "red", cursor: "pointer" }}
                              onClick={() => confirmDeleteSupport(item.id)}
                            />
                          </Box>
                          <Typography fontSize="13px" fontWeight="600">
                            Titre : {item?.titre}
                          </Typography>
                          <Typography fontSize="13px" fontWeight="600">
                            Date : {item?.date}
                          </Typography>
                          <Typography fontSize="13px" fontWeight="600">
                            classe : {item?.classprof?.classe}
                          </Typography>
                          <Typography
                            onClick={() =>
                              window.open(`${url_}/${item?.support}`)
                            }
                            sx={{
                              fontSize: "11px",
                              color: "#A098AE",
                              fontFamily: ["Poppins", "sans-serif"].join(","),
                              cursor: "pointer",
                            }}
                          >
                            <VisibilityOutlinedIcon />
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
              <Box
                className="bloc-top"
                style={{
                  width: "30%",
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        placeholder="Message à la classe"
                        sx={{
                          "& .MuiInputBase-root": {
                            color: "#B1BBC6 !important",
                            fontSize: "12px",
                          },
                          "& fieldset": { border: "none" },
                          background: "rgb(125,177,124,5%)",
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        multiline
                        rows={3}
                        onChange={handleChangeMessage}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems="center"
                    gap="2rem"
                    mt="1rem"
                  >
                    <Select
                      placeholder={"select classe"}
                      onChange={handleSelectClasse}
                      closeMenuOnSelect={true}
                      options={classe}
                      styles={colourStyles}
                      type="text"
                    />

                    <FormBtn
                      onClick={() => handleSendMessage()}
                      type="button"
                      buttonText="Envoyer"
                      bgNormalColor="#43A81F"
                      margin_="10px 0"
                      width_="20%"
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      background: "#e08d8d70",
                      textAlign: "center",
                      marginTop: "1rem",
                      fontSize: "12px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontFamily: ["Poppins", "sans-serif"].join(","),
                      pt: "5px",
                      pb: "5px",
                    }}
                  >
                    Messages
                  </Typography>{" "}
                  <Box
                    display={"flex"}
                    alignItems="center"
                    gap="2rem"
                    mt="1rem"
                  >
                    <Select
                      placeholder={"select classe"}
                      onChange={handleSelectClasse}
                      closeMenuOnSelect={true}
                      options={classe}
                      styles={colourStyles}
                      type="text"
                    />

                    <FormBtn
                      onClick={() => handleDisplayMessage()}
                      type="button"
                      buttonText="Charger"
                      bgNormalColor="#e95060"
                      margin_="10px 0"
                      width_="20%"
                    />
                  </Box>
                  {listMessage?.loading && (
                    <Box display="flex" justifyContent="center">
                      {" "}
                      <ClockLoader color="#43A81F" />
                    </Box>
                  )}
                  {listMessage?.data?.map((item) => {
                    return (
                      <Box
                        sx={{
                          bgcolor: " #f2fff8",
                          width: "100%",
                          borderRadius: "8px",
                          mt: "1rem",
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: "12px",
                            fontWeight: "100",
                            padding: "1rem",
                          }}
                        >
                          <span style={{ fontWeight: "600" }}>
                            {" "}
                            Classe : {item?.classprof?.classe}
                          </span>{" "}
                          <br />{" "}
                          <Typography fontSize="12px" sx={{ color: "#b1bbc6" }}>
                            {item?.message}
                          </Typography>
                        </Box>
                        <Typography
                          display="flex"
                          justifyContent="flex-end"
                          fontSize="10px"
                        >
                          {item?.date}{" "}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </div>
        </div>
        <div className="right-content">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};
