/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import api from "services/api";
import { useDispatch } from "react-redux";
import { editParent } from "redux/parentFeatures";

const EditParentForm = ({ parentId }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({});
  const [fieldsData, setFieldsData] = useState({});

  useEffect(() => {
    getParent();
  }, [parentId]);

  const getParent = () => {
    api.getParentById(parentId).then((res) => {
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
    dispatch(editParent({ id: parentId, values }));
  };

  return (
    <>
      <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
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
            Info Personnelle
          </Typography>
          <CustomFormControl
            labelTitle="Prénom"
            labelWidth="30%"
            inputWidth="12rem"
            name="prenom"
            value={fieldsData?.data?.prenom}
            onChange={handleChange}
          />
          <CustomFormControl
            labelTitle="Nom"
            labelWidth="30%"
            inputWidth="12rem"
            name="nom"
            value={fieldsData?.data?.nom}
            onChange={handleChange}
          />
          <CustomFormControl
            labelTitle="Tél mobile"
            labelWidth="30%"
            inputWidth="12rem"
            name="telMobile"
            value={fieldsData?.data?.tel}
            onChange={handleChange}
          />
          <CustomFormControl
            labelTitle="Email"
            labelWidth="30%"
            inputWidth="12rem"
            name="email"
            value={fieldsData?.data?.email}
            onChange={handleChange}
          />
          <Typography
            sx={{
              color: "rgb(177,187,198,100)",
              fontWeight: "600",
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: "12px",
            }}
          >
            Accès
          </Typography>
          <CustomFormControl
            labelTitle="Nom d'utilisateur"
            labelWidth="30%"
            inputWidth="12rem"
            name="username"
            value={fieldsData?.data?.username}
            onChange={handleChange}
          />
          <CustomFormControl
            labelTitle="Mot de passe"
            labelWidth="30%"
            inputWidth="12rem"
            type="password"
            value={fieldsData?.data?.password}
            name="password"
            onChange={handleChange}
          />
          <CustomFormControl
            labelTitle="Confirmer mot de passe"
            labelWidth="30%"
            inputWidth="12rem"
            type="password"
            value={fieldsData?.data?.confirm_password}
            name="confirmPassword"
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
            <FormBtn
              type="submit"
              buttonText="Enregistrer"
              bgNormalColor="#43A81F"
              margin_=""
              width_="30%"
            />
            <FormBtn
              onClick={() => window.location.reload(true)}
              buttonText="Annuler"
              bgNormalColor="#C74040"
              margin_=""
              width_="30%"
            />
          </Box>
        </form>
      </div>
    </>
  );
};

export default EditParentForm;
