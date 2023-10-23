/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClasse,
  fetchEC,
  fetchFiliere,
  fetchNiveau,
  fetchUE,
} from "redux/scolariteFeatures";
import { CustomFormControl, FormBtn } from "components";
import api from "services/api";
import Select from "react-select";
import { InputLabel } from "@mui/material";
import { editUser } from "redux/userFeatures";
import { rolesPer } from "services";

const classStyle = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    minHeight: "28px",
    fontSize: "10px",
    p: "1rem",
    color: "#B1BBC6",
    width: "16rem",
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

const EditPerForm = ({ userId }) => {
  const dispatch = useDispatch();
  const ue = useSelector((state) => state.ue);
  const ec = useSelector((state) => state.ec);
  const filieres = useSelector((state) => state.filiere);
  const niveaux = useSelector((state) => state.niveau);
  const classes = useSelector((state) => state.classe);
  const [values, setValues] = useState({});
  const [fieldsData, setFieldsData] = useState();

  const [selectOptionFiliere, setSelectOptionFiliere] = useState();
  const [selectOptionNiveau, setSelectOptionNiveau] = useState();
  const [selectOptionClasse, setSelectOptionClasse] = useState();
  const [selectOptionEc, setSelectOptionEc] = useState();
  const [selectOptionUe, setSelectOptionUe] = useState();
  const [selectOptionRoles, setSelectOptionRoles] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      getUser();
      dispatch(fetchUE());
      dispatch(fetchEC());
      dispatch(fetchFiliere());
      dispatch(fetchNiveau());
      dispatch(fetchClasse());
    }
    return () => {
      isCancelled = true;
    };
  }, [userId]);

  const getUser = () => {
    api.getUserById(userId).then((res) => {
      if (res) {
        const newFiliereFromApi = res?.data?.filiere?.map((item) => {
          const newF = {
            label: item?.nom_matiere,
            value: item?.nom_matiere,
            id: item?.id,
          };
          return newF;
        });
        const newNiveauFromApi = res?.data?.level?.map((item) => {
          const newF = {
            label: item?.name,
            value: item?.name,
            id: item?.id,
          };
          return newF;
        });
        const newClasseFromApi = res?.data?.niveau_etude?.map((item) => {
          const newC = {
            label: item?.name,
            value: item?.name,
            id: item?.id,
          };
          return newC;
        });
        const newECFromApi = res?.data?.ec?.map((item) => {
          const newEC = {
            label: item?.nom_element,
            value: item?.nom_element,
            id: item?.id,
          };
          return newEC;
        });
        const newUEFromApi = res?.data?.unite_enseignement?.map((item) => {
          const newUE = {
            label: item?.unite_enseignement,
            value: item?.unite_enseignement,
            id: item?.id,
          };
          return newUE;
        });

        const newRolesFromApi = res?.data?.roles?.map((item) => {
          const newR = {
            label: item?.name,
            value: item?.name,
            id: item?.id,
          };
          return newR;
        });
        setSelectOptionUe(newUEFromApi);
        setSelectOptionFiliere(newFiliereFromApi);
        setSelectOptionNiveau(newNiveauFromApi);
        setSelectOptionClasse(newClasseFromApi);
        setSelectOptionEc(newECFromApi);
        setSelectOptionRoles(newRolesFromApi);
        setFieldsData(res);
      }
    });
  };

  //roles
  const roles = selectOptionRoles?.map((item) => {
    return item.label;
  });

  //niveau licence,master,doctorat
  const level = selectOptionNiveau?.map((item) => {
    let newNiveau = {
      id: item.id,
      name: item.label,
    };
    return newNiveau;
  });
  //classe
  const niveau_etude = selectOptionClasse?.map((item) => {
    let newNiveauEtude = {
      id: item.id,
      name: item.label,
      semestre: item.semestre,
    };
    return newNiveauEtude;
  });

  //ec
  const elt_const = selectOptionEc?.map((item) => {
    let elt = {
      id: item.id,
      nom_element: item.label,
    };
    return elt;
  });
  //ue
  const unit_ens = selectOptionUe?.map((item) => {
    let elt = {
      id: item.id,
      unite_enseignement: item.label,
    };
    return elt;
  });

  //filiere pharmacie, medecine
  const filiere_ = selectOptionFiliere?.map((item) => {
    let fl = {
      id: item.id,
      nom_matiere: item.label,
    };
    return fl;
  });

  //filiere
  const filiere = filieres?.data?.map((item) => {
    const newFiliere = {
      value: item?.name,
      label: item?.name,
      id: item?.id,
    };
    return newFiliere;
  });

  //niveau
  const niveau = niveaux?.data?.map((item) => {
    const newFiliere = {
      value: item.id,
      label: item?.name,
      id: item?.id,
    };
    return newFiliere;
  });

  //niveau etude
  const classe = classes?.data?.map((item) => {
    const newClasse = {
      value: item?.classe,
      label: item?.classe,
      semestre: item?.semestre,
      id: item?.id,
    };
    return newClasse;
  });

  //ec
  const Ec = ec?.data?.map((item) => {
    const newEc = {
      value: item?.nom_element,
      label: item?.nom_element,
      id: item?.id,
    };
    return newEc;
  });

  const UE = ue?.data?.map((item) => {
    const ue = {
      value: item.nom_matiere,
      label: item.nom_matiere,
      id: item?.id,
    };
    return ue;
  });

  const handleSelectRole = (selectOptionRoles) => {
    setSelectOptionRoles((prev) => selectOptionRoles);
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

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setFieldsData("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editUser({
        id: userId,
        values,
        filiere: filiere_,
        level,
        roles,
        niveau_etude,
        ec: elt_const,
        unite_enseignement: unit_ens,
        theAge: theAge ? theAge : fieldsData?.data?.age,
      })
    );
  };

  //get user age
  const inputAge = values?.dateDeNaissance?.substring(0, 4);
  const currentYear = new Date().getFullYear();
  const theAge = currentYear - parseInt(inputAge);

  return (
    <>
      <h1 style={{ fontSize: "14px", textAlign: "center" }}>Editer Per</h1>
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
          Etat civil
        </Typography>
        <CustomFormControl
          labelTitle="Nom & prénom "
          labelWidth="30%"
          inputWidth="12rem"
          name="nomPrenom"
          value={fieldsData?.data?.nom}
          type="text"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="CNI"
          labelWidth="30%"
          inputWidth="12rem"
          name="cni"
          value={fieldsData?.data?.Cin}
          type="text"
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Nationalité"
          labelWidth="30%"
          inputWidth="12rem"
          name="nationalite"
          value={fieldsData?.data?.nationalite}
          type="text"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Date de naissance"
          labelWidth="30%"
          inputWidth="12rem"
          name="dateDeNaissance"
          value={fieldsData?.data?.date_naissance}
          type="date"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Age"
          labelWidth="30%"
          inputWidth="12rem"
          name="age"
          value={theAge ? theAge : fieldsData?.data?.age}
          type="number"
        />
        <CustomFormControl
          labelTitle="Sexe"
          labelWidth="30%"
          inputWidth="12rem"
          name="sexe"
          value={fieldsData?.data?.sexe}
          type="text"
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Téléphone"
          labelWidth="30%"
          inputWidth="12rem"
          name="tel"
          value={fieldsData?.data?.tel_mobile}
          type="tel"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Email"
          labelWidth="30%"
          inputWidth="12rem"
          name="email"
          value={fieldsData?.data?.email}
          type="email"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Adresse"
          labelWidth="30%"
          inputWidth="12rem"
          name="adresseSenegal"
          value={fieldsData?.data?.adresse_senegal}
          type="text"
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
          Fonction
        </Typography>
        <CustomFormControl
          labelTitle="Etablissement d'origine"
          labelWidth="30%"
          inputWidth="12rem"
          name="etablissementOrigine"
          value={fieldsData?.data?.Etablissement_origine}
          type="text"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Type de Contrat"
          labelWidth="30%"
          inputWidth="12rem"
          name="Type_contrat"
          value={fieldsData?.data?.Type_contrat}
          type="text"
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Grade"
          labelWidth="30%"
          inputWidth="12rem"
          name="grade"
          value={fieldsData?.data?.grade}
          type="text"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Volume horaire"
          labelWidth="30%"
          inputWidth="12rem"
          name="volumeHoraire"
          value={fieldsData?.data?.volume_horaire}
          type="number"
          onChange={handleChange}
        />

        <CustomFormControl
          labelTitle="Date recrutement"
          labelWidth="30%"
          inputWidth="12rem"
          type="date"
          value={fieldsData?.data?.Date_recrutement}
          name="dateRecrutement"
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Spécialité"
          labelWidth="30%"
          inputWidth="12rem"
          name="specialite"
          value={fieldsData?.data?.Specialite}
          type="text"
          onChange={handleChange}
        />
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
            value={selectOptionFiliere}
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
            value={selectOptionNiveau}
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
              width: "14%",
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
            value={selectOptionClasse}
            isMulti
            styles={classStyle}
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
              width: "14%",
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
            options={UE}
            value={selectOptionUe}
            isMulti
            styles={classStyle}
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
              width: "14%",
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
            value={selectOptionEc}
            isMulti
            styles={classStyle}
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
              width: "14%",
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
            value={selectOptionRoles}
            isMulti
            styles={classStyle}
            type="text"
          />
        </Box>

        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            buttonText="Editer"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
          <FormBtn
            onClick={() => window.location.reload()}
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

export default EditPerForm;
