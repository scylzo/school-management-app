import React from "react";
import "./topbar.scss";
import { Button, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Topbar = ({
  onClick,
  onClickOnToggleBtn,
  currentViewTitle,
  afficherBtn,
  afficherBtnToggle,
  afficheSearchInput,
  title,
  btnToggleTitle,
}) => {
  return (
    <div className="topbar-container">
      <h1 className="level-one level-one_"> {currentViewTitle}</h1>
      {afficheSearchInput && (
        <div className="search-input-container">
          <IconButton type="button" size="small">
            <SearchIcon />
          </IconButton>
          <InputBase sx={{ ml: 2 }} placeholder="Rechercher" />
        </div>
      )}

      <div className="notif-button-container">
        {afficherBtnToggle && (
          <Button
            onClick={onClickOnToggleBtn}
            className="notifButton"
            size="small"
          >
            {btnToggleTitle}
          </Button>
        )}
        {afficherBtn && (
          <Button onClick={onClick} className="notifButton" size="small">
            {title}
          </Button>
        )}
      </div>
    </div>
  );
};
