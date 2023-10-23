/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import {
  CustomFileInput,
  CustomFormControl,
  FormBtn,
  Topbar,
} from "components";
import { url } from "config/config";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Sidebar, tabStyle } from "views";
import { Box, Typography } from "@mui/material";
import Select from "react-select";
import { categorieLien, typeLien } from "services";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBibliotheque,
  deleteBibliotheque,
  fetchBibliotheque,
} from "redux/bibliothequeFeatures";
import Notiflix from "notiflix";

// url  for  setting biblio images
const url_ = url;

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    height: "30px",
    fontSize: "10px",
    p: "1rem",
    color: "#B1BBC6",
    width: "17rem",
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

export const Bibliotheque = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const biblio = useSelector((state) => state.bibliotheque);
  const [image, setImage] = useState();
  const [picture, setPicture] = useState();
  const [selectCategorie, setSelectCategorie] = useState();
  const [selectType, setSelectType] = useState();
  const [lien, setLien] = useState();

  useEffect(() => {
    const isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchBibliotheque());
    }
  }, []);

  const confirmDelete = (biblioId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de supprimer retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteBibliotheque(biblioId));
      }
    );
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

  const handleChangeCategorie = (selectCategorie) => {
    setSelectCategorie((prev) => (prev = selectCategorie));
  };
  const handleChangeType = (selectType) => {
    setSelectType((prev) => (prev = selectType));
  };
  const handleChangeLien = (event) => {
    setLien(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const categorie = selectCategorie?.value;
    const type = selectType?.value;
    dispatch(addToBibliotheque({ categorie, type, lien, image }));
  };

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
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
                            <Box display={"flex"} justifyContent="flex-end">
                              <DeleteOutlineOutlinedIcon
                                onClick={() => confirmDelete(item.id)}
                                fontSize="12px"
                                style={{ color: "red", cursor: "pointer" }}
                              />
                            </Box>
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
                        <Box pt={1} display="flex" flexWrap={"wrap"}>
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
                            <Box display={"flex"} justifyContent="flex-end">
                              <DeleteOutlineOutlinedIcon
                                onClick={() => confirmDelete(item.id)}
                                fontSize="12px"
                                style={{ color: "red", cursor: "pointer" }}
                              />
                            </Box>
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
                            <Box display={"flex"} justifyContent="flex-end">
                              <DeleteOutlineOutlinedIcon
                                onClick={() => confirmDelete(item.id)}
                                fontSize="12px"
                                style={{ color: "red", cursor: "pointer" }}
                              />
                            </Box>
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
                            <Box display={"flex"} justifyContent="flex-end">
                              <DeleteOutlineOutlinedIcon
                                // onClick={() => confirmDelete(notif.id)}
                                fontSize="12px"
                                style={{ color: "red", cursor: "pointer" }}
                              />
                            </Box>
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
                            <Box display={"flex"} justifyContent="flex-end">
                              {/* <ModeEditOutlinedIcon
                                onClick={() => {
                                  // handleShowEdit();
                                  // setNotifId((prev) => (prev = notif.id));
                                }}
                                fontSize="12px"
                                style={{
                                  marginRight: "2px",
                                  cursor: "pointer",
                                }}
                              /> */}
                              <DeleteOutlineOutlinedIcon
                                // onClick={() => confirmDelete(notif.id)}
                                fontSize="12px"
                                style={{ color: "red", cursor: "pointer" }}
                              />
                            </Box>
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
        <div className="right-content">
          <Typography textAlign={"center"} pt={4} pb={4} fontWeight="600">
            {" "}
            Ajouter à la bibliothéque
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Select
                onChange={handleChangeType}
                placeholder="Type de lien"
                closeMenuOnSelect={true}
                options={typeLien}
                styles={colourStyles}
                type="text"
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Select
                onChange={handleChangeCategorie}
                placeholder="Catégorie lien"
                closeMenuOnSelect={true}
                options={categorieLien}
                styles={colourStyles}
                type="text"
              />
            </Box>
            <Box>
              <CustomFormControl
                labelTitle="Lien"
                labelWidth="10%"
                inputWidth="14rem"
                placeholder="https://www.votre.lien.com"
                name="lien"
                type="text"
                onChange={handleChangeLien}
              />
            </Box>

            <Box sx={{ paddingLeft: "30%" }}>
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
                titre="Ajouter Image"
              />
            </Box>
            <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
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
                buttonText="Ajouter"
                bgNormalColor="#43A81F"
                margin_=""
                width_="35%"
              />
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};
