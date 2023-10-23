/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { CustomFormControl, FormBtn } from "components";
import {
  editClasse,
  fetchFiliere,
  fetchNiveau,
  fetchSemestre,
} from "redux/scolariteFeatures";
import api from "services/api";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    minHeight: "30px",
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

const EditClasseForm = ({ idClasse }) => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const niveaux = useSelector((state) => state.niveau);
  const filieres = useSelector((state) => state.filiere);
  const semestre = useSelector((state) => state.semestre);
  const [selectOptionFiliere, setSelectOptionFiliere] = useState();
  const [selectOptionNiveau, setSelectOptionNiveau] = useState();
  const [selectedNbr, setSelectedNbr] = useState();
  const [selectedSemestre, setSelectedSemestre] = useState();
  const [classeById, setClasseById] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchNiveau());
      dispatch(fetchFiliere());
      dispatch(fetchSemestre());
      getClasse();
    }
    return () => {
      isCancelled = true;
    };
  }, [idClasse]);

  //recupere une classe via son id
  const getClasse = () => {
    api.getClasseById(idClasse).then((response) => {
      if (response) {
        let filiereFromApi = [response?.data?.departement];
        const newFiliereFromApi = filiereFromApi.map((item) => {
          const newF = {
            label: item,
            value: item,
          };
          return newF;
        });
        let niveauFromApi = [response?.data?.niveau];
        const newNiveauFromApi = niveauFromApi.map((item) => {
          const newN = {
            label: item,
            value: item,
          };
          return newN;
        });
        setSelectOptionFiliere(newFiliereFromApi);
        setSelectOptionNiveau(newNiveauFromApi);
        setClasseById(response?.data?.classe);
      }
    });
  };

  //handlers
  const handleSelectFiliere = (selectOptionFiliere) => {
    setSelectOptionFiliere(selectOptionFiliere);
  };
  const handleSelectNiveau = (selectOptionFiliere) => {
    setSelectOptionNiveau(selectOptionFiliere);
  };
  const handleChangeNbr = (event) => {
    setSelectedNbr(event.target.value);
  };
  const handleSelectSemestre = (selectedSemestre) => {
    setSelectedSemestre(selectedSemestre);
  };

  //filiere
  const filiere = filieres?.data?.map((item) => {
    const newFiliere = {
      value: item.id,
      label: item?.name,
    };
    return newFiliere;
  });

  //niveau
  const niveau = niveaux?.data?.map((item) => {
    const newFiliere = {
      value: item.id,
      label: item?.name,
    };
    return newFiliere;
  });
  //semestre
  const semestres = semestre?.data?.map((item) => {
    const newSemestre = {
      value: item.id,
      label: item?.name,
    };
    return newSemestre;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userData.id;
    const semestres_ = selectedSemestre?.map((item) => {
      let newSem = {
        id: item.value,
        name: item.label,
      };
      return newSem;
    });
    dispatch(
      editClasse({
        filiere: selectOptionFiliere?.label,
        niveau: selectOptionNiveau?.label,
        classe: classe?.includes(undefined) ? classeById : classe,
        userId,
        idClasse,
        semestres_,
      })
    );
  };

  const classe = `${selectOptionFiliere?.label}/${selectOptionNiveau?.label}${selectedNbr}`;

  return (
    <>
      <h1
        className="level-two"
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: 600,
        }}
      >
        {" "}
        Editer Classe
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
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
              width: "20%",
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
              width: "20%",
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
            value={selectOptionNiveau}
            styles={colourStyles}
            type="text"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={handleChangeNbr}
              type="text"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={
                  <Typography
                    sx={{
                      fontFamily: ["Poppins", "sans-serif"].join(","),
                      fontWeight: 400,
                      fontSize: "12px",
                    }}
                  >
                    1
                  </Typography>
                }
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label={
                  <Typography
                    sx={{
                      fontFamily: ["Poppins", "sans-serif"].join(","),
                      fontWeight: 400,
                      fontSize: "12px",
                    }}
                  >
                    2
                  </Typography>
                }
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label={
                  <Typography
                    sx={{
                      fontFamily: ["Poppins", "sans-serif"].join(","),
                      fontWeight: 400,
                      fontSize: "12px",
                    }}
                  >
                    3
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
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
              width: "20%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          >
            Semestres
          </InputLabel>
          <Select
            onChange={handleSelectSemestre}
            closeMenuOnSelect={true}
            placeholder={"selectionnez semestre"}
            options={semestres}
            isMulti
            styles={colourStyles}
            type="text"
          />
        </Box>

        <CustomFormControl
          labelTitle=""
          labelWidth="10%"
          inputWidth="11rem"
          value={classe?.includes(undefined) ? classeById : classe}
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

export default EditClasseForm;
