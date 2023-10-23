import React, { useState } from "react";
import { Box } from "@mui/material";
import { CustomFormControl, FormBtn, Topbar } from "components";

import { Sidebar } from "views";

export const Cours = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD > Etudiants > Cours"
            afficherBtn={false}
            afficheSearchInput={false}
          />
          <Box sx={{ padding: "5rem" }}>
            <Box
              sx={{
                background: "#fff",
                padding: "2rem 1rem",
                borderRadius: "10px",
              }}
            >
              <h1 className="level-two ">Modifier le profil</h1>
              <Box>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <CustomFormControl
                    labelTitle="Nom & prénom"
                    labelWidth="30%"
                    inputWidth="12rem"
                  />
                  <CustomFormControl
                    labelTitle="Email"
                    labelWidth="30%"
                    inputWidth="12rem"
                  />
                  <CustomFormControl
                    labelTitle="Mot de passe"
                    labelWidth="30%"
                    inputWidth="12rem"
                  />
                  <CustomFormControl
                    labelTitle="Confirmer mot de passe"
                    labelWidth="30%"
                    inputWidth="12rem"
                  />

                  <Box
                    display="flex"
                    justifyContent="center"
                    gap="2rem"
                    mt="1rem"
                  >
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
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
