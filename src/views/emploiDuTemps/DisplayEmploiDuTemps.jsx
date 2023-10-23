/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Sidebar, Topbar } from "components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpTemps } from "redux/emploiDuTempsFeature";
import { url } from "config/config";
import { Box } from "@mui/material";
import { ClockLoader } from "react-spinners";

// url  for  setting emp images
const url_ = url;

export const DisplayEmploiDuTemps = () => {
  const [toggle, setToggle] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const anAcad = localStorage.getItem("anAcad");
  const classId = localStorage.getItem("classId");
  const semestre = JSON.parse(localStorage.getItem("semestreData"));
  const empTemps = useSelector((state) => state.empTemps);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchEmpTemps({ anAcad, classId, semestre }));
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container">
          <Topbar
            currentViewTitle={`USSD > Administration > Emploi du temps > Classe  > ${params.id}`}
            afficheSearchInput={false}
            afficherBtn={false}
          />
          <div className="main-content" style={{ background: "#f8f8f8" }}>
            <div className="div-area-main-content-elt">
              <Box display="flex" flexDirection="column" gap={2}>
                {empTemps.loading ? (
                  <Box display="flex" justifyContent="center" m={"1rem"}>
                    <ClockLoader color="#43a81f" />
                  </Box>
                ) : (
                  empTemps?.data?.map((emp) => {
                    return (
                      <Box p={2} bgcolor="#fff" borderRadius="8px">
                        <img src={`${url_}/${emp?.support}`} alt="" srcset="" />
                      </Box>
                    );
                  })
                )}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
