/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./rightSidebar.scss";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { ClockLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  deleteNotification,
  fetchNotifications,
} from "redux/notificationFeatures";
import { url } from "config/config";

import * as yup from "yup";
import AddNotifForm from "./AddNotifForm";
import Notiflix from "notiflix";
import EditNotifForm from "./EditNotifForm";
import { Typography } from "@mui/material";

// url  for  setting notif images
const url_ = url;

//notification schema
export const notificationSchema = yup.object().shape({
  titre: yup.string().required("Champ obligatoire"),
  description: yup.string().required("Champ obligatoire"),
  date: yup.string().required("Champ obligatoire"),
});

export const RightSidebar = ({ showAddNotifForm }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userData"));
  const notifications = useSelector((state) => state.notifications);
  const [showEditForm, setNotifForm] = useState(false);
  const [notifId, setNotifId] = useState("");

  const showEditBtn = user?.roles[0] === "ROLE_ADMIN";

  //sorting notifs array
  const newArray = [...notifications.data];
  const notifs = newArray.sort((a, b) => (a.id < b.id ? 1 : -1));

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchNotifications());
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleShowEdit = () => {
    setNotifForm((prev) => (prev = true));
  };

  const confirmDelete = (notifId) => {
    Notiflix.Confirm.show(
      " ",
      "Etes-vous sûr de vouloir retirer ?",
      "Confirmer",
      "Annuler",
      () => {
        dispatch(deleteNotification(notifId));
      }
    );
  };

  //get name firt letter
  const getFirstLetters = () => {
    const firstLetters = user?.nom
      ?.split(" ")
      ?.map((word) => word.charAt(0))
      .join("");

    return firstLetters;
  };

  return (
    <div className="side-right-area-container">
      <div className="top-elt-container">
        <Badge
          //  badgeContent={4}
          color="error"
        >
          <NotificationsIcon sx={{ color: "#43A81F" }} />
        </Badge>
        <div className="profile-container">
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
                textTransform: "uppercase",
              }}
            >
              <Box> {getFirstLetters()}</Box>
            </Box>

            <h1 className="level-two student-info">
              <span> {user?.nom} </span>
              <br /> <span>{user?.Matricule} </span>
            </h1>
          </Box>
        </div>
        <Badge color="error">
          <MailIcon sx={{ color: "#43A81F" }} />
        </Badge>
      </div>
      {!showAddNotifForm && !showEditForm && (
        <div className="middle-elt-container">
          <h2 className="level-two level-two">
            {" "}
            <span>{showAddNotifForm ? "" : "Notifications"}</span>
          </h2>
          {notifications?.loading && (
            <Box display="flex" justifyContent="center" m={"1rem"}>
              <ClockLoader color="#43a81f" />
            </Box>
          )}
          {notifs.map((notif) => {
            return (
              <div className="notif-elt-container">
                <div hidden={!showEditBtn}>
                  <Box display={"flex"} justifyContent="flex-end">
                    <ModeEditOutlinedIcon
                      onClick={() => {
                        handleShowEdit();
                        setNotifId((prev) => (prev = notif.id));
                      }}
                      fontSize="12px"
                      style={{ marginRight: "2px", cursor: "pointer" }}
                    />
                    <DeleteOutlineOutlinedIcon
                      onClick={() => confirmDelete(notif.id)}
                      fontSize="12px"
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </Box>
                </div>

                <div className="notif-image-container">
                  <Box display="flex" flexDirection="column">
                    {notif?.Image?.includes("pdf") ? (
                      <PictureAsPdfIcon
                        style={{ fontSize: "8rem", color: "#e95060" }}
                      />
                    ) : (
                      <img src={`${url_}/${notif?.Image}`} alt="notification" />
                    )}

                    <Typography
                      onClick={() => {
                        window.open(`${url_}/${notif?.Image}`);
                      }}
                      sx={{
                        fontSize: "11px",
                        color: "#A098AE",
                        fontFamily: ["Poppins", "sans-serif"].join(","),
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <VisibilityOutlinedIcon />
                      <span>Cliquer pour visualiser</span>
                    </Typography>
                  </Box>
                </div>
                <div className="notif-desc-container">
                  <h3 className="level-three">{notif.titre}</h3>
                  <div className="notif-desc">{notif.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="middle-elt-container">
        <h2 className="level-two level-two">
          {" "}
          <span>{showAddNotifForm ? "Ajout Notification" : ""}</span>
          <span>{showEditForm ? "Editer Notification" : ""}</span>
        </h2>
        {showAddNotifForm && !showEditForm && <AddNotifForm />}
        {showEditForm && !showAddNotifForm && (
          <EditNotifForm notifId={notifId} />
        )}
      </div>
    </div>
  );
};
