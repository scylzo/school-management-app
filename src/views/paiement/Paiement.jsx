/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { ClipLoader, ClockLoader } from "react-spinners";
import Select from "react-select";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  Typography,
} from "@mui/material";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import { CustomFormControl, FormBtn, Sidebar, Topbar } from "components";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePayment,
  editPayment,
  fetchpayment,
} from "redux/paymentFeatures";
import PaymentStudentList from "./PaymentStudentList";
import { useNavigate } from "react-router-dom";
import { tabStyle } from "views";
import api from "services/api";
import { fetchAnneeAcad } from "redux/scolariteFeatures";
import { fetchTarifications } from "redux/tarificationFeatures";
import Notiflix from "notiflix";
import { modePaiement } from "services";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    minHeight: "28px",
    fontSize: "10px",
    p: "1rem",
    color: "#B1BBC6",
    width: "15rem",
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

export const Paiement = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.user);
  const payments = useSelector((state) => state.payment);
  const anneeAcad = useSelector((state) => state.anneeAcad);
  const tarifications = useSelector((state) => state.tarifications);
  const [paymentMonth, setPaymentMonth] = useState();
  const [loader, setLoader] = useState();
  const [paid, setNoPaid] = useState();
  const [selectMois, setSelectMois] = useState();
  const [selectAnAcad, setSelectAnAcad] = useState();
  const [openVerif, setOpenVerif] = React.useState(false);
  const [paymentByid, setPaymentByid] = useState();
  const [anAcadPaiementSelect, setAnAcadPaiementSelect] = useState();
  const [modePaiementSelect, setModePaiementSelect] = useState();
  const [tarifSelect, setTarifSelect] = useState();
  const [values, setValues] = useState();
  const [paiementId, setPaiementId] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchpayment());
      dispatch(fetchTarifications());
      getAllPaymentByMonth();
      dispatch(fetchAnneeAcad());
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  ///no payment payloads
  const handleSelectAnAcad = (selectAnAcad) => {
    setSelectAnAcad((prev) => (prev = selectAnAcad));
  };
  const handleSelectMois = (selectMois) => {
    setSelectMois((prev) => (prev = selectMois));
  };

  //get a payment by Id
  const getPaymentById = (id) => {
    api.getPaiementId(id).then((res) => {
      if (res) {
        let anAcad = [res?.data?.Cycle];
        const newAnAcad = anAcad?.map((item) => {
          const newAn = {
            label: item,
            value: item,
          };
          return newAn;
        });
        let modePaiement = [res?.data?.mode_paiement];
        const modePay = modePaiement?.map((item) => {
          const newMode = {
            label: item,
            value: item,
          };
          return newMode;
        });

        let tarifMensualite = res?.data?.tarifications?.map((item) => {
          const newTarif = {
            label: item,
            value: item,
          };
          return newTarif;
        });
        setTarifSelect(tarifMensualite);
        setModePaiementSelect(modePay);
        setAnAcadPaiementSelect(newAnAcad);
        setPaymentByid(res.data);
      }
    });
  };

  //mui dialog handler
  const handleOpenVerif = () => {
    setOpenVerif(true);
  };

  const handleCloseVerif = () => {
    setOpenVerif(false);
  };

  //delete a payment
  const confirmDeletePaiement = (anneeAcadId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir supprimer?",
      "Confirmer",
      "Annuler",

      () => {
        dispatch(deletePayment(anneeAcadId));
      }
    );
  };

  // edit inputs handlers
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setPaymentByid("");
  };

  const handleSelectAnAcadEdit = (anAcadPaiementSelect) => {
    setAnAcadPaiementSelect((prev) => (prev = anAcadPaiementSelect));
  };

  const handleSelectModePaiementEdit = (modePaiementSelect) => {
    setModePaiementSelect((prev) => (prev = modePaiementSelect));
  };

  const handleSelectTarif = (tarifSelect) => {
    setTarifSelect((prev) => (prev = tarifSelect));
  };

  //edit payment function
  const editingPayment = () => {
    const motifToSend = tarifSelect?.map((item) => {
      return item.value;
    });

    dispatch(
      editPayment({
        paiementId,
        date: values?.date,
        montant: values?.montant,
        Cycle: anAcadPaiementSelect.value,
        mode_paiement: modePaiementSelect.value,
        tarifications: motifToSend,
      })
    );
  };

  // react select options
  const tarifs = tarifications?.data?.map((item) => {
    const newTarifsName = {
      value: item.mois,
      label: item?.mois,
    };
    return newTarifsName;
  });

  const anAcad = anneeAcad?.data?.map((item) => {
    const newAn = {
      value: item?.name,
      label: item?.name,
    };
    return newAn;
  });

  ///----
  const getAllPaymentByMonth = () => {
    api.getPaymentByMonth().then((res) => {
      if (res) {
        console.log(res);
        setPaymentMonth(res.data);
      }
    });
  };

  const getAllUnpaid = () => {
    const mois = selectMois?.value;
    const Cycle = selectAnAcad.value;
    setLoader(<ClipLoader />);
    api.getAllNonPaye({ Cycle, mois }).then((res) => {
      if (res.data) {
        setLoader();
        setNoPaid(res.data);
      }
    });
  };

  //paiement data columns
  const columnsPaiments = [
    { label: "Code", name: "id", options: { display: false } },
    {
      label: "Nom",
      name: "user.nom",
      options: {
        sort: true,
        // customHeadRender: (columnMeta) => (
        //   <th
        //     style={{
        //       textAlign: "left",
        //       cursor: "pointer",
        //       borderBottom: "1px solid #F0F5F8",
        //       color: "#B5BFC9",
        //       fontSize: "10px",
        //       fontWeight: 600,
        //     }}
        //   >
        //     {columnMeta.label}
        //   </th>
        // ),
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
      label: "Date paiement",
      name: "date",
      options: {
        filter: false,
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
          return <span>{tableMeta.rowData[2]} </span>;
        },
      },
    },
    {
      label: "Motif paiement",
      name: "motif_paiement",
      options: {
        display: false,
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
      },
    },
    {
      label: "Montant",
      name: "montant",
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
      },
    },
    {
      label: "Mode paiement",
      name: "mode_paiement",
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
      },
    },
    {
      label: "UserId",
      name: "userId",
      options: {
        display: false,
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
                  background: "#eaf7d4",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPaiementId(tableMeta.rowData[0]);
                  getPaymentById(tableMeta.rowData[0]);
                  handleOpenVerif();
                }}
              >
                Editer
              </button>
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
                onClick={() => confirmDeletePaiement(tableMeta.rowData[0])}
              >
                Supprimer
              </button>
              <button
                style={{
                  background: "#F3F9F2",
                  padding: "3px 5px",
                  margin: "2px",
                  borderRadius: "3px",
                  color: "#68727B",
                  fontSize: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`facture/${tableMeta.rowData[6]}`);
                }}
              >
                Facture
              </button>
            </>
          );
        },
      },
    },
  ];

  //payment by month
  const columnsMonthPaiments = [
    { label: "Code", name: "id", options: { display: false } },

    {
      label: "Nom",
      name: "nom",
      sort: true,
      // options: {
      //   customHeadRender: (columnMeta) => (
      //     <th
      //       style={{
      //         textAlign: "left",
      //         cursor: "pointer",
      //         borderBottom: "1px solid #F0F5F8",
      //         color: "#B5BFC9",
      //         fontSize: "10px",
      //         fontWeight: 600,
      //       }}
      //     >
      //       {columnMeta.label}
      //     </th>
      //   ),
      //   customBodyRender: (value, tableMeta, updateValue) => {
      //     return (
      //       <td
      //         style={{ color: "#1B2126", fontWeight: "700", fontSize: "10px" }}
      //       >
      //         {tableMeta.rowData[1]}
      //       </td>
      //     );
      //   },
      // },
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
      label: "Date paiement",
      name: "date",
      options: {
        filter: false,
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
      },
    },
    {
      label: "Montant",
      name: "montant_tarif",
      options: {
        filter: false,
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
      },
    },
    {
      label: "Motif paiement",
      name: "motif_paiement",
      options: {
        display: false,
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
      },
    },
    {
      label: "Motif",
      name: "nom_tarif",
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
      },
    },
    {
      label: "UserId",
      name: "userId",
      options: {
        display: false,
      },
    },
  ];
  const nonPaidColumn = [
    {
      label: "Nom & Prénom",
      name: "nom",
      options: {
        sort: true,
        // customHeadRender: (columnMeta) => (
        //   <th
        //     style={{
        //       textAlign: "left",
        //       cursor: "pointer",
        //       borderBottom: "1px solid #F0F5F8",
        //       color: "#B5BFC9",
        //       fontSize: "10px",
        //       fontWeight: 600,
        //     }}
        //   >
        //     {columnMeta.label}
        //   </th>
        // ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td style={{ color: "#1B2126", fontWeight: "700" }}>
              {tableMeta.rowData[0]}
            </td>
          );
        },
      },
    },
    {
      label: "Matricule",
      name: "Matricule",
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
      label: "Filiere",
      name: "Filiere",
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
      label: "Classe",
      name: "Niveau",
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
  ];

  //mui options
  const options = {
    pagination: false,
    print: false,
    viewColumns: false,
    selectableRows: false,
    filter: false,
    textLabels: {
      body: {
        noMatch: "Pas de données",
      },
    },
    enableNestedDataAccess: ".",
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
    <>
      <Dialog open={openVerif} onClose={handleCloseVerif} maxWidth={"lg"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogContent
            sx={{
              width: "50rem",
              height: "25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <CustomFormControl
              labelTitle="Motif paiement"
              labelWidth="15%"
              inputWidth="40rem"
              type="text"
              name="motif_paiement"
              value={paymentByid?.motif_paiement}
            />

            <Box style={{ width: "100%" }}>
              <CustomFormControl
                labelTitle="Date"
                labelWidth="20%"
                inputWidth="15rem"
                type="date"
                name="date"
                onChange={handleChange}
                value={paymentByid?.date}
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
                Année Académique
              </InputLabel>
              <Select
                onChange={handleSelectAnAcadEdit}
                closeMenuOnSelect={true}
                options={anAcad}
                value={anAcadPaiementSelect}
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
                Mode de paiement
              </InputLabel>
              <Select
                onChange={handleSelectModePaiementEdit}
                closeMenuOnSelect={true}
                options={modePaiement}
                value={modePaiementSelect}
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
                Mensualités
              </InputLabel>
              <Select
                onChange={handleSelectTarif}
                placeholder="select mois"
                closeMenuOnSelect={true}
                options={tarifs}
                value={tarifSelect}
                isMulti
                styles={colourStyles}
                type="text"
              />
            </Box>
            <Box style={{ width: "100%" }}>
              <CustomFormControl
                labelTitle="Montant"
                labelWidth="20%"
                inputWidth="15rem"
                type="number"
                name="montant"
                onChange={handleChange}
                value={paymentByid?.montant}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="40%"
              flexWrap={"wrap"}
            ></Box>
          </DialogContent>
          <DialogActions style={{ margin: "1rem 0", width: "100%" }}>
            <FormBtn
              onClick={() => editingPayment()}
              type="button"
              buttonText="Editer"
              bgNormalColor="#43A81F"
              margin_=""
              width_="30%"
            />

            <FormBtn
              type="submit"
              onClick={() => handleCloseVerif()}
              buttonText="Annuler"
              bgNormalColor="#C74040"
              margin_=""
              width_="30%"
            />
          </DialogActions>
        </Box>
      </Dialog>

      <div className="div-container">
        <div className={toggle ? "sidebar close" : "sidebar"}>
          <Sidebar toggleAction={() => setToggle(!toggle)} />
        </div>
        <div className="content-wrapper">
          <div className="main-container">
            <Topbar
              currentViewTitle="USSD > Administration > Paiements"
              afficherBtn={false}
            />
            <div className="main-content">
              <div className="div-area-main-content-elt">
                <Tabs
                  aria-label="Basic tabs"
                  defaultValue={0}
                  sx={{
                    borderRadius: "lg",
                  }}
                >
                  <TabList>
                    <Tab sx={tabStyle}>Paiement</Tab>
                    <Tab sx={tabStyle}> Paiement par mois</Tab>
                    <Tab sx={tabStyle}> Non payé</Tab>
                  </TabList>
                  <TabPanel value={0} sx={{ p: 2 }}>
                    {payments?.loading ? (
                      <Box display="flex" justifyContent="center" m={"1rem"}>
                        <ClockLoader color="#43a81f" />
                      </Box>
                    ) : (
                      <MUIDataTable
                        data={payments?.data}
                        columns={columnsPaiments}
                        options={options}
                      />
                    )}
                  </TabPanel>
                  <TabPanel value={1} sx={{ p: 2 }}>
                    <MUIDataTable
                      data={paymentMonth}
                      columns={columnsMonthPaiments}
                      options={options}
                    />
                  </TabPanel>
                  <TabPanel value={2} sx={{ p: 2 }}>
                    <Box display={"flex"} gap={1}>
                      <Select
                        onChange={handleSelectAnAcad}
                        closeMenuOnSelect={true}
                        placeholder="Année Académique"
                        options={anAcad}
                        styles={colourStyles}
                        type="text"
                      />
                      <Select
                        onChange={handleSelectMois}
                        closeMenuOnSelect={true}
                        placeholder="Mois"
                        options={tarifs}
                        styles={colourStyles}
                        type="text"
                      />

                      <Button
                        onClick={() => getAllUnpaid()}
                        sx={{ background: "#E95060", borderRadius: "8px" }}
                      >
                        <Typography
                          fontSize="10px"
                          fontWeight="700"
                          color="#fff"
                        >
                          Charger
                        </Typography>
                        {loader}
                      </Button>
                    </Box>
                    <MUIDataTable
                      data={paid}
                      columns={nonPaidColumn}
                      options={options}
                    />
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="right-content" style={{ padding: "1.5rem 1rem" }}>
            {student?.loading ? (
              <Box display="flex" justifyContent="center" m={"1rem"}>
                <ClockLoader color="#43a81f" />
              </Box>
            ) : (
              <>
                <PaymentStudentList />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
