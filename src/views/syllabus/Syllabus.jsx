/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { CustomFileInput, FormBtn, Topbar } from "components";
import { url } from "config/config";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Sidebar } from "views";
import { Box, Typography } from "@mui/material";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Notiflix from "notiflix";
import { addSyllabus } from "redux/syllabusFeatures/addSyllabusSlice";
import { fetchEC } from "redux/scolariteFeatures";
import { fetchsyllabus } from "redux/syllabusFeatures";
import { ClockLoader } from "react-spinners";
import { deleteSyllabus } from "redux/syllabusFeatures/deleteSyllabus";

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

export const Syllabus = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const syllabus = useSelector((state) => state.syllabus);
  const ec = useSelector((state) => state.ec);
  const [image, setImage] = useState();
  const [picture, setPicture] = useState();
  const [selectClasse, setSelectClasse] = useState();

  useEffect(() => {
    const isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchEC());
      dispatch(fetchsyllabus());
    }
  }, []);

  const Ec = ec?.data?.map((item) => {
    const newEc = {
      value: item.id,
      label: item?.nom_element,
    };
    return newEc;
  });

  const confirmDelete = (syllabId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de supprimer retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteSyllabus(syllabId));
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

  const handleChangeClasse = (selectClasse) => {
    setSelectClasse((prev) => (prev = selectClasse));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ec = selectClasse?.label;
    dispatch(addSyllabus({ ec, image }));
  };

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD > Administration > Syllabus"
            afficherBtn={false}
            afficheSearchInput={false}
          />
          <div className="main-content">
            <Typography>Syllabus</Typography>
            {syllabus?.loading && (
              <Box display="flex" justifyContent="center" m={"1rem"}>
                <ClockLoader color="#43a81f" />
              </Box>
            )}
            <Box pt={2} display="flex" gap="1rem" flexWrap={"wrap"}>
              {syllabus?.data?.map((item) => {
                return (
                  <Box pt={1} display="flex" flexWrap={"wrap"}>
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      sx={{
                        height: "120px",
                        width: "15rem",
                        border: "1px solid #f6f6f6",
                        boxShadow: "var(--boxShadow)",
                        borderRadius: "12px",
                      }}
                      padding="10px 10px"
                    >
                      <Typography fontSize={12}>{item?.nom_classe} </Typography>
                      <Box display={"flex"} justifyContent="flex-end">
                        <DeleteOutlineOutlinedIcon
                          onClick={() => confirmDelete(item.id)}
                          fontSize="12px"
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </Box>

                      {item.document?.includes("pdf") ? (
                        <PictureAsPdfIcon
                          style={{
                            color: "#e95060",
                            width: "100px",
                            height: "45px",
                          }}
                        />
                      ) : (
                        <img
                          width={"150px"}
                          height={"50px"}
                          src={`${url_}/${item.document}`}
                          alt=""
                          srcset=""
                        />
                      )}

                      <Box
                        textAlign={"center"}
                        width={100}
                        display="flex"
                        sx={{ cursor: "pointer" }}
                        onClick={() => window.open(`${url_}/${item.document}`)}
                      >
                        <Typography fontSize="11px">Visualiser</Typography>
                        <RemoveRedEyeOutlinedIcon
                          sx={{ fontSize: "15px", marginLeft: "2px" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </div>
        </div>
        <div className="right-content">
          <Typography textAlign={"center"} pt={4} pb={4} fontWeight="600">
            {" "}
            Ajouter Syllabus
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Select
                onChange={handleChangeClasse}
                placeholder="EC"
                closeMenuOnSelect={true}
                options={Ec}
                styles={colourStyles}
                type="text"
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
                titre="Ajouter Document"
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
