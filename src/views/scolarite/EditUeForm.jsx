/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, InputLabel } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import api from "services/api";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { editUe, fetchSemestre } from "redux/scolariteFeatures";

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

const EditUeForm = ({ ueId }) => {
  const dispatch = useDispatch();
  const semestres = useSelector((state) => state.semestre);
  const [values, setValues] = useState({});
  const [fieldsData, setFielsData] = useState({});
  const [semestreField, setSemestreField] = useState();

  useEffect(() => {
    dispatch(fetchSemestre());
    api.getUeById(ueId).then((res) => {
      if (res.data) {
        const semestreFromApi = [res?.data?.nom_semestre];
        const newSemetreFromApi = semestreFromApi?.map((item) => {
          const newS = {
            label: item,
            value: item,
          };
          return newS;
        });
        setSemestreField(newSemetreFromApi);
        setFielsData(res.data);
      }
    });
  }, [ueId]);

  const semestreArr = semestres?.data?.map((item) => {
    const newS = {
      label: item?.name,
      value: item?.name,
      id: item?.id,
    };
    return newS;
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setFielsData("");
  };

  const handleSelectSemestre = (semestreField) => {
    setSemestreField((prev) => (prev = semestreField));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editUe({
        values,
        ueId,
        semestreId: semestreField?.id,
        nom_semestre: semestreField?.value,
      })
    );
  };

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
        Editer UE
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
          labelTitle="Nom de L'UE"
          labelWidth="30%"
          inputWidth="12rem"
          name="nomUe"
          value={fieldsData?.nom_matiere}
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Reference"
          labelWidth="30%"
          inputWidth="12rem"
          name="reference"
          value={fieldsData?.reference}
          onChange={handleChange}
        />
        <CustomFormControl
          labelTitle="Crédit"
          labelWidth="30%"
          inputWidth="12rem"
          name="credit"
          value={fieldsData?.credit}
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
              width: "20%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          >
            Semestre
          </InputLabel>
          <Select
            onChange={handleSelectSemestre}
            closeMenuOnSelect={true}
            options={semestreArr}
            value={semestreField}
            styles={colourStyles}
            type="text"
          />
        </Box>
        <CustomFormControl
          labelTitle="Type UE"
          labelWidth="30%"
          inputWidth="12rem"
          name="typeUe"
          value={fieldsData?.Type_matiere}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            type="submit"
            buttonText="Modifier"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
          <FormBtn
            type="button"
            onClick={() => window.location.reload(true)}
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

export default EditUeForm;
