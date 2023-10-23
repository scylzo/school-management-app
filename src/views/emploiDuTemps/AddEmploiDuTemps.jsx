/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import * as yup from "yup";
import {
  CustomFileInput,
  CustomFormControl,
  FormBtn,
  Sidebar,
  Topbar,
} from "components";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { addEmp } from "redux/emploiDuTempsFeature";
import { useDispatch } from "react-redux";

export const empSchema = yup.object().shape({
  date: yup.string().required("Champ obligatoire"),
});

export const AddEmploiDuTemps = () => {
  const [toggle, setToggle] = useState();
  const params = useParams();
  const dispatch = useDispatch();

  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const semestreData = JSON.parse(localStorage.getItem("semestreData"));

  const [image, setImage] = useState();
  const [picture, setPicture] = useState();

  //handling  image
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
    dispatch(addEmp({ values, image, anAcad, classId, semestreData }));
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
      date: "",
    },
    validationSchema: empSchema,
    onSubmit,
  });

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container" style={{ width: "90%" }}>
          <Topbar
            currentViewTitle={`USSD > Administration > Créer emploi du temps > Classe  > ${params.id}`}
            afficheSearchInput={false}
            afficherBtn={false}
          />
          <Box
            bgcolor="#fff"
            mt={5}
            sx={{ width: "50%" }}
            p={5}
            borderRadius={5}
          >
            <form onSubmit={handleSubmit}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomFormControl
                  labelTitle="Date"
                  labelWidth="15%"
                  inputWidth="12rem"
                  value={values.date}
                  onChange={handleChange}
                  name="date"
                  type="date"
                  onBlur={handleBlur}
                />

                {errors.date && touched.date && (
                  <Box
                    sx={{
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    {errors.date}
                  </Box>
                )}
                <Box sx={{ width: "22%" }} mt={5} mb={5}>
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
                    titre="Ajouter Fichier"
                  />
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="flex-end"
                gap="2rem"
                mt="1rem"
              >
                <FormBtn
                  type="button"
                  onClick={() => window.location.reload()}
                  buttonText="Annuler"
                  bgNormalColor="#C74040"
                  margin_=""
                  width_="15%"
                />
                <FormBtn
                  type="submit"
                  disable={isSubmitting || !isValid}
                  buttonText="Enregistrer"
                  bgNormalColor="#43A81F"
                  margin_=""
                  width_="15%"
                />
              </Box>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};
