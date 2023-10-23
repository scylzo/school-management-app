/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, InputLabel } from "@mui/material";
import Select from "react-select";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { motifPaiement } from "services";
import { fetchTarifications } from "redux/tarificationFeatures";
import { CustomFormControl, FormBtn } from "components";
import { fetchAnneeAcad } from "redux/scolariteFeatures";
import { fetchAdmissionById } from "redux/admissionFeatures";
import { useFormik } from "formik";
import { addPayment } from "redux/paymentFeatures";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    minHeight: "30px",
    fontSize: "10px",
    p: "1rem",
    color: "#B1BBC6",
    width: "14rem",
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

//notification schema
export const paiementSchema = yup.object().shape({
  date: yup.string().required("Champ obligatoire"),
});

export const EditPaymentForm = ({ handleDisplayStudentList, student }) => {
  const dispatch = useDispatch();
  const tarifications = useSelector((state) => state.tarifications);
  const admissions = useSelector((state) => state.admissionById);

  const user = JSON.parse(localStorage.getItem("userData"));

  const [selectAnAcad, setSelectAnAcad] = useState();
  const [selectMotif, setSelectMotif] = useState();
  const [selectModePaiement, setSelectModePaiement] = useState();

  const paymentAdmissions = admissions?.data?.map((item) => {
    const newAdmission = {
      id: item.id,
      value: item.Cycle,
      label: item.Cycle,
    };
    return newAdmission;
  });

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchAnneeAcad());
      dispatch(fetchTarifications());
      dispatch(fetchAdmissionById({ studentId: student?.id }));
    }
    return () => {
      isCancelled = true;
    };
  }, [student]);

  //get name firt letter
  const getFirstLetters = () => {
    const firstLetters = student?.nom
      ?.split(" ")
      ?.map((word) => word.charAt(0))
      .join("");

    return firstLetters;
  };

  const tarifs = tarifications?.data?.map((item) => {
    const newTarifsName = {
      value: item.mois,
      label: item?.mois,
      id: item?.id,
      montant: item.montant_tarif,
    };
    return newTarifsName;
  });

  const handleSelectAnAcad = (selectAnAcad) => {
    setSelectAnAcad((prev) => (prev = selectAnAcad));
  };
  const handleSelectMotif = (selectMotif) => {
    setSelectMotif((prev) => (prev = selectMotif));
  };
  const handleSelectModePaiement = (selectModePaiement) => {
    setSelectModePaiement((prev) => (prev = selectModePaiement));
  };

  const montant = selectMotif?.map((item) => {
    return +item.montant;
  });

  let sum = 0;
  for (let i = 0; i < montant?.length; i++) {
    sum += montant[i];
  }
  const montantPayer = sum;

  const onSubmit = async (values, actions) => {
    const utilisateur = user?.nom;
    const userId = student?.id;
    const motifToSend = selectMotif?.map((item) => {
      return item.value;
    });

    dispatch(
      addPayment({
        values,
        selectAnAcad,
        selectModePaiement,
        montantPayer,
        utilisateur,
        userId,
        selectMotif: motifToSend,
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
      date: "",
    },
    validationSchema: paiementSchema,
    onSubmit,
  });

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          sx={{
            width: "100px",
            height: "100px",
            borderRadius: "100px",
            background: "#E4EBF3",
            display: "flex",
            fontSize: "1rem",
            fontWeight: 500,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box> {getFirstLetters()}</Box>
        </Box>

        <h1 className="level-two student-info">
          <span> {student?.nom} </span>
          <br /> <span>{student?.Matricule} </span>
        </h1>
      </Box>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleSubmit}
      >
        <CustomFormControl
          labelTitle="Date"
          labelWidth="10%"
          inputWidth="12rem"
          type="date"
          onChange={handleChange}
          value={values.date}
          name="date"
          onBlur={handleBlur}
        />
        {errors.date && touched.date && (
          <Box
            sx={{
              position: "relative",
              fontSize: "10px",
              top: "-15px",
              left: "8rem",
              color: "red",
            }}
          >
            {errors.date}
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
              width: "10%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          ></InputLabel>
          <Select
            onChange={handleSelectAnAcad}
            placeholder="Année académique"
            closeMenuOnSelect={true}
            options={paymentAdmissions}
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
              width: "10%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          ></InputLabel>
          <Select
            onChange={handleSelectMotif}
            placeholder="Motif paiement"
            closeMenuOnSelect={true}
            options={tarifs}
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
              width: "10%",
              textAlign: "center",
              display: "flex",
              fontSize: "12px",
              whiteSpace: "normal",
              justifyContent: "flex-start",
            }}
          ></InputLabel>
          <Select
            onChange={handleSelectModePaiement}
            placeholder="Mode de paiement"
            closeMenuOnSelect={true}
            options={motifPaiement}
            styles={colourStyles}
            type="text"
          />
        </Box>

        <Box className="montant">
          <span>Montant</span>
          <span>{montantPayer} </span> <span>cfa</span>
        </Box>

        <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
          <FormBtn
            disable={isSubmitting || !isValid}
            type="submit"
            buttonText="Valider"
            bgNormalColor="#43A81F"
            margin_=""
            width_="30%"
          />
          <FormBtn
            type="submit"
            onClick={() => handleDisplayStudentList()}
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
