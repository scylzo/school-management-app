import React, { useState } from "react";
import { Topbar, RightSidebar } from "components";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const MainContent = () => {
  const [showAddNotifForm, setShowAddNotifForm] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle="USSD > Tableau de bord"
            onClick={() => setShowAddNotifForm(true)}
          />
          <div className="main-content"></div>
        </div>
        <div className="right-content">
          <RightSidebar showAddNotifForm={showAddNotifForm} />
        </div>
      </div>
    </div>
  );
};
