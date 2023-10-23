/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import "./login.scss";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

import AdminLoginForm from "./AdminLoginForm";
import ParentLoginForm from "./ParentLoginForm";
import StudentLoginForm from "./StudentLoginForm";
import ProfLoginForm from "./ProfLoginForm";
import PatsLoginForm from "./PatsLoginForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const Login = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showParentForm, setShowParentForm] = useState(false);
  const [showEtudiantForm, setShowEtudiantForm] = useState(true);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleShowEtudiantForm = () => {
    localStorage.setItem("tab", "Etudiant");
    setShowEtudiantForm((prev) => (prev = true));
    setShowParentForm((prev) => (prev = false));
  };
  const handleShowParentForm = () => {
    localStorage.setItem("tab", "Parent");
    setShowParentForm((prev) => (prev = true));
    setShowEtudiantForm((prev) => (prev = false));
  };

  return (
    <div className="login-container">
      <div className="login-container-bloc-left">
        <span>Bienvenue !</span>
        <span>Sur la plateforme de l'USSD</span>
      </div>
      <div className="bloc-tab-responsive">
        <Box bgcolor={"#fff"} mt={2} p={2} borderRadius={3}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <KeyboardArrowLeftIcon
              sx={{ fontSize: "30px" }}
              onClick={() => {
                handleShowEtudiantForm();
              }}
            />{" "}
            <KeyboardArrowRightIcon
              sx={{ fontSize: "30px" }}
              onClick={() => {
                handleShowParentForm();
              }}
            />
          </Box>
          {showEtudiantForm && (
            <Box>
              {" "}
              <Typography
                color="#000"
                textAlign={"center"}
                fontWeight="800"
                mt={3}
                mb={2}
              >
                Etudiant{" "}
              </Typography>
              <StudentLoginForm />
            </Box>
          )}

          {showParentForm && (
            <Box>
              {" "}
              <Typography
                color="#000"
                textAlign={"center"}
                fontWeight="800"
                mt={3}
                mb={2}
              >
                Parent{" "}
              </Typography>
              <ParentLoginForm />
            </Box>
          )}
        </Box>
      </div>
      <div className="login-container-bloc-right">
        <Box
          className="block-tabs"
          sx={{
            bgcolor: "background.paper",
            borderRadius: "9px",
            position: "relative",
            paddingTop: "1rem",
            left: "25%",
            height: "75vh",
          }}
        >
          <Tabs
            sx={{
              "& .MuiTabs-indicator": {
                background: "#9FA9B2",
              },
            }}
            value={value}
            onChange={handleChangeTab}
            textColor="inherit"
          >
            <Tab
              className="tabFont"
              label="Administration"
              {...a11yProps(0)}
              onClick={() => localStorage.setItem("tab", "Administration")}
            />
            <Tab
              className="tabFont"
              label="Pats"
              {...a11yProps(1)}
              onClick={() => localStorage.setItem("tab", "Pats")}
            />
            <Tab
              className="tabFont"
              label="Parent"
              {...a11yProps(2)}
              onClick={() => localStorage.setItem("tab", "Parent")}
            />
            <Tab
              className="tabFont"
              label="Etudiant"
              {...a11yProps(2)}
              onClick={() => localStorage.setItem("tab", "Etudiant")}
            />
            <Tab
              className="tabFont"
              label="PER"
              {...a11yProps(2)}
              onClick={() => localStorage.setItem("tab", "prof")}
            />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <AdminLoginForm hideButton={true} marginTop="1.5rem" />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <PatsLoginForm hideButton={true} marginTop="1.5rem" />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <ParentLoginForm hideButton={true} marginTop="1.5rem" />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <StudentLoginForm />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              <ProfLoginForm />
            </TabPanel>
          </SwipeableViews>

          <Box sx={{ background: "#43a81f", padding: "1rem ", color: "#fff" }}>
            <Typography fontSize={"12px"} sx={{ color: "#fff" }}>
              N° : (+221) 338590131 | 785288585{" "}
            </Typography>
            <Typography fontSize={"12px"} sx={{ color: "#fff" }}>
              Email : contact@universitesciencesante.com{" "}
            </Typography>
            <Typography fontSize={"12px"} sx={{ color: "#fff" }}>
              Adresse : Point E Rue Birago Diop 5xE Dakar, Sénégal{" "}
            </Typography>
            <Box display={"flex"} gap={2} pt={1}>
              <a
                href="https://www.facebook.com/ussdakar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.linkedin.com/company/universite-des-sciences-de-la-sant%C3%A9-de-dakar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://twitter.com/Univdelasante"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.instagram.com/universitedelasante/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};
