/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  createNotifications,
  fetchNotifications,
} from "redux/notificationFeatures";
import { CustomFileInput, CustomFormControl, FormBtn } from "components";

//notification schema
export const notificationSchema = yup.object().shape({
  titre: yup.string().required("Champ obligatoire"),
  description: yup.string().required("Champ obligatoire"),
  date: yup.string().required("Champ obligatoire"),
});

const AddNotifForm = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [image, setImage] = useState();
  const [picture, setPicture] = useState();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

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
    dispatch(createNotifications({ values, image, userId: userData?.id }));
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
      description: "",
      date: "",
    },
    validationSchema: notificationSchema,
    onSubmit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <CustomFormControl
        labelTitle="Titre"
        labelWidth="30%"
        inputWidth="12rem"
        value={values.titre}
        onChange={handleChange}
        name="titre"
        type="text"
        onBlur={handleBlur}
      />
      {errors.titre && touched.titre && (
        <Box
          sx={{
            position: "relative",
            fontSize: "10px",
            top: "-15px",
            left: "65px",
            color: "red",
          }}
        >
          {errors.titre}
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <InputLabel
          sx={{
            fontFamily: ["Poppins", "sans-serif"].join(","),
            mr: "0.2rem",
            width: "30%",
            display: "flex",
            fontSize: "12px",
            whiteSpace: "normal",
            justifyContent: "flex-start",
          }}
        >
          Description
        </InputLabel>
        <FormControl>
          <TextField
            sx={{
              "& .MuiInputBase-root": {
                color: "#B1BBC6 !important",
                fontSize: "12px",
              },
              "& fieldset": { border: "none" },
              background: "rgb(125,177,124,5%)",
              borderRadius: "10px",

              width: "12rem",
            }}
            multiline
            rows={3}
            value={values.description}
            onChange={handleChange}
            name="description"
            type="text"
            onBlur={handleBlur}
          />
        </FormControl>
      </Box>
      {errors.description && touched.description && (
        <Box
          sx={{
            position: "relative",
            fontSize: "10px",
            top: "-15px",
            left: "65px",
            color: "red",
          }}
        >
          {errors.description}
        </Box>
      )}
      <CustomFormControl
        labelTitle="Date"
        labelWidth="30%"
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
            position: "relative",
            fontSize: "10px",
            top: "-15px",
            left: "65px",
            color: "red",
          }}
        >
          {errors.date}
        </Box>
      )}
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
          titre="Document"
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
          disable={isSubmitting || !isValid}
          buttonText="Enregistrer"
          bgNormalColor="#43A81F"
          margin_=""
          width_="35%"
        />
      </Box>
    </form>
  );
};

export default AddNotifForm;
