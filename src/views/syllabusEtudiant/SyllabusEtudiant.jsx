/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Topbar } from "components";
import { url } from "config/config";
import { Sidebar } from "views";
import { Box, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useDispatch, useSelector } from "react-redux";

import { fetchsyllabus } from "redux/syllabusFeatures";
import { ClockLoader } from "react-spinners";

// url  for  setting biblio images
const url_ = url;

export const SyllabusEtudiant = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const syllabus = useSelector((state) => state.syllabus);

  useEffect(() => {
    const isCancelled = false;
    if (!isCancelled) {
      dispatch(fetchsyllabus());
    }
  }, []);

  return (
    <div className="div-container">
      <div className={toggle ? "sidebar close" : "sidebar"}>
        <Sidebar toggleAction={() => setToggle(!toggle)} />
      </div>
      <div className="content-wrapper">
        <div className="main-container" style={{ width: "100%" }}>
          <Topbar
            currentViewTitle="USSD > Administration > Syllabus"
            afficherBtn={false}
            afficheSearchInput={false}
          />
          <div className="main-content">
            <Typography>Syllabus</Typography>
            {syllabus?.loading && (
              <Box display="flex" justifyContent="center" m={"1rem"}>
                <ClockLoader color="#43a81f" />
              </Box>
            )}
            <Box pt={2} display="flex" gap="1rem" flexWrap={"wrap"}>
              {syllabus?.data?.map((item) => {
                return (
                  <Box pt={1} display="flex" flexWrap={"wrap"}>
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      sx={{
                        height: "120px",
                        width: "15rem",
                        border: "1px solid #f6f6f6",
                        boxShadow: "var(--boxShadow)",
                        borderRadius: "12px",
                      }}
                      padding="10px 10px"
                    >
                      <Typography fontSize={12}>{item?.nom_classe} </Typography>

                      {item.document?.includes("pdf") ? (
                        <PictureAsPdfIcon
                          style={{
                            color: "#e95060",
                            width: "100px",
                            height: "45px",
                          }}
                        />
                      ) : (
                        <img
                          width={"150px"}
                          height={"50px"}
                          src={`${url_}/${item.document}`}
                          alt=""
                          srcset=""
                        />
                      )}
                      <Box
                        textAlign={"center"}
                        width={100}
                        display="flex"
                        sx={{ cursor: "pointer" }}
                        onClick={() => window.open(`${url_}/${item.document}`)}
                      >
                        <Typography fontSize="11px">Visualiser</Typography>
                        <RemoveRedEyeOutlinedIcon
                          sx={{ fontSize: "15px", marginLeft: "2px" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
