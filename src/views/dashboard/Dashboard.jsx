/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Topbar, RightSidebar } from "components";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import { tabStyle } from "views";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import randomColor from "randomcolor";
import { fetchNationalites } from "redux/statistiqueFeatures";
import { fetchAnneeAcad } from "redux/scolariteFeatures";
import { InputLabel } from "@mui/material";
import api from "services/api";

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

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [showAddNotifForm, setShowAddNotifForm] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.nationalite);
  const anneeAcad = useSelector((state) => state.anneeAcad);
  const [selectAnAcad, setSelectAnAcad] = useState();
  const [loader, setLoader] = useState();

  // stats etudiants
  const [filieres, setFiliere] = useState();
  const [admissions, setAdmissions] = useState();
  const [adminBySexe, setAdminBySexe] = useState();
  const [niveauStat, setNiveauStat] = useState();
  const [studentTrancheAge, setStudentTrancheAge] = useState();
  const [studentMoyenAge, setStudentMoyenAge] = useState();

  // stats per
  const [perTrancheAge, setPerTrancheAge] = useState();
  const [perSexe, setPerSexe] = useState();
  const [perGrade, setPerGrade] = useState();
  const [perFiliere, setPerFiliere] = useState();
  const [perContrat, setPerContrat] = useState();

  // stats pats
  const [patsTrancheAge, setPatsTrancheAge] = useState();
  const [patsSexe, setPatsSexe] = useState();
  const [patsGrade, setPatsGrade] = useState();
  const [patsCategorie, setPatsCategorie] = useState();
  const [patsContrat, setPatsContrat] = useState();

  const anAcad = anneeAcad?.data?.map((item) => {
    const newAn = {
      value: item?.name,
      label: item?.name,
    };
    return newAn;
  });

  const statAn = selectAnAcad?.value;

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchNationalites());
      dispatch(fetchAnneeAcad());
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSelectAnAcad = (selectAnAcad) => {
    setSelectAnAcad((prev) => (prev = selectAnAcad));
  };

  const handleDisplayStats = () => {
    setLoader(<ClipLoader />);

    //stats etudiants
    api.getFiliere(statAn).then((res) => {
      if (res.data) {
        setLoader();
        setFiliere(res.data);
      }
    });
    api.getStudentByTrancheAge(statAn).then((res) => {
      setStudentTrancheAge(res.data);
    });
    api.getStudentParMonyenAge(statAn).then((res) => {
      setStudentMoyenAge(res.data[0]);
    });
    api.getAdmissionState(statAn).then((res) => {
      setAdmissions(res.data);
    });
    api.getAdmisBySexe(statAn).then((res) => {
      setAdminBySexe(res.data);
    });
    api.getAdNiveau(statAn).then((res) => {
      setNiveauStat(res.data);
    });
    //stats per
    api.getPerParTrancheAge(statAn).then((res) => {
      setPerTrancheAge(res.data);
    });
    api.getPerParGrade(statAn).then((res) => {
      setPerGrade(res.data);
    });
    api.getPerParSexe(statAn).then((res) => {
      setPerSexe(res.data);
    });
    api.getPerParFiliere(statAn).then((res) => {
      setPerFiliere(res.data);
    });
    api.getPerParTypeContrat(statAn).then((res) => {
      if (res.data) {
        setLoader();
        setPerContrat(res.data);
      }
    });
    // stat pats
    api.getPatsParTrancheAge(statAn).then((res) => {
      setPatsTrancheAge(res.data);
    });
    api.getPatsParSexe(statAn).then((res) => {
      setPatsSexe(res.data);
    });
    api.getPatsParGrade(statAn).then((res) => {
      setPatsGrade(res.data);
    });
    api.getPatsParCategorie(statAn).then((res) => {
      setPatsCategorie(res.data);
    });
    api.getPatsParTypeContrat(statAn).then((res) => {
      setPatsContrat(res.data);
    });
  };

  const data = filieres?.map((item) => {
    const newData = {
      name: item.filiere,
      value: item.Total,
    };
    return newData;
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0].name} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };

  const CustomTooltipSexe = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0]?.payload?.sexe} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };

  const CustomTooltipStatus = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0]?.payload?.Statut} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };

  const CustomTooltipPerContrat = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0]?.payload?.Type_contrat} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };
  const CustomTooltipPerFiliere = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0]?.payload?.filiere} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };
  const CustomTooltipPatsGrade = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0]?.payload?.grade} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };
  const CustomTooltipPatsContrat = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0]?.payload?.Type_contrat} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };

  const CustomTooltipPatsSexe = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0]?.payload?.sexe} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };
  const CustomTooltipPatsCat = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <Typography
            sx={{ fontSize: "12px", color: "#000" }}
          >{`${payload[0]?.payload?.categorie} : ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };

  const COLORSFILIERE = ["#0088FE", "#00C49F", "#9fa9b2"];
  const COLORAD = ["#FFBB28", "#FF8042", "#e95060"];
  const COLORSEXE = ["#CB88", "#FF2042", "#9fa9b2"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        fontSize={"10px"}
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD > Administration > Tableau De Bord"
            onClick={() => setShowAddNotifForm(true)}
            afficherBtn={true}
            title="Notification +"
          />
          <div className="main-content">
            <Box
              display="flex"
              gap={3}
              alignItems="center"
              sx={{ width: "100%" }}
              mb={3}
            >
              {" "}
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <InputLabel
                  sx={{
                    fontFamily: ["Poppins", "sans-serif"].join(","),
                    mr: "0.4rem",
                    width: "30%",
                    textAlign: "center",
                    display: "flex",
                    fontSize: "12px",
                    whiteSpace: "normal",
                    justifyContent: "flex-start",
                  }}
                ></InputLabel>
                <Select
                  onChange={handleSelectAnAcad}
                  closeMenuOnSelect={true}
                  placeholder="Année Académique"
                  options={anAcad}
                  styles={colourStyles}
                  type="text"
                />
              </Box>{" "}
              <Button
                onClick={() => handleDisplayStats()}
                sx={{ background: "#E95060", borderRadius: "8px" }}
              >
                <Typography fontSize="10px" fontWeight="700" color="#fff">
                  Charger
                </Typography>
                {loader}
              </Button>
            </Box>

            <Tabs
              aria-label="Basic tabs"
              defaultValue={0}
              sx={{
                borderRadius: "lg",
              }}
            >
              <TabList>
                <Tab sx={tabStyle}>Stats Etudiant</Tab>
                <Tab sx={tabStyle}> Stats PER</Tab>
                <Tab sx={tabStyle}> Stats PATS</Tab>
              </TabList>
              <TabPanel value={0} sx={{ p: 2 }}>
                <Box display="flex">
                  <Box sx={{ width: "55%" }}>
                    {" "}
                    <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                      Nombre etudiant inscrit par nationalité
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      {countries?.data?.map((item, index) => {
                        return (
                          <Box key={index}>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              {item?.nationalite}
                            </Typography>

                            <Box display="flex">
                              <Box
                                sx={{
                                  background: randomColor(),
                                  width: `${
                                    item?.Total ? item?.Total + 30 : 0
                                  }%`,
                                  height: "15px",
                                  borderRadius: "10px",
                                }}
                              ></Box>{" "}
                              <Typography
                                fontSize="10px"
                                fontWeight="800"
                                ml={1}
                              >
                                {item.Total}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        marginTop: "1rem",
                      }}
                    >
                      Nombre etudiant inscrit par trange d'âge
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      {studentTrancheAge?.map((item, index) => {
                        return (
                          <Box key={index}>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              {item?.intervall}
                            </Typography>

                            <Box display="flex">
                              <Box
                                sx={{
                                  background: randomColor(),
                                  width: `${
                                    item?.total ? item?.total + 30 : 0
                                  }%`,
                                  height: "15px",
                                  borderRadius: "10px",
                                }}
                              ></Box>{" "}
                              <Typography
                                fontSize="10px"
                                fontWeight="800"
                                ml={1}
                              >
                                {item.total}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                  <Box
                    sx={{ width: "45%" }}
                    display="flex"
                    gap={1}
                    flexDirection="column"
                  >
                    <Box display="flex" gap={2}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          Nombre etudiant par filière
                        </Typography>

                        <PieChart width={150} height={150}>
                          <Pie
                            data={data}
                            dataKey="value"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {data?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  COLORSFILIERE[index % COLORSFILIERE.length]
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          Nombre étudiant admis par sexe
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={adminBySexe}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {adminBySexe?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORAD[index % COLORAD.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipSexe />} />
                        </PieChart>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        display={"flex"}
                        justifyContent="center"
                        flexDirection={"column"}
                        alignItems="center"
                        margin={"1.5rem 0"}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            pb: "10px",
                          }}
                        >
                          Moyenne d'âge des etudiants
                        </Typography>

                        <Box
                          sx={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "120px",
                            background: "lightgray",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          {studentMoyenAge?.Moyenne}
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          Nombre étudiant admis par Status
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={admissions}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {admissions?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORAD[index % COLORAD.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipStatus />} />
                        </PieChart>
                      </Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                        Nombre etudiant par niveau d'etude
                      </Typography>
                      <Box display="flex" flexDirection="column" gap="5px">
                        {niveauStat?.map((item, index) => {
                          return (
                            <Box
                              key={index}
                              display="flex"
                              flexDirection="column"
                              gap={1}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "600" }}
                              >
                                {item?.filiere_etude}
                              </Typography>
                              <Box display="flex">
                                <Box
                                  sx={{
                                    background: randomColor(),
                                    width: `${
                                      item?.Total ? item?.Total + 30 : 0
                                    }%`,
                                    height: "15px",
                                    borderRadius: "10px",
                                  }}
                                ></Box>{" "}
                                <Typography
                                  fontSize="10px"
                                  fontWeight="800"
                                  ml={1}
                                >
                                  {item.Total}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={1} sx={{ p: 2 }}>
                <Box display="flex" gap={2}>
                  <Box sx={{ width: "55%" }}>
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                        PER par tranches d’âges
                      </Typography>
                      <Box display="flex" flexDirection="column" gap="5px">
                        {perTrancheAge?.map((item, index) => {
                          return (
                            <Box
                              key={index}
                              display="flex"
                              flexDirection="column"
                              gap={1}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "600" }}
                              >
                                {item?.intervall}
                              </Typography>
                              <Box display="flex">
                                <Box
                                  sx={{
                                    background: randomColor(),
                                    width: `${
                                      item?.total ? item?.total + 30 : ""
                                    }%`,
                                    height: "15px",
                                    borderRadius: "10px",
                                  }}
                                ></Box>{" "}
                                <Typography
                                  fontSize="10px"
                                  fontWeight="800"
                                  ml={1}
                                >
                                  {item.total}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: "45%" }}>
                    <Box display="flex" gap={2}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            marginTop: "1rem",
                          }}
                        >
                          PER par grade
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={perGrade}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {perGrade?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  COLORSFILIERE[index % COLORSFILIERE.length]
                                }
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          PER par type de contrat
                        </Typography>
                        <PieChart
                          width={150}
                          height={150}
                          label={renderCustomizedLabel}
                        >
                          <Pie data={perContrat} dataKey="Total" fill="green">
                            {perContrat?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORAD[index % COLORAD.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipPerContrat />} />
                        </PieChart>
                      </Box>
                    </Box>

                    <Box display={"flex"} gap={2}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          PER par Sexe
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={perSexe}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {perSexe?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORSEXE[index % COLORSEXE.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipSexe />} />
                        </PieChart>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          PER par filière
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={perFiliere}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {perFiliere?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORAD[index % COLORAD.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipPerFiliere />} />
                        </PieChart>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={2} sx={{ p: 2 }}>
                <Box display="flex" gap={2}>
                  <Box sx={{ width: "55%" }}>
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                        PATS par tranches d’âges
                      </Typography>
                      <Box display="flex" flexDirection="column" gap="5px">
                        {patsTrancheAge?.map((item, index) => {
                          return (
                            <Box
                              key={index}
                              display="flex"
                              flexDirection="column"
                              gap={1}
                            >
                              <Typography
                                sx={{ fontSize: "12px", fontWeight: "600" }}
                              >
                                {item?.intervall}
                              </Typography>
                              <Box display="flex">
                                <Box
                                  sx={{
                                    background: randomColor(),
                                    width: `${
                                      item?.total ? item?.total + 30 : ""
                                    }%`,
                                    height: "15px",
                                    borderRadius: "10px",
                                  }}
                                ></Box>{" "}
                                <Typography
                                  fontSize="10px"
                                  fontWeight="800"
                                  ml={1}
                                >
                                  {item.total}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: "45%" }}>
                    <Box display="flex" gap={2}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            marginTop: "1rem",
                          }}
                        >
                          PATS par grade
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={patsGrade}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {patsGrade?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  COLORSFILIERE[index % COLORSFILIERE.length]
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipPatsGrade />} />
                        </PieChart>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          PATS par type de contrat
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={patsContrat}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {patsContrat?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORAD[index % COLORAD.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipPatsContrat />} />
                        </PieChart>
                      </Box>
                    </Box>

                    <Box display={"flex"} gap={2}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          PATS par sexe
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={patsSexe}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {patsSexe?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORAD[index % COLORAD.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipPatsSexe />} />
                        </PieChart>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          PATS par catégorie
                        </Typography>
                        <PieChart width={150} height={150}>
                          <Pie
                            data={patsCategorie}
                            dataKey="Total"
                            fill="green"
                            labelLine={false}
                            label={renderCustomizedLabel}
                          >
                            {patsCategorie?.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORAD[index % COLORAD.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltipPatsCat />} />
                        </PieChart>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className="right-content">
          <RightSidebar showAddNotifForm={showAddNotifForm} />
        </div>
      </div>
    </div>
  );
};
