/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { CustomFormControl, FormBtn, Topbar } from "components";
import { Sidebar } from "views";
import { Box } from "@mui/material";

export const ProfilParent = () => {
  const [toggle, setToggle] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD > Parent > Profil"
            afficherBtn={false}
            afficheSearchInput={false}
          />
          <Box sx={{ padding: "5rem" }} className="bloc-form-container">
            <Box
              sx={{
                background: "#fff",
                padding: "2rem 1rem",
                borderRadius: "10px",
              }}
            >
              <Box>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <CustomFormControl
                    labelTitle="Nom d'utlisateur"
                    labelWidth="30%"
                    inputWidth="20rem"
                    value={user?.username}
                  />
                  <CustomFormControl
                    labelTitle="Email"
                    labelWidth="30%"
                    inputWidth="20rem"
                    value={user.email}
                  />
                  <CustomFormControl
                    labelTitle="Mot de passe"
                    labelWidth="30%"
                    inputWidth="20rem"
                  />
                  <CustomFormControl
                    labelTitle="Confirmer mot de passe"
                    labelWidth="30%"
                    inputWidth="20rem"
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
