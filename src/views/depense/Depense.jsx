import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { CustomFormControl, FormBtn, Sidebar, Topbar } from "components";

const fieldStyles = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  ".Mui-focused": { border: "none" },
  background: "rgb(125,177,124,5%)",
  borderRadius: "10px",
  height: "40px",
  p: "1rem",
  color: "#B1BBC6",
  width: "12rem",
};
export const Depense = () => {
  const [toggle, setToggle] = useState(false);
  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];
  const options = {
    filterType: "checkbox",
    textLabels: {
      body: {
        noMatch: "Pas de données",
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
            currentViewTitle={"USSD > Dépenses"}
            afficheSearchInput={false}
            afficherBtn={false}
          />
          <div className="main-content">
            <div className="div-area-main-content-elt">
              <MUIDataTable
                title={"Liste des dépenses"}
                data={data}
                columns={columns}
                options={options}
              />
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
              textTransform: "uppercase",
            }}
          >
            Dépenses
          </h1>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin={"1.5rem 0"}
            >
              <InputLabel
                sx={{
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  mr: "0.2rem",
                  width: "30%",
                  display: "flex",
                  fontSize: "12px",
                  whiteSpace: "normal",
                  justifyContent: "flex-start",
                }}
              >
                Créer Catégorie
              </InputLabel>
              <Select disableUnderline variant="standard" sx={fieldStyles}>
                <MenuItem value={10}>Liberte 1</MenuItem>
                <MenuItem value={20}>Mermoz</MenuItem>
                <MenuItem value={30}>Point E</MenuItem>
              </Select>
              <FormBtn
                buttonText="OK"
                bgNormalColor="#43A81F"
                margin_="1%"
                width_="8%"
              />
            </Box>
            <CustomFormControl
              labelTitle="Catégorie"
              labelWidth="30%"
              inputWidth="12rem"
            />

            <CustomFormControl
              labelTitle="Date"
              labelWidth="30%"
              inputWidth="12rem"
            />
            <CustomFormControl
              labelTitle="N° facture"
              labelWidth="30%"
              inputWidth="12rem"
            />
            <CustomFormControl
              labelTitle="Object"
              labelWidth="30%"
              inputWidth="12rem"
            />
            <CustomFormControl
              labelTitle="Documents"
              labelWidth="30%"
              inputWidth="12rem"
            />
            <CustomFormControl
              labelTitle="Montant"
              labelWidth="30%"
              inputWidth="12rem"
            />
            <Box className="montant">
              <span>Facture eau</span>
              <span> 250.000</span> <span>cfa</span>
            </Box>

            <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
              <FormBtn
                buttonText="Valider"
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
