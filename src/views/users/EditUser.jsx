/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import { useDispatch } from "react-redux";
import { editUserPassword } from "redux/userFeatures";
import api from "services/api";
import Notiflix from "notiflix";

const EditUser = ({ userId }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [fieldsData, setFieldsData] = useState();

  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = () => {
    api.getUserById(userId).then((res) => {
      if (res.data) {
        setFieldsData(res);
      }
    });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setFieldsData("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values?.password.length > 0 && values?.password.length < 8) {
      Notiflix.Notify.failure(
        "Le mot de passe doit comporter au moins 8 carractéres !"
      );
    }
    if (
      values?.password.length > 0 &&
      values?.password !== values?.confirmPassword
    ) {
      Notiflix.Notify.failure("Les champs mot de passe  ne correspondent pas ");
    } else {
      dispatch(editUserPassword({ id: userId, values }));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Typography
          sx={{
            color: "rgb(177,187,198,100)",
            fontWeight: "600",
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: "12px",
          }}
        >
          Editer Accès
        </Typography>
        <CustomFormControl
          labelTitle="Mot de passe"
          labelWidth="30%"
          inputWidth="12rem"
          type="password"
          name="password"
          value={fieldsData?.data?.password}
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Confirmer mot de passe"
          labelWidth="30%"
          inputWidth="12rem"
          type="password"
          name="confirmPassword"
          value={fieldsData?.data?.confirm_password}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            buttonText="Editer"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
          <FormBtn
            buttonText="Annuler"
            bgNormalColor="#C74040"
            margin_=""
            width_="30%"
            onClick={() => window.location.reload(true)}
          />
        </Box>
      </form>
    </>
  );
};

export default EditUser;
