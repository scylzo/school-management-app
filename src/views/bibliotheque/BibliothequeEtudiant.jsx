/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Topbar } from "components";
import { url } from "config/config";

import { Sidebar, tabStyle } from "views";
import { Box, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchBibliotheque } from "redux/bibliothequeFeatures";

// url  for  setting biblio images
const url_ = url;

export const BibliothequeEtudiant = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const biblio = useSelector((state) => state.bibliotheque);

  useEffect(() => {
    const isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchBibliotheque());
    }
  }, []);

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container" style={{ width: "100%" }}>
          <Topbar
            currentViewTitle="USSD > Administration > Bibliothéque"
            afficherBtn={false}
            afficheSearchInput={false}
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
                <Tab sx={tabStyle}>Lien bibliothéque</Tab>
                <Tab sx={tabStyle}>Base de données en santé </Tab>
              </TabList>
              <TabPanel value={0} sx={{ p: 2 }}>
                <Typography textAlign={"center"} fontWeight="600" mt={3} mb={3}>
                  Sciences de l’environnement
                </Typography>
                <Box pt={2} display="flex" gap="1rem" flexWrap={"wrap"}>
                  {biblio?.data?.map((item) => {
                    if (item?.categorie === "Sciences de l'environnement") {
                      return (
                        <Box pt={1} display="flex">
                          <Box
                            display={"flex"}
                            flexDirection="column"
                            sx={{
                              height: "100px",
                              width: "15rem",
                              border: "1px solid #f6f6f6",
                              boxShadow: "var(--boxShadow)",
                              borderRadius: "12px",
                            }}
                            padding="10px 10px"
                          >
                            <img
                              width={"100px"}
                              height={"50px"}
                              style={{ transform: "scale(0.8)" }}
                              src={`${url_}/${item.image}`}
                              alt=""
                              srcset=""
                            />
                            <Box textAlign={"center"} width={100}>
                              {" "}
                              <a
                                href={`${item?.lien}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Typography fontSize="11px">
                                  {" "}
                                  {item.lien}
                                </Typography>
                              </a>{" "}
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>
                <Typography textAlign={"center"} fontWeight="600" mt={3} mb={3}>
                  Blogs sur l'écologie
                </Typography>
                <Box pt={2} display="flex" gap="1rem" flexWrap={"wrap"}>
                  {biblio?.data?.map((item) => {
                    if (item?.categorie === "Blogs sur l'écologie") {
                      return (
                        <Box pt={1} display="flex">
                          <Box
                            display={"flex"}
                            flexDirection="column"
                            sx={{
                              height: "100px",
                              width: "15rem",
                              border: "1px solid #f6f6f6",
                              boxShadow: "var(--boxShadow)",
                              borderRadius: "12px",
                            }}
                            padding="10px 10px"
                          >
                            <img
                              width={"100px"}
                              height={"50px"}
                              style={{ transform: "scale(0.8)" }}
                              src={`${url_}/${item.image}`}
                              alt=""
                              srcset=""
                            />
                            <Box textAlign={"center"} width={100}>
                              {" "}
                              <a
                                href={`${item?.lien}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Typography fontSize="11px">
                                  {" "}
                                  {item.lien}
                                </Typography>
                              </a>{" "}
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>

                <Typography textAlign={"center"} fontWeight="600" mt={3} mb={3}>
                  Sciences sociales
                </Typography>
                <Box pt={2} display="flex" gap="1rem" flexWrap={"wrap"}>
                  {biblio?.data?.map((item) => {
                    if (item?.categorie === "Sciences sociales") {
                      return (
                        <Box pt={1} display="flex">
                          <Box
                            display={"flex"}
                            flexDirection="column"
                            sx={{
                              height: "100px",
                              width: "15rem",
                              border: "1px solid #f6f6f6",
                              boxShadow: "var(--boxShadow)",
                              borderRadius: "12px",
                            }}
                            padding="10px 10px"
                          >
                            <img
                              width={"100px"}
                              height={"50px"}
                              style={{ transform: "scale(0.8)" }}
                              src={`${url_}/${item.image}`}
                              alt=""
                              srcset=""
                            />
                            <Box textAlign={"center"} width={100}>
                              {" "}
                              <a
                                href={`${item?.lien}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Typography fontSize="11px">
                                  {" "}
                                  {item.lien}
                                </Typography>
                              </a>{" "}
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>
              </TabPanel>
              <TabPanel value={1} sx={{ p: 2 }}>
                <Typography textAlign={"center"} fontWeight="600" mt={3} mb={3}>
                  Periodique
                </Typography>
                <Box pt={2} display="flex" gap="1rem" flexWrap={"wrap"}>
                  {biblio?.data?.map((item) => {
                    if (item?.categorie === "Periodiques") {
                      return (
                        <Box pt={1} display="flex">
                          <Box
                            display={"flex"}
                            flexDirection="column"
                            sx={{
                              height: "100px",
                              width: "15rem",
                              border: "1px solid #f6f6f6",
                              boxShadow: "var(--boxShadow)",
                              borderRadius: "12px",
                            }}
                            padding="10px 10px"
                          >
                            <img
                              width={"100px"}
                              height={"50px"}
                              style={{ transform: "scale(0.8)" }}
                              src={`${url_}/${item.image}`}
                              alt=""
                              srcset=""
                            />
                            <Box textAlign={"center"} width={100}>
                              {" "}
                              <a
                                href={`${item?.lien}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Typography fontSize="11px">
                                  {" "}
                                  {item.lien}
                                </Typography>
                              </a>{" "}
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>
                <Typography textAlign={"center"} fontWeight="600" mt={3} mb={3}>
                  Site à consulter
                </Typography>
                <Box pt={2} display="flex" gap="1rem" flexWrap={"wrap"}>
                  {biblio?.data?.map((item) => {
                    if (item?.categorie === "Sites a consulter") {
                      return (
                        <Box pt={1} display="flex">
                          <Box
                            display={"flex"}
                            flexDirection="column"
                            sx={{
                              height: "100px",
                              width: "15rem",
                              border: "1px solid #f6f6f6",
                              boxShadow: "var(--boxShadow)",
                              borderRadius: "12px",
                            }}
                            padding="10px 10px"
                          >
                            <img
                              width={"100px"}
                              height={"50px"}
                              style={{ transform: "scale(0.8)" }}
                              src={`${url_}/${item.image}`}
                              alt=""
                              srcset=""
                            />
                            <Box textAlign={"center"} width={100}>
                              {" "}
                              <a
                                href={`${item?.lien}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Typography fontSize="11px">
                                  {" "}
                                  {item.lien}
                                </Typography>
                              </a>{" "}
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
