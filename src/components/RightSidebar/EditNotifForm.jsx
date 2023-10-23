/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { editNotification } from "redux/notificationFeatures";
import { CustomFileInput, CustomFormControl, FormBtn } from "components";
import api from "services/api";
import { useDispatch } from "react-redux";

const EditNotifForm = ({ notifId }) => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [image, setImage] = useState();
  const [picture, setPicture] = useState();
  const [notifEditData, setNotifEditData] = useState();
  const [values, setValues] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      api.getNotificationById(notifId).then((response) => {
        if (response) {
          setNotifEditData(response.data);
        }
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editNotification({
        values,
        image,
        notifId,
        userId: userData?.id,
      })
    );
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setNotifEditData("");
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

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <CustomFormControl
        labelTitle="Titre"
        labelWidth="30%"
        inputWidth="12rem"
        value={notifEditData?.titre}
        onChange={handleChange}
        name="titre"
        type="text"
      />

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
            value={notifEditData?.description}
            onChange={handleChange}
            name="description"
            type="text"
          />
        </FormControl>
      </Box>

      <CustomFormControl
        labelTitle="Date"
        labelWidth="30%"
        inputWidth="12rem"
        value={notifEditData?.date}
        onChange={handleChange}
        name="date"
        type="date"
      />

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
          buttonText="Enregistrer"
          bgNormalColor="#43A81F"
          margin_=""
          width_="35%"
        />
      </Box>
    </form>
  );
};

export default EditNotifForm;
