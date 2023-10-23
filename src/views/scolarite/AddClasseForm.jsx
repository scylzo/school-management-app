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
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CustomFormControl, FormBtn } from "components";
import {
  addClasse,
  fetchFiliere,
  fetchNiveau,
  fetchSemestre,
} from "redux/scolariteFeatures";
import { useFormik } from "formik";

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

const classeSchema = yup.object().shape({
  filiere: yup.string().required("Champ est obligatoire"),
  niveau: yup.string().required("Champ obligatoire"),
  nbr: yup.number().positive().integer().required("Champ obligatoire"),
});

const AddClasseForm = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const niveaux = useSelector((state) => state.niveau);
  const filiere = useSelector((state) => state.filiere);
  const semestre = useSelector((state) => state.semestre);
  const [selectOption, setSelectOption] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchNiveau());
      dispatch(fetchFiliere());
      dispatch(fetchSemestre());
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSelect = (selectedOption) => {
    setSelectOption((prev) => (prev = selectedOption));
  };

  const semestres = semestre?.data?.map((item) => {
    const newSemestre = {
      value: item.id,
      label: item?.name,
    };
    return newSemestre;
  });

  const onSubmit = async (values, actions) => {
    const userId = userData.id;
    const semestres_ = selectOption?.map((item) => {
      let newSem = {
        id: item.value,
        name: item.label,
      };
      return newSem;
    });
    dispatch(addClasse({ values, classe, userId, semestres: semestres_ }));
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
      filiere: "",
      niveau: "",
      nbr: "",
    },
    validationSchema: classeSchema,
    onSubmit,
  });
  const classe = `${values.filiere}/${values.niveau}${values.nbr}`;

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
        Ajouter Classe
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <CustomFormControl
          typeOfField={"selectField"}
          labelTitle="Filière"
          labelWidth="30%"
          inputWidth="12rem"
          selectOptionsFromApiFiliere={filiere?.data}
          value={values.filiere}
          onChange={handleChange}
          name="filiere"
          type="text"
          onBlur={handleBlur}
        />
        {errors.filiere && touched.filiere && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.filiere}
          </Box>
        )}
        <CustomFormControl
          typeOfField={"selectField"}
          labelTitle="Niveau"
          labelWidth="30%"
          inputWidth="12rem"
          selectOptionsFromApiNiveau={niveaux?.data}
          value={values.niveau}
          onChange={handleChange}
          name="niveau"
          type="text"
          onBlur={handleBlur}
        />
        {errors.niveau && touched.niveau && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.niveau}
          </Box>
        )}
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
              value={values.nbr}
              onChange={handleChange}
              name="nbr"
              type="text"
              onBlur={handleBlur}
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
          {errors.nbr && touched.nbr && (
            <Box
              sx={{
                position: "relative",
                fontSize: "10px",
                top: "-15px",
                left: "8rem",
                color: "red",
              }}
            >
              {errors.nbr}
            </Box>
          )}
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
          ></InputLabel>
          <Select
            onChange={handleSelect}
            placeholder="Semestres"
            closeMenuOnSelect={true}
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
          value={classe}
        />

        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            disable={isSubmitting || !isValid}
            type="submit"
            buttonText="Ajouter"
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

export default AddClasseForm;
