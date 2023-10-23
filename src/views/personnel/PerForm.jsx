/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, InputLabel, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Select from "react-select";
import { registerOther } from "redux/authFeatures";
import { perSchema } from "validationSchemas";
import { countries, gender, perGrade, rolesPer, typeContrat } from "services";
import {
  fetchClasse,
  fetchEC,
  fetchFiliere,
  fetchNiveau,
  fetchUE,
} from "redux/scolariteFeatures";
import { CustomFormControl, FormBtn } from "components";

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

const PerForm = () => {
  const dispatch = useDispatch();
  const ue = useSelector((state) => state.ue);
  const ec = useSelector((state) => state.ec);
  const filieres = useSelector((state) => state.filiere);
  const niveaux = useSelector((state) => state.niveau);
  const classes = useSelector((state) => state.classe);
  const [selectOptionFiliere, setSelectOptionFiliere] = useState();
  const [selectOptionNiveau, setSelectOptionNiveau] = useState();
  const [selectOptionClasse, setSelectOptionClasse] = useState();
  const [selectOptionEc, setSelectOptionEc] = useState();
  const [selectOptionUe, setSelectOptionUe] = useState();
  const [selectOptionRole, setSelectOptionRole] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchUE());
      dispatch(fetchEC());
      dispatch(fetchFiliere());
      dispatch(fetchNiveau());
      dispatch(fetchClasse());
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const filiere = filieres?.data?.map((item) => {
    const newFiliere = {
      value: item.id,
      label: item?.name,
    };
    return newFiliere;
  });
  const niveau = niveaux?.data?.map((item) => {
    const newFiliere = {
      value: item.id,
      label: item?.name,
    };
    return newFiliere;
  });

  const classe = classes?.data?.map((item) => {
    const newClasse = {
      value: item.id,
      label: item?.classe,
      semetre: item?.semestre,
    };
    return newClasse;
  });

  const Ec = ec?.data?.map((item) => {
    const newEc = {
      value: item.id,
      label: item?.nom_element,
    };
    return newEc;
  });
  const Ue = ue?.data?.map((item) => {
    const newUe = {
      value: item.id,
      label: item?.nom_matiere,
    };
    return newUe;
  });

  const handleSelectRole = (selectOptionRole) => {
    setSelectOptionRole((prev) => selectOptionRole);
  };

  const handleSelectFiliere = (selectOptionFiliere) => {
    setSelectOptionFiliere((prev) => (prev = selectOptionFiliere));
  };
  const handleSelectNiveau = (selectOptionNiveau) => {
    setSelectOptionNiveau((prev) => (prev = selectOptionNiveau));
  };

  const handleSelectClasse = (selectOptionClasse) => {
    setSelectOptionClasse((prev) => (prev = selectOptionClasse));
  };

  const handleSelectEc = (selectOptionEc) => {
    setSelectOptionEc((prev) => (prev = selectOptionEc));
  };
  const handleSelectUe = (selectOptionUe) => {
    setSelectOptionUe((prev) => (prev = selectOptionUe));
  };

  const onSubmit = async (values, actions) => {
    const rolesPer = selectOptionRole?.map((item) => {
      return item.label;
    });

    const filiere = selectOptionFiliere?.map((item) => {
      let newFiliere = {
        id: item.value,
        name: item.label,
      };
      return newFiliere;
    });
    const level = selectOptionNiveau?.map((item) => {
      let newNiveau = {
        id: item.value,
        name: item.label,
      };
      return newNiveau;
    });

    const niveau_etude = selectOptionClasse?.map((item) => {
      let newNiveauEtude = {
        id: item.value,
        name: item.label,
        semestre: item.semetre,
      };
      return newNiveauEtude;
    });

    const ec = selectOptionEc?.map((item) => {
      let newEc = {
        id: item.value,
        name: item.label,
      };
      return newEc;
    });

    const ue = selectOptionUe?.map((item) => {
      let newUe = {
        id: item.value,
        name: item.label,
      };
      return newUe;
    });

    dispatch(
      registerOther({
        values,
        roles: rolesPer,
        theAge,
        filiere,
        level,
        niveau_etude,
        ec,
        ue,
      })
    );
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
      nomPrenom: "",
      cni: "",
      dateDeNaissance: "",
      nationalite: "",
      adresseSenegal: "",
      tel: "",
      email: "",
      sexe: "",
      username: "",
      password: "",
      confirmPassword: "",
      etablissementOrigine: "",
      typeContrat: "",
      categorie: "",
      diplome: "",
      grade: "",
      volumeHoraire: "",
      dateRecrutement: "",
      specialite: "",
      filiere: [],
    },
    validationSchema: perSchema,
    onSubmit,
  });

  //get user age
  const inputAge = values?.dateDeNaissance?.substring(0, 4);
  const currentYear = new Date().getFullYear();
  const theAge = currentYear - parseInt(inputAge);

  return (
    <>
      <h1 style={{ fontSize: "14px", textAlign: "center" }}>Ajouter Per</h1>
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
          Etat civil(PER)
        </Typography>
        <CustomFormControl
          labelTitle="Nom & prénom "
          labelWidth="30%"
          inputWidth="12rem"
          name="nomPrenom"
          type="text"
          value={values.nomPrenom}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.nomPrenom && touched.nomPrenom && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.nomPrenom}
          </Box>
        )}
        <CustomFormControl
          labelTitle="CNI"
          labelWidth="30%"
          inputWidth="12rem"
          name="cni"
          value={values.cni}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.cni && touched.cni && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.cni}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Nationalité"
          labelWidth="30%"
          inputWidth="12rem"
          name="nationalite"
          typeOfField="selectField"
          selectOptions={countries}
          type="text"
          value={values.nationalite}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.nationalite && touched.nationalite && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.nationalite}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Date de naissance"
          labelWidth="30%"
          inputWidth="12rem"
          name="dateDeNaissance"
          type="date"
          value={values.dateDeNaissance}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.dateDeNaissance && touched.dateDeNaissance && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.dateDeNaissance}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Age"
          labelWidth="30%"
          inputWidth="12rem"
          name="age"
          type="number"
          disable={true}
          value={theAge ? theAge : ""}
        />
        <CustomFormControl
          labelTitle="Sexe"
          labelWidth="30%"
          inputWidth="12rem"
          name="sexe"
          type="text"
          typeOfField="selectField"
          selectOptions={gender}
          value={values.sexe}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.sexe && touched.sexe && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.sexe}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Téléphone"
          labelWidth="30%"
          inputWidth="12rem"
          name="tel"
          value={values.tel}
          type="tel"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.tel && touched.tel && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.tel}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Email"
          labelWidth="30%"
          inputWidth="12rem"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.email}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Adresse"
          labelWidth="30%"
          inputWidth="12rem"
          name="adresseSenegal"
          type="text"
          value={values.adresseSenegal}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.adresseSenegal && touched.adresseSenegal && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.adresseSenegal}
          </Box>
        )}
        <Typography
          sx={{
            color: "rgb(177,187,198,100)",
            fontWeight: "600",
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: "12px",
          }}
        >
          Fonction
        </Typography>
        <CustomFormControl
          labelTitle="Etablissement d'origine"
          labelWidth="30%"
          inputWidth="12rem"
          name="etablissementOrigine"
          type="text"
          value={values.etablissementOrigine}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.etablissementOrigine && touched.etablissementOrigine && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.etablissementOrigine}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Type de contrat"
          typeOfField="selectField"
          labelWidth="30%"
          inputWidth="12rem"
          selectOptions={typeContrat}
          name="typeContrat"
          type="text"
          value={values.typeContrat}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.typeContrat && touched.typeContrat && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.typeContrat}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Grade"
          labelWidth="30%"
          inputWidth="12rem"
          name="grade"
          type="text"
          typeOfField="selectField"
          selectOptions={perGrade}
          value={values.grade}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.grade && touched.grade && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.grade}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Volume horaire"
          labelWidth="30%"
          inputWidth="12rem"
          name="volumeHoraire"
          type="number"
          value={values.volumeHoraire}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.volumeHoraire && touched.volumeHoraire && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.volumeHoraire}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Date recrutement"
          labelWidth="30%"
          inputWidth="12rem"
          type="date"
          name="dateRecrutement"
          value={values.dateRecrutement}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.dateRecrutement && touched.dateRecrutement && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.dateRecrutement}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Spécialité"
          labelWidth="30%"
          inputWidth="12rem"
          name="specialite"
          value={values.specialite}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.specialite && touched.specialite && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.specialite}
          </Box>
        )}

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flexWrap={"wrap"}
        >
          <InputLabel
            sx={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
              mr: "0.2rem",
              width: "30%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          >
            UE
          </InputLabel>
          <Select
            onChange={handleSelectUe}
            closeMenuOnSelect={true}
            options={Ue}
            isMulti
            styles={colourStyles}
            type="text"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flexWrap={"wrap"}
        >
          <InputLabel
            sx={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
              mr: "0.2rem",
              width: "30%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          >
            EC
          </InputLabel>
          <Select
            onChange={handleSelectEc}
            closeMenuOnSelect={true}
            options={Ec}
            isMulti
            styles={colourStyles}
            type="text"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flexWrap={"wrap"}
        >
          <InputLabel
            sx={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
              mr: "0.2rem",
              width: "30%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          >
            Filière
          </InputLabel>
          <Select
            onChange={handleSelectFiliere}
            closeMenuOnSelect={true}
            options={filiere}
            isMulti
            styles={colourStyles}
            type="text"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flexWrap={"wrap"}
        >
          <InputLabel
            sx={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
              mr: "0.2rem",
              width: "30%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          >
            Niveau
          </InputLabel>
          <Select
            onChange={handleSelectNiveau}
            closeMenuOnSelect={true}
            options={niveau}
            isMulti
            styles={colourStyles}
            type="text"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flexWrap={"wrap"}
        >
          <InputLabel
            sx={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
              mr: "0.2rem",
              width: "30%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          >
            Classe
          </InputLabel>
          <Select
            onChange={handleSelectClasse}
            closeMenuOnSelect={true}
            options={classe}
            isMulti
            styles={colourStyles}
            type="text"
          />
        </Box>
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
          value={values.username}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.username && touched.username && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.username}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Mot de passe "
          labelWidth="30%"
          inputWidth="12rem"
          name="password"
          value={values.password}
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.password}
          </Box>
        )}
        <CustomFormControl
          labelTitle="Confirmer mot de passe"
          labelWidth="30%"
          inputWidth="12rem"
          name="confirmPassword"
          value={values.confirmPassword}
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "10rem",
              color: "red",
            }}
          >
            {errors.confirmPassword}
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flexWrap={"wrap"}
        >
          <InputLabel
            sx={{
              fontFamily: ["Poppins", "sans-serif"].join(","),
              mr: "0.2rem",
              width: "30%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          >
            Rôles
          </InputLabel>
          <Select
            onChange={handleSelectRole}
            closeMenuOnSelect={true}
            options={rolesPer}
            isMulti
            styles={colourStyles}
            type="text"
          />
        </Box>
        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            disable={isSubmitting || !isValid}
            buttonText="Enregistrer"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
          <FormBtn
            buttonText="Annuler"
            bgNormalColor="#C74040"
            margin_=""
            width_="30%"
          />
        </Box>
      </form>
    </>
  );
};

export default PerForm;
