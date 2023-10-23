/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./dashboardEtudiant.scss";
import {
  CustomFormControl,
  FormBtn,
  RightSidebar,
  Sidebar,
  Topbar,
} from "components";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnneeAcad, fetchClasse } from "redux/scolariteFeatures";
import { fetchEmpTemps } from "redux/emploiDuTempsFeature";
import { url } from "config/config";
import empty from "../../assets/images/empty.png";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import api from "services/api";
import { fetchAdmissionById } from "redux/admissionFeatures";
import { ClockLoader } from "react-spinners";
import { addMessageParent, getlistMessage } from "redux/messageFeatures";

// url  for  setting emp images
const url_ = url;

//mail schema
export const mailSchema = yup.object().shape({
  message: yup.string().required("Champ obligatoire"),
  objet: yup.string().required("Champ obligatoire"),
});

export const DashboardEtudiant = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const admissions = useSelector((state) => state.admissionById);
  const anneeAcad = useSelector((state) => state.anneeAcad);
  const empTemps = useSelector((state) => state.empTemps);
  const listMessage = useSelector((state) => state.listMessage);
  const allClasse = useSelector((state) => state.classe);
  const userParent = JSON.parse(localStorage.getItem("userData"));
  const user = JSON.parse(localStorage.getItem("userData"));
  const parent = user?.roles[0] === "ROLE_PARENT" ? true : false;
  const [studentId, setStudentId] = useState("");
  const [classe, setClasse] = useState();
  const [childClasse, setChildClass] = useState();
  const [classCours, setClasseCours] = useState();
  const [loader, setLoader] = useState(null);

  const anAcad_ = anneeAcad?.data?.filter(
    (item) => item.annee_en_cours === "annee en cours"
  );
  const lastAdmission = admissions.data.slice(-1).pop();

  const empAnAcad_ = anAcad_?.pop();
  const anAcad = empAnAcad_?.name;

  const classprofIdAdmission = user?.admission?.slice(-1).pop();
  const classprofId = classprofIdAdmission?.classprofId;

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchAnneeAcad());
      dispatch(fetchClasse());
      dispatch(fetchAdmissionById({ studentId }));
    }
    return () => {
      isCancelled = true;
    };
  }, [studentId]);

  //get name firt letter
  const getFirstLetters = (nom) => {
    const firstLetters = nom
      ?.split(" ")
      ?.map((word) => word.charAt(0))
      .join("");

    return firstLetters;
  };

  const fetchClassEmpTemps = ({ anAcad, classId, semestre }) => {
    dispatch(fetchEmpTemps({ anAcad, classId, semestre }));
  };

  const getStudentClasse = () => {
    user.admission?.map((admission) => {
      allClasse?.data?.map((item) => {
        if (item.classe === admission.filiere_etude) {
          setClasse(item);
        }
      });
    });
  };

  const getStudentClasseParent = () => {
    userParent.enfant?.map((item) => {
      if (item?.id === studentId) {
        item?.admission?.map((adm) => {
          allClasse?.data?.map((item) => {
            if (item.classe === adm.filiere_etude) {
              setChildClass(item);
            }
          });
        });
      }
    });
  };

  const getStudentClasseCours = (body) => {
    const { anAcad, classId, semestreId } = body;
    setLoader(
      <Typography color="red">
        Support de cours pas encore disponible
      </Typography>
    );
    api.getSupportCoursEtudiant({ anAcad, classId, semestreId }).then((res) => {
      if (res.data) {
        setClasseCours(res.data);
        setLoader();
      }
    });
  };

  const handleDisplayMessage = () => {
    dispatch(
      getlistMessage({
        classprofId,
        Annee_academique: anAcad,
      })
    );
  };

  const onSubmit = async (values, actions) => {
    dispatch(
      addMessageParent({
        objet: values.objet,
        text: values.message,
        parentId: userParent?.id,
      })
    );
    actions.resetForm();
  };

  const {
    values,
    isSubmitting,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      message: "",
      objet: "",
    },
    validationSchema: mailSchema,
    onSubmit,
  });

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
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
            <>
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
                    <Box display="flex" flexDirection={"column"}>
                      <Box>
                        <Button
                          key={child.id}
                          onClick={() => setStudentId(child.id)}
                          style={{
                            background: "#F3F9F2",
                            borderRadius: "10px",
                            padding: "10px 15px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",

                            cursor: "pointer",
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
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box
                className="bloc-container"
                display="flex"
                justifyContent="space-between"
                gap="2rem"
              >
                <Box
                  className="bloc"
                  width="33%"
                  display="flex"
                  flexDirection="column"
                  sx={{
                    background: "#fff",
                    marginTop: "1rem",
                    borderRadius: "10px",
                    padding: "6px 15px 1rem ",
                  }}
                >
                  <Typography fontSize={"12px"}>Emploi du temps </Typography>
                  <Box pt={1} className="generate-btn">
                    {studentId && (
                      <FormBtn
                        onClick={() => getStudentClasseParent()}
                        buttonText="Generer emploi du temps"
                        bgNormalColor="#C74040"
                        width_="50%"
                      />
                    )}
                  </Box>
                  <Box>
                    <Typography
                      fontSize={12}
                      fontWeight="600"
                      pt={2}
                      pb={1}
                      bgcolor="#fff"
                      display="flex"
                      justifyContent="center"
                    >
                      {childClasse?.classe}
                    </Typography>
                    <Box display={"flex"} p={1} gap={0.5}>
                      {childClasse?.semestre?.map((item) => {
                        return (
                          <Button
                            background="#DFF3D9"
                            onClick={() =>
                              fetchClassEmpTemps({
                                anAcad,
                                classId: parent
                                  ? `${lastAdmission?.classprofId}`
                                  : classe?.id,
                                semestre: item,
                              })
                            }
                            sx={{
                              fontSize: "8px",
                              width: "80px",
                              fontWeight: "700",
                              background: "#DFF3D9",
                              color: "#fff",
                            }}
                            borderRadius={4}
                          >
                            {item?.name}
                          </Button>
                        );
                      })}
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    pt={2}
                    style={{ width: "100%" }}
                  >
                    {empTemps.loading ? (
                      <Typography
                        display="flex"
                        justifyContent="center"
                        m={"1rem"}
                        color="red"
                      >
                        Emploi du temps pas encore disponible
                      </Typography>
                    ) : empTemps?.data?.length > 0 ? (
                      empTemps?.data?.map((emp) => {
                        return (
                          <Box
                            p={2}
                            bgcolor="#fff"
                            borderRadius="8px"
                            style={{ overflow: "hidden" }}
                          >
                            <img
                              style={{ width: "40%" }}
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
                    ) : (
                      <Box className="support-img-container" pb={2}>
                        <img
                          src={empty}
                          alt=""
                          srcset=""
                          style={{ width: "120px", height: "120px" }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  className="bloc"
                  width="33%"
                  display="flex"
                  flexDirection="column"
                  sx={{
                    background: "#fff",
                    marginTop: "1rem",
                    borderRadius: "10px",
                    padding: "6px 15px 1rem ",
                  }}
                >
                  <Typography fontSize={"12px"}>Support de cours </Typography>
                  <Box pt={1} className="generate-btn">
                    {studentId && (
                      <FormBtn
                        onClick={() => getStudentClasse()}
                        buttonText="Charger supports de cours"
                        bgNormalColor="#C74040"
                        margin_="0 10px"
                        padding_="10px 0 "
                        width_="50%"
                      />
                    )}
                  </Box>

                  <Box display="flex" flexDirection="column" gap="1rem" pt={2}>
                    <Box>
                      <Typography
                        fontSize={12}
                        fontWeight="600"
                        pt={2}
                        pb={1}
                        bgcolor="#fff"
                        display="flex"
                        justifyContent="center"
                      >
                        {childClasse?.classe}
                      </Typography>
                      <Box display={"flex"} p={1} gap={0.5}>
                        {childClasse?.semestre?.map((item) => {
                          const semestreId = item.id;
                          return (
                            <Button
                              onClick={() =>
                                getStudentClasseCours({
                                  anAcad,
                                  classId: parent
                                    ? `${lastAdmission?.classprofId}`
                                    : classe?.id,
                                  semestreId,
                                })
                              }
                              sx={{
                                fontSize: "8px",
                                width: "80px",
                                fontWeight: "700",
                                background: "#9fa9b2",
                                color: "#fff",
                              }}
                              borderRadius={4}
                            >
                              {item?.name}
                            </Button>
                          );
                        })}
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent={"center"}>
                      {loader}{" "}
                    </Box>
                    {classCours?.map((item) => {
                      return (
                        <Box display="flex">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              background: "#DBDBDB",
                              padding: "7px ",
                              borderRadius: "6px",
                              mr: "5px",
                            }}
                          >
                            <InsertDriveFileOutlinedIcon />
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "#374557",
                                fontWeight: "600",
                                fontFamily: ["Poppins", "sans-serif"].join(","),
                              }}
                            >
                              {" "}
                              {item?.titre}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                color: "#A098AE",
                                fontFamily: ["Poppins", "sans-serif"].join(","),
                              }}
                            >
                              {item?.date}
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
                        </Box>
                      );
                    })}
                    {!loader && (
                      <Box className="support-img-container" pb={2}>
                        <img
                          src={empty}
                          alt=""
                          srcset=""
                          style={{ width: "120px", height: "120px" }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  className="bloc"
                  width="33%"
                  display="flex"
                  flexDirection="column"
                  sx={{
                    background: "#fff",
                    marginTop: "1rem",
                    borderRadius: "10px",
                    padding: "6px 15px 1rem ",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        background: "#e08d8d70",
                        textAlign: "center",
                        margin: "1rem 0",
                        fontSize: "12px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontFamily: ["Poppins", "sans-serif"].join(","),
                        pt: "5px",
                        pb: "5px",
                      }}
                    >
                      Envoyé un mail à L'USSD
                    </Typography>{" "}
                    <form onSubmit={handleSubmit}>
                      <Box mb={1}>
                        <CustomFormControl
                          labelTitle="Objet"
                          labelWidth="12%"
                          inputWidth="18rem"
                          name="objet"
                          value={values.objet}
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>

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
                            name="message"
                            multiline
                            rows={3}
                            value={values.message}
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormControl>
                      </Box>
                      <Box
                        display={"flex"}
                        alignItems="center"
                        gap="2rem"
                        mt="1rem"
                      >
                        <FormBtn
                          disable={isSubmitting || !isValid}
                          type="submit"
                          buttonText="Envoyer"
                          bgNormalColor="#43A81F"
                          margin_="10px 0"
                          width_="20%"
                        />
                      </Box>
                    </form>
                  </Box>
                </Box>
              </Box>
            </>
          )}

          {!parent && (
            <Box
              className="bloc-container"
              display="flex"
              justifyContent="space-between"
              gap="2rem"
            >
              <Box
                className="bloc"
                width="33%"
                display="flex"
                flexDirection="column"
                mt={2}
                bgcolor="#fff"
                borderRadius={"10px"}
              >
                <Box pt={1} className="generate-btn">
                  <FormBtn
                    onClick={() => getStudentClasse()}
                    buttonText="Generer emploi du tempss"
                    bgNormalColor="#C74040"
                    width_="50%"
                  />
                </Box>
                <Box>
                  <Typography
                    fontSize={12}
                    fontWeight="600"
                    pt={2}
                    pb={1}
                    bgcolor="#fff"
                    display="flex"
                    justifyContent="center"
                  >
                    {classe?.classe}
                  </Typography>
                  <Box display={"flex"} p={1} gap={0.5}>
                    {classe?.semestre?.map((item) => {
                      return (
                        <Button
                          background="#DFF3D9"
                          onClick={() =>
                            fetchClassEmpTemps({
                              anAcad,
                              classId: parent
                                ? `${lastAdmission?.classprofId}`
                                : classe?.id,
                              semestre: item,
                            })
                          }
                          sx={{
                            fontSize: "8px",
                            width: "80px",
                            fontWeight: "700",
                            background: "#DFF3D9",
                            color: "#fff",
                          }}
                          borderRadius={4}
                        >
                          {item?.name}
                        </Button>
                      );
                    })}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  pt={2}
                  style={{ width: "100%" }}
                >
                  {empTemps.loading ? (
                    <Typography
                      display="flex"
                      justifyContent="center"
                      m={"1rem"}
                      color="red"
                    >
                      Emploi du temps pas encore disponible
                    </Typography>
                  ) : empTemps?.data?.length > 0 ? (
                    empTemps?.data?.map((emp) => {
                      return (
                        <Box
                          p={2}
                          bgcolor="#fff"
                          borderRadius="8px"
                          style={{ overflow: "hidden" }}
                        >
                          <img
                            style={{ width: "40%" }}
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
                  ) : (
                    <Box className="support-img-container" pb={2}>
                      <img
                        src={empty}
                        alt=""
                        srcset=""
                        style={{ width: "120px", height: "120px" }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>

              <Box
                className="bloc"
                width="33%"
                display="flex"
                flexDirection="column"
                sx={{
                  background: "#fff",
                  marginTop: "1rem",
                  borderRadius: "10px",
                  padding: "6px 15px 1rem ",
                }}
              >
                <Box pt={1} className="generate-btn">
                  <FormBtn
                    onClick={() => getStudentClasse()}
                    buttonText="Charger supports de cours"
                    bgNormalColor="#C74040"
                    margin_="0 10px"
                    padding_="10px 0 "
                    width_="50%"
                  />
                </Box>

                <Box display="flex" flexDirection="column" gap="1rem" pt={2}>
                  <Box>
                    <Typography
                      fontSize={12}
                      fontWeight="600"
                      pt={2}
                      pb={1}
                      bgcolor="#fff"
                      display="flex"
                      justifyContent="center"
                    >
                      {classe?.classe}
                    </Typography>
                    <Box display={"flex"} p={1} gap={0.5}>
                      {classe?.semestre?.map((item) => {
                        const semestreId = item.id;
                        return (
                          <Button
                            onClick={() =>
                              getStudentClasseCours({
                                anAcad,
                                classId: parent
                                  ? `${lastAdmission?.classprofId}`
                                  : classe?.id,
                                semestreId,
                              })
                            }
                            sx={{
                              fontSize: "8px",
                              width: "80px",
                              fontWeight: "700",
                              background: "#9fa9b2",
                              color: "#fff",
                            }}
                            borderRadius={4}
                          >
                            {item?.name}
                          </Button>
                        );
                      })}
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent={"center"}>
                    {loader}{" "}
                  </Box>
                  {classCours?.map((item) => {
                    return (
                      <Box display="flex">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            background: "#DBDBDB",
                            padding: "7px ",
                            borderRadius: "6px",
                            mr: "5px",
                          }}
                        >
                          <InsertDriveFileOutlinedIcon />
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#374557",
                              fontWeight: "600",
                              fontFamily: ["Poppins", "sans-serif"].join(","),
                            }}
                          >
                            {" "}
                            {item?.titre}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "#A098AE",
                              fontFamily: ["Poppins", "sans-serif"].join(","),
                            }}
                          >
                            {item?.date}
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
                      </Box>
                    );
                  })}
                  {!loader && (
                    <Box className="support-img-container" pb={2}>
                      <img
                        src={empty}
                        alt=""
                        srcset=""
                        style={{ width: "120px", height: "120px" }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                className="bloc"
                width="33%"
                display="flex"
                flexDirection="column"
              >
                <Box>
                  <Typography
                    onClick={() => handleDisplayMessage()}
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
                      cursor: "pointer",
                    }}
                  >
                    Afficher les Messages
                  </Typography>{" "}
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
                          pr="10px"
                        >
                          {item?.date}{" "}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )}
        </div>
        <div className="right-content">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};
