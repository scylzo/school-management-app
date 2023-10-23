import React, { useState } from "react";
import { Sidebar } from "views";

export const DashboardParent = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper"></div>
    </div>
  );
};
