import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CoPresentOutlinedIcon from "@mui/icons-material/CoPresentOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import ussdlogo from "../../assets/images/ussdlogo.png";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { AppContext } from "App";

let activeStyle = {
  textDecoration: "none",
  transition: "all 10s ease !important",
  backgroundColor: "#c74040",
};

const Item = ({
  title,
  to,
  icon,
  setSelected,
  selected,
  emptyLocalStorage,
}) => {
  return (
    <li
      className="nav-links"
      active={selected === title}
      onClick={() => {
        setSelected(title);
        emptyLocalStorage();
      }}
    >
      <NavLink
        to={to}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {icon} <span> {title}</span>
      </NavLink>
    </li>
  );
};

export const Sidebar = ({ toggleAction, toggle }) => {
  const {
    alignment,
    setAlignment,
    selected,
    setSelected,
    defaultPer,
    setDefaultPer,
  } = useContext(AppContext);
  const loggedUserData = JSON.parse(localStorage.getItem("userData"));

  const emptyLocalStorage = () => {
    localStorage.clear();
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);

    if (loggedUserData.roles.length > 1) {
      if (newAlignment === "per") {
        localStorage.setItem("isPer", true);
        localStorage.setItem("isPats", false);
      }
    }
    if (loggedUserData.roles.length > 1) {
      if (newAlignment === "pats") {
        localStorage.setItem("isPats", true);
        localStorage.setItem("isPer", false);
        setDefaultPer(false);
      }
    }
  };
  const handleChangeVertical = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (loggedUserData.roles.length > 1) {
      if (newAlignment === "per") {
        localStorage.setItem("isPer", true);
        localStorage.setItem("isPats", false);
      }
    }
    if (loggedUserData.roles.length > 1) {
      if (newAlignment === "pats") {
        localStorage.setItem("isPats", true);
        localStorage.setItem("isPer", false);
      }
    }
  };

  const isPer = JSON.parse(localStorage.getItem("isPer"));
  const isPats = JSON.parse(localStorage.getItem("isPats"));

  return (
    <>
      <header>
        <div className="logo-container">
          <img src={ussdlogo} alt="ussd logo" />
          <div className="burger" onClick={toggleAction}>
            <ChevronRightIcon
              fontSize="large"
              sx={{ color: "white", fontSize: "25px" }}
            />
          </div>
        </div>
      </header>

      {loggedUserData.roles.length > 1 && (
        <Box>
          {!toggle && (
            <Box display="flex" justifyContent={"center"} mt={2}>
              {" "}
              <ToggleButtonGroup
                value={alignment}
                exclusive
                orientation="horizontal"
                onChange={handleChange}
                aria-label="Platform"
                fullWidth
                size="small"
              >
                <ToggleButton
                  value="per"
                  sx={{
                    borderBottomLeftRadius: "30px",
                    borderTopLeftRadius: "30px",
                    background: "#43a81f",
                    color: "#fff",
                    "&.Mui-selected ": {
                      background: "rgb(199, 64, 64) !important",
                      color: "#fff",
                    },
                  }}
                >
                  PER
                </ToggleButton>
                <ToggleButton
                  value="pats"
                  sx={{
                    borderBottomRightRadius: "30px",
                    borderTopRightRadius: "30px",
                    background: "#43a81f",
                    color: "#fff",
                    "&.Mui-selected ": {
                      background: "rgb(199, 64, 64) !important",
                      color: "#fff",
                    },
                  }}
                >
                  {loggedUserData.roles[0]?.split("_").pop() !== "ENSEIGNANT"
                    ? loggedUserData.roles[0]?.split("_").pop()
                    : "PATS"}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
          {toggle && (
            <Box display="flex" justifyContent={"center"} mt={2}>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                orientation="vertical"
                onChange={handleChangeVertical}
                aria-label="Platform"
                sx={{ background: "#43a81f" }}
                color="primary"
              >
                <ToggleButton
                  value="per"
                  sx={{
                    "&.Mui-selected ": {
                      background: "rgb(199, 64, 64) !important",
                    },
                  }}
                >
                  <CoPresentOutlinedIcon style={{ color: "#fff" }} />
                </ToggleButton>
                <ToggleButton
                  value="pats"
                  sx={{
                    "&.Mui-selected ": {
                      background: "rgb(199, 64, 64) !important",
                    },
                  }}
                >
                  <ContactPhoneOutlinedIcon style={{ color: "#fff" }} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
        </Box>
      )}

      <div className="menu-container">
        <div className="menu">
          <ul className="menu-links">
            {/* ADMINISTRATION */}
            {loggedUserData?.roles.length === 1 &&
              loggedUserData?.roles[0] === "ROLE_ADMIN" && (
                <div>
                  <Item
                    icon={<HomeOutlinedIcon />}
                    title="Tableau de bord"
                    to="/app/administration/tableau-de-bord"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<AdminPanelSettingsOutlinedIcon />}
                    title="Gestion administration"
                    to="/app/administration/gestion-administratifs-personnels"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<SupervisorAccountOutlinedIcon />}
                    title="Utilisateurs"
                    to="/app/administration/utilisateurs"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<SchoolOutlinedIcon />}
                    title="Etudiants"
                    to="/app/administration/etudiants"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<PeopleOutlinedIcon />}
                    title="Personnels"
                    to="/app/administration/personnels"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<FamilyRestroomOutlinedIcon />}
                    title="Accès parents"
                    to="/app/administration/acces-parents"
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    icon={<AutoStoriesOutlinedIcon />}
                    title="Scolarité"
                    to="/app/administration/scolarite"
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    icon={<ScheduleOutlinedIcon />}
                    title="Emploi du temps"
                    to="/app/administration/emploi-du-temps"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<CoPresentIcon />}
                    title="Assiduités"
                    to="/app/administration/assidute"
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    icon={<NoteAltOutlinedIcon />}
                    title="Notes & évaluations"
                    to="/app/administration/notes-et-evaluations"
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    icon={<FolderCopyOutlinedIcon />}
                    title="Attestations"
                    to="/app/administration/attestations"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<FolderCopyOutlinedIcon />}
                    title="Certificats"
                    to="/app/administration/certificats"
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    icon={<PaymentsOutlinedIcon />}
                    title="Paiements"
                    to="/app/administration/paiements"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<MoneyOutlinedIcon />}
                    title="Tarification"
                    to="/app/administration/tarification"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<AutoStoriesOutlinedIcon />}
                    title="Bibliothéque"
                    to="/app/administration/bibliotheque"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<LibraryBooksIcon />}
                    title="Syllabus"
                    to="/app/administration/syllabus"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
              )}

            {/* PATS */}
            {loggedUserData.roles[0] === "ROLE_PATHS" && (
              <div>
                <Item
                  icon={<HomeOutlinedIcon />}
                  title="Tableau de bord"
                  to="/app/pats/tableau-de-bord"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<SupervisorAccountOutlinedIcon />}
                  title="Utilisateurs"
                  to="/app/pats/utilisateurs"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<SchoolOutlinedIcon />}
                  title="Etudiants"
                  to="/app/pats/etudiants"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<PeopleOutlinedIcon />}
                  title="Personnels"
                  to="/app/pats/personnels"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<FamilyRestroomOutlinedIcon />}
                  title="Accès parents"
                  to="/app/pats/acces-parents"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<AutoStoriesOutlinedIcon />}
                  title="Scolarité"
                  to="/app/pats/scolarite"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<ScheduleOutlinedIcon />}
                  title="Emploi du temps"
                  to="/app/pats/emploi-du-temps"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<CoPresentIcon />}
                  title="Assiduités"
                  to="/app/pats/assidute"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<AutoStoriesOutlinedIcon />}
                  title="Bibliothéque"
                  to="/app/pats/bibliotheque"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<LibraryBooksIcon />}
                  title="Syllabus"
                  to="/app/pats/syllabus"
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            )}

            {/* ETUDIANTS */}
            {loggedUserData?.roles[0] === "ROLE_ETUDIANT" && (
              <div>
                <Item
                  icon={<HomeOutlinedIcon />}
                  title="Tableau de bord"
                  to="/app/etudiants/tableau-de-bord"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<Person3OutlinedIcon />}
                  title="Profil"
                  to="/app/etudiants/profil"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<SnippetFolderOutlinedIcon />}
                  title="Dossiers"
                  to="/app/etudiants/dossiers"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<NoteAltOutlinedIcon />}
                  title="Certificat"
                  to="/app/etudiants/certificats"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<Person3OutlinedIcon />}
                  title="Admission"
                  to="/app/etudiants/demande-admission"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<AutoStoriesOutlinedIcon />}
                  title="Bibliothéque"
                  to="/app/etudiants/bibliotheque"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<LibraryBooksIcon />}
                  title="Syllabus"
                  to="/app/etudiants/syllabus"
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            )}

            {/* PROF */}
            {loggedUserData?.roles.length === 1 &&
              loggedUserData?.roles[0] === "ROLE_ENSEIGNANT" && (
                <div>
                  <Item
                    icon={<HomeOutlinedIcon />}
                    title="Tableau de bord"
                    to="/app/professeur/tableau-de-bord"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<Person3OutlinedIcon />}
                    title="Profil"
                    to="/app/professeur/profil"
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    icon={<NoteAltOutlinedIcon />}
                    title="Note & ÉValuation"
                    to="/app/professeur/notes-et-evaluations"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
              )}

            {/* PER  ADMIN */}
            {loggedUserData?.roles[1] === "ROLE_ENSEIGNANT" &&
              (isPer || defaultPer) && (
                <div>
                  <Item
                    icon={<HomeOutlinedIcon />}
                    title="Tableau de bord"
                    to="/app/professeur/tableau-de-bord"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<Person3OutlinedIcon />}
                    title="Profil"
                    to="/app/professeur/profil"
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    icon={<NoteAltOutlinedIcon />}
                    title="Note & ÉValuation"
                    to="/app/professeur/notes-et-evaluations"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
              )}

            {/* PER non ADMIN */}
            {loggedUserData.roles[1] === "ROLE_ENSEIGNANT" && isPats && (
              <div>
                <Item
                  icon={<HomeOutlinedIcon />}
                  title="Tableau de bord"
                  to="/app/administration/tableau-de-bord"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<AdminPanelSettingsOutlinedIcon />}
                  title="Gestion administration"
                  to="/app/administration/gestion-administratifs-personnels"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<SupervisorAccountOutlinedIcon />}
                  title="Utilisateurs"
                  to="/app/administration/utilisateurs"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<SchoolOutlinedIcon />}
                  title="Etudiants"
                  to="/app/administration/etudiants"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<PeopleOutlinedIcon />}
                  title="Personnels"
                  to="/app/administration/personnels"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<FamilyRestroomOutlinedIcon />}
                  title="Accès parents"
                  to="/app/administration/acces-parents"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<AutoStoriesOutlinedIcon />}
                  title="Scolarité"
                  to="/app/administration/scolarite"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<ScheduleOutlinedIcon />}
                  title="Emploi du temps"
                  to="/app/administration/emploi-du-temps"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<CoPresentIcon />}
                  title="Assiduités"
                  to="/app/administration/assidute"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<NoteAltOutlinedIcon />}
                  title="Notes & évaluations"
                  to="/app/administration/notes-et-evaluations"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<FolderCopyOutlinedIcon />}
                  title="Attestations"
                  to="/app/administration/attestations"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<FolderCopyOutlinedIcon />}
                  title="Certificats"
                  to="/app/administration/certificats"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<PaymentsOutlinedIcon />}
                  title="Paiements"
                  to="/app/administration/paiements"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<MoneyOutlinedIcon />}
                  title="Tarification"
                  to="/app/administration/tarification"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<AutoStoriesOutlinedIcon />}
                  title="Bibliothéque"
                  to="/app/administration/bibliotheque"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<LibraryBooksIcon />}
                  title="Syllabus"
                  to="/app/administration/syllabus"
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            )}

            {/* PATS  without resctrictions */}
            {loggedUserData.roles[1] === "ROLE_PATHS" && isPats && (
              <div>
                <Item
                  icon={<HomeOutlinedIcon />}
                  title="Tableau de bord"
                  to="/app/administration/tableau-de-bord"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<SupervisorAccountOutlinedIcon />}
                  title="Utilisateurs"
                  to="/app/administration/utilisateurs"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<SchoolOutlinedIcon />}
                  title="Etudiants"
                  to="/app/administration/etudiants"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<PeopleOutlinedIcon />}
                  title="Personnels"
                  to="/app/administration/personnels"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<FamilyRestroomOutlinedIcon />}
                  title="Accès parents"
                  to="/app/administration/acces-parents"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<AutoStoriesOutlinedIcon />}
                  title="Scolarité"
                  to="/app/administration/scolarite"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<ScheduleOutlinedIcon />}
                  title="Emploi du temps"
                  to="/app/administration/emploi-du-temps"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<CoPresentIcon />}
                  title="Assiduités"
                  to="/app/administration/assidute"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<AutoStoriesOutlinedIcon />}
                  title="Bibliothéque"
                  to="/app/administration/bibliotheque"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<LibraryBooksIcon />}
                  title="Syllabus"
                  to="/app/administration/syllabus"
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            )}
            {/*  PATS with resctrictions  */}
            {loggedUserData?.roles.length > 1 &&
              "ROLE_ENSEIGNANT" &&
              loggedUserData?.roles[0] === "ROLE_ENSEIGNANT" &&
              (isPer || defaultPer) && (
                <div>
                  <Item
                    icon={<HomeOutlinedIcon />}
                    title="Tableau de bord"
                    to="/app/professeur/tableau-de-bord"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    icon={<Person3OutlinedIcon />}
                    title="Profil"
                    to="/app/professeur/profil"
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    icon={<NoteAltOutlinedIcon />}
                    title="Note & ÉValuation"
                    to="/app/professeur/notes-et-evaluations"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
              )}

            {/* PARENT */}
            {loggedUserData?.roles[0] === "ROLE_PARENT" && (
              <div>
                <Item
                  icon={<HomeOutlinedIcon />}
                  title="Tableau de bord"
                  to="/app/parent/enfant/tableau-de-bord"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  icon={<Person3OutlinedIcon />}
                  title="Profil"
                  to="/app/parent/profil"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  icon={<SnippetFolderOutlinedIcon />}
                  title="Dossiers"
                  to="/app/parent/enfant/dossiers"
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            )}
          </ul>
        </div>
        <div className="bottom-content">
          <Item
            emptyLocalStorage={emptyLocalStorage}
            icon={<LogoutOutlinedIcon fontSize="small" />}
            title="Se deconnecter"
            to="/"
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
    </>
  );
};
