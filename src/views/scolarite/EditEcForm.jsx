/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, InputLabel } from "@mui/material";
import { CustomFormControl, FormBtn } from "components";
import Select from "react-select";
import api from "services/api";
import { useDispatch, useSelector } from "react-redux";
import { editEc, fetchUE } from "redux/scolariteFeatures";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    minHeight: "30px",
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

const EditEcForm = ({ ecId }) => {
  const dispatch = useDispatch();
  const ue = useSelector((state) => state.ue);
  const [values, setValues] = useState({});
  const [fieldsData, setFielsData] = useState({});
  const [selectUeFields, setSelectUeFields] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchUE());
      api.getEcById(ecId).then((res) => {
        if (res?.data) {
          setFielsData(res.data);
        }
      });
    }
    return () => {
      isCancelled = true;
    };
  }, [ecId]);

  const unite_ens = ue?.data?.map((item) => {
    const newUe = {
      label: item?.nom_matiere,
      value: item?.nom_matiere,
      id: item?.id,
    };
    return newUe;
  });

  const handleSelectUe = (selectUeFields) => {
    setSelectUeFields((prev) => (prev = selectUeFields));
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setFielsData("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editEc({
        values,
        ecId,
        matiereId: selectUeFields?.id,
        nom_matiere: selectUeFields?.value,
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
        Edit EC
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
          labelTitle="Nom de L'EC"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.nom_element}
          onChange={handleChange}
          name="nomEc"
        />
        <CustomFormControl
          labelTitle="CM"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.cm}
          onChange={handleChange}
          name="cm"
        />
        <CustomFormControl
          labelTitle="Reference"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.reference}
          onChange={handleChange}
          name="reference"
        />
        <CustomFormControl
          labelTitle="Stage"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.stage}
          onChange={handleChange}
          name="stage"
        />
        <CustomFormControl
          labelTitle="TP/TD"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.TP_TD}
          onChange={handleChange}
          name="tpTd"
        />
        <CustomFormControl
          labelTitle="TPE"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.TPE}
          onChange={handleChange}
          name="tpe"
        />
        <CustomFormControl
          labelTitle="VHT"
          labelWidth="30%"
          inputWidth="12rem"
          value={fieldsData?.VHT}
          onChange={handleChange}
          name="vht"
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
            UE
          </InputLabel>
          <Select
            onChange={handleSelectUe}
            closeMenuOnSelect={true}
            placeholder={"selectionnez UE"}
            options={unite_ens}
            styles={colourStyles}
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

export default EditEcForm;
