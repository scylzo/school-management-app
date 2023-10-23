/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { CustomFormControl, FormBtn, Topbar } from "components";
import Select from "react-select";
import { Box, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ClockLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "views";
import {
  createTarif,
  deleteTarif,
  fetchTarifications,
} from "redux/tarificationFeatures";
import { motifOptions } from "services";
import Notiflix from "notiflix";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    height: "30px",
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
const tarifSchema = yup.object().shape({
  montantTarif: yup
    .number()
    .positive()
    .integer()
    .max(2920000, "le montant ne doit pas dépasser 2.920.000 Frs")
    .required("Champ obligatoire"),
});

export const Tarification = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const tarifs = useSelector((state) => state.tarifications);

  const [selectValue, setSelectValue] = useState({
    selectedOption: "",
  });

  const paymentMonth = selectValue?.label?.split("/")[1];
  const monthToSend = paymentMonth
    ? paymentMonth
    : "Frais inscription administrative";

  useEffect(() => {
    dispatch(fetchTarifications());
  }, []);

  const handleSelect = (selectedOption) => {
    setSelectValue((prev) => (prev = selectedOption));
  };

  const onSubmit = async (values, actions) => {
    dispatch(
      createTarif({ values, nomTarif: selectValue?.value, monthToSend })
    );
    actions.resetForm();
  };

  const confirmDeleteTarif = (tarifId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteTarif(tarifId));
      }
    );
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
      montantTarif: "",
    },
    validationSchema: tarifSchema,
    onSubmit,
  });

  const columnsTarifs = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Intitulé Tarif",
      name: "nom_tarif",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              style={{ color: "#1B2126", fontWeight: "700", fontSize: "10px" }}
            >
              {tableMeta.rowData[1]}
            </td>
          );
        },
      },
    },
    {
      label: "Montant",
      name: "montant_tarif",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
      },
    },
    {
      label: "Mois",
      name: "mois",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            {columnMeta.label}
          </th>
        ),
      },
    },
    {
      name: "Action",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            style={{
              cursor: "pointer",
              borderBottom: "1px solid #F0F5F8",
              color: "#B5BFC9",
              fontSize: "12px",
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <button
                style={{
                  background: "#fdeeef",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => confirmDeleteTarif(tableMeta.rowData[0])}
              >
                Retirer
              </button>
            </>
          );
        },
      },
    },
  ];

  //mui options
  const options = {
    filterType: "textField",
    pagination: false,
    print: false,
    selectableRows: false,
    enableNestedDataAccess: ".",
    textLabels: {
      body: {
        noMatch: "Pas de données",
      },
    },
    downloadOptions: {
      filename: "Ussd.csv",
      separator: ";",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
  };

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD > Administration > Tarifications"
            afficherBtn={false}
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
              {tarifs?.loading ? (
                <Box display="flex" justifyContent="center" m={"1rem"}>
                  <ClockLoader color="#43a81f" />
                </Box>
              ) : (
                <MUIDataTable
                  data={tarifs?.data}
                  columns={columnsTarifs}
                  options={options}
                />
              )}
            </div>
          </div>
        </div>
        <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
          <h1
            className="level-two"
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Tarification
          </h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
                placeholder="Motif paiement"
                closeMenuOnSelect={true}
                options={motifOptions}
                styles={colourStyles}
                type="text"
              />
            </Box>

            {paymentMonth && (
              <CustomFormControl
                labelTitle="Mois"
                labelWidth="20%"
                inputWidth="12rem"
                value={paymentMonth}
              />
            )}
            <CustomFormControl
              labelTitle="Montant"
              labelWidth="20%"
              inputWidth="12rem"
              value={values.montantTarif}
              onChange={handleChange}
              name="montantTarif"
              type="number"
              onBlur={handleBlur}
            />
            {errors.montantTarif && touched.montantTarif && (
              <Box
                sx={{
                  position: "relative",
                  fontSize: "10px",
                  top: "-15px",
                  left: "8rem",
                  color: "red",
                }}
              >
                {errors.montantTarif}
              </Box>
            )}
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
        </div>
      </div>
    </div>
  );
};
