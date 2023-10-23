/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Typography,
} from "@mui/material";
import { ClockLoader } from "react-spinners";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { editAdmission, fetchAdmissionById } from "redux/admissionFeatures";
import { CustomFileInput, CustomFormControl, FormBtn } from "components";
import { url } from "config/config";
import { fetchFiliere } from "redux/scolariteFeatures";
import { certifMed } from "services";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(125,177,124,5%)",
    borderRadius: "10px",
    minHeight: "28px",
    fontSize: "10px",
    p: "1rem",
    color: "#B1BBC6",
    width: "13rem",
    border: "none",
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontSize: "10px",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#9fa9b2"
        : isFocused
        ? "rgb(125,177,124,5%)"
        : "",
    };
  },
};

const EditAdmissionForm = ({ studentId, lastAdmission }) => {
  const dispatch = useDispatch();
  const admission = useSelector((state) => state.admissionById);
  const filieres = useSelector((state) => state.filiere);
  const [values, setValues] = useState({});
  const [editValues, setEditValues] = useState({});
  const [pictures, setPictures] = useState([]);
  const [images, setImages] = useState([]);
  const [selectOptionFiliere, setSelectOptionFiliere] = useState();
  const [selectOptionFiliereDemande, setSelectOptionFiliereDemande] =
    useState();
  const [selectCertifMedical, setSelectCertifMedical] = useState();

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      let filiereFromApi = [lastAdmission?.filiere];
      let filiereDemandeFromApi = [lastAdmission?.filiere_demande];
      let certifMedicalApi = [lastAdmission?.Certificat_medical];
      const newFiliereFromApi = filiereFromApi.map((item) => {
        const newF = {
          label: item,
          value: item,
        };
        return newF;
      });
      const newFiliereDemandeFromApi = filiereDemandeFromApi.map((item) => {
        const newF = {
          label: item,
          value: item,
        };
        return newF;
      });
      const newCertfiMedicalFromApi = certifMedicalApi.map((item) => {
        const newF = {
          label: item,
          value: item,
        };
        return newF;
      });

      setEditValues(lastAdmission);
      setSelectCertifMedical(newCertfiMedicalFromApi);
      setSelectOptionFiliere(newFiliereFromApi);
      setSelectOptionFiliereDemande(newFiliereDemandeFromApi);
      dispatch(fetchFiliere());
      dispatch(fetchAdmissionById({ studentId }));
    }
    return () => {
      isCancelled = true;
    };
  }, [lastAdmission]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setEditValues("");
  };

  //handlers
  const handleSelectFiliere = (selectOptionFiliere) => {
    setSelectOptionFiliere(selectOptionFiliere);
  };
  const handleSelectFiliereDemande = (selectOptionFiliereDemande) => {
    setSelectOptionFiliereDemande(selectOptionFiliereDemande);
  };
  const handleSelectCertif = (selectCertifMedical) => {
    setSelectCertifMedical(selectCertifMedical);
  };

  //filiere
  const filiere = filieres?.data?.map((item) => {
    const newFiliere = {
      value: item.id,
      label: item?.name,
    };
    return newFiliere;
  });

  //handling notif images
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      setImages((prevImages) => [...prevImages, reader.result]);
    };
    files.forEach((file) => {
      setPictures([...pictures, file]);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filiere = selectOptionFiliere?.label;
    const filiereDemande = selectOptionFiliereDemande.label;
    const visitMed = selectCertifMedical.value;

    dispatch(
      editAdmission({
        visitMed,
        filiere,
        filiere_demande: filiereDemande,
        values,
        images: pictures,
        admissionId: lastAdmission?.id,
      })
    );
  };

  return (
    <>
      {admission?.loading ? (
        <Box display="flex" justifyContent="center" m={"1rem"}>
          <ClockLoader color="#43a81f" />
        </Box>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Typography
            sx={{
              color: "rgb(177,187,198,100)",
              fontWeight: "600",
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: "12px",
            }}
          >
            Bac
          </Typography>
          <CustomFormControl
            labelTitle="Série"
            labelWidth="30%"
            inputWidth="13rem"
            placeholder="Baccalauréat série"
            name="serie"
            type="text"
            value={editValues?.Baccalaureat_serie}
            onChange={handleChange}
          />

          <CustomFormControl
            labelTitle="Mention"
            labelWidth="30%"
            inputWidth="13rem"
            placeholder="Mention  au bac"
            name="mention"
            type="text"
            value={editValues?.Mention}
            onChange={handleChange}
          />
          <CustomFormControl
            labelTitle="Année d'obtention"
            labelWidth="30%"
            inputWidth="13rem"
            placeholder="Année obtention bac"
            name="anneeObtention"
            type="text"
            value={editValues?.Annee_obtention}
            onChange={handleChange}
          />
          <CustomFormControl
            labelTitle="Lycée"
            labelWidth="30%"
            inputWidth="13rem"
            placeholder="Dernier lycée ou collége "
            name="lycee"
            type="text"
            value={editValues?.Lycee_college}
            onChange={handleChange}
          />

          <Typography
            sx={{
              color: "rgb(177,187,198,100)",
              fontWeight: "600",
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: "12px",
            }}
          >
            Parcours
          </Typography>
          <CustomFormControl
            labelTitle="Faculté ou Institut"
            labelWidth="30%"
            inputWidth="13rem"
            placeholder="Dernier faculté ou institut"
            name="facultyOurInstitute"
            type="text"
            value={editValues?.Facute_institut}
            onChange={handleChange}
          />

          <CustomFormControl
            labelTitle="Période"
            labelWidth="30%"
            inputWidth="13rem"
            placeholder="Exemple : 2019"
            name="periode"
            type="text"
            value={editValues?.Periode}
            onChange={handleChange}
          />
          {/* <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            flexWrap={"wrap"}
          >
            <InputLabel
              sx={{
                fontFamily: ["Poppins", "sans-serif"].join(","),
                mr: "0.2rem",
                width: "30%",
                textAlign: "center",
                display: "flex",
                fontSize: "12px",
                whiteSpace: "normal",
                justifyContent: "flex-start",
              }}
            >
              Niveau Etude
            </InputLabel>
            <Select
              placeholder="Niveau Etude..."
              onChange={handleSelectNiveau}
              closeMenuOnSelect={true}
              options={niveau}
              value={selectOptionNiveau}
              styles={colourStyles}
              type="text"
            />
          </Box> */}

          <CustomFormControl
            labelTitle="Cycle"
            labelWidth="30%"
            inputWidth="13rem"
            placeholder="Cycle "
            name="cycle"
            type="text"
            value={editValues?.Cycle}
            onChange={handleChange}
          />

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            flexWrap={"wrap"}
          >
            <InputLabel
              sx={{
                fontFamily: ["Poppins", "sans-serif"].join(","),
                mr: "0.2rem",
                width: "30%",
                textAlign: "center",
                display: "flex",
                fontSize: "12px",
                whiteSpace: "normal",
                justifyContent: "flex-start",
              }}
            >
              Filére demandée
            </InputLabel>
            <Select
              placeholder="Filière"
              onChange={handleSelectFiliereDemande}
              closeMenuOnSelect={true}
              options={filiere}
              value={selectOptionFiliereDemande}
              styles={colourStyles}
              type="text"
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            flexWrap={"wrap"}
          >
            <InputLabel
              sx={{
                fontFamily: ["Poppins", "sans-serif"].join(","),
                mr: "0.2rem",
                width: "30%",
                textAlign: "center",
                display: "flex",
                fontSize: "12px",
                whiteSpace: "normal",
                justifyContent: "flex-start",
              }}
            >
              Filière
            </InputLabel>
            <Select
              placeholder="Filière"
              onChange={handleSelectFiliere}
              closeMenuOnSelect={true}
              options={filiere}
              value={selectOptionFiliere}
              styles={colourStyles}
              type="text"
            />
          </Box>

          <Typography
            sx={{
              color: "rgb(177,187,198,100)",
              fontWeight: "600",
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: "12px",
            }}
          >
            Sante
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            flexWrap={"wrap"}
          >
            <InputLabel
              sx={{
                fontFamily: ["Poppins", "sans-serif"].join(","),
                mr: "0.2rem",
                width: "30%",
                textAlign: "center",
                display: "flex",
                fontSize: "12px",
                whiteSpace: "normal",
                justifyContent: "flex-start",
              }}
            >
              Visite médical
            </InputLabel>
            <Select
              placeholder="Visite médical"
              onChange={handleSelectCertif}
              closeMenuOnSelect={true}
              options={certifMed}
              value={selectCertifMedical}
              styles={colourStyles}
              type="text"
            />
          </Box>

          <Box display="flex" flexDirection="column" gap="10px" mt={2}>
            <Box
              style={{
                borderRadius: "10px",
                border: "1px dashed #B1BBC6",
                display: "flex",
              }}
            >
              <InputLabel
                for="file-upload"
                sx={{
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  fontSize: "10px",
                  whiteSpace: "normal",
                  width: "100%",
                  height: "40px",
                  paddingTop: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                Photo d'identité
              </InputLabel>
              {editValues?.Photo && (
                <img
                  style={{ borderRadius: "10px" }}
                  height="60px"
                  width="60%"
                  src={`${url}/${editValues?.Photo}`}
                  alt="aperçu"
                />
              )}
              {images[0] && (
                <img
                  style={{ borderRadius: "10px" }}
                  width="50%"
                  height="50px"
                  src={images[0]}
                  alt="Preview"
                />
              )}
            </Box>
            <Box
              style={{
                borderRadius: "10px",
                border: "1px dashed #B1BBC6",
                display: "flex",
              }}
            >
              <InputLabel
                for="file-upload"
                sx={{
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  fontSize: "10px",
                  whiteSpace: "normal",
                  width: "100%",
                  height: "40px",
                  paddingTop: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                Extrait de naissance
              </InputLabel>
              {editValues?.Extrait_naissance && (
                <img
                  style={{ borderRadius: "10px" }}
                  height="60px"
                  width="60%"
                  src={`${url}/${editValues?.Extrait_naissance}`}
                  alt="aperçu"
                />
              )}
              {images[1] && (
                <img
                  style={{ borderRadius: "10px" }}
                  width="50%"
                  height="50px"
                  src={images[1]}
                  alt="Preview"
                />
              )}
            </Box>
            <Box
              style={{
                borderRadius: "10px",
                border: "1px dashed #B1BBC6",
                display: "flex",
              }}
            >
              <InputLabel
                for="file-upload"
                sx={{
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  fontSize: "10px",
                  whiteSpace: "normal",
                  width: "100%",
                  height: "40px",
                  paddingTop: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                Diplôme
              </InputLabel>
              {editValues?.Diplome && (
                <img
                  style={{ borderRadius: "10px" }}
                  height="60px"
                  width="60%"
                  src={`${url}/${editValues?.editValues?.Diplome}`}
                  alt="aperçu"
                />
              )}
              {images[2] && (
                <img
                  style={{ borderRadius: "10px" }}
                  width="50%"
                  height="50px"
                  src={images[2]}
                  alt="Preview"
                />
              )}
            </Box>
            <Box
              style={{
                borderRadius: "10px",
                border: "1px dashed #B1BBC6",
                display: "flex",
              }}
            >
              <InputLabel
                for="file-upload"
                sx={{
                  fontFamily: ["Poppins", "sans-serif"].join(","),
                  fontSize: "10px",
                  whiteSpace: "normal",
                  width: "100%",
                  height: "40px",
                  paddingTop: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                Relevé de note
              </InputLabel>
              {editValues?.Releve_notes && (
                <img
                  style={{ borderRadius: "10px" }}
                  height="60px"
                  width="60%"
                  src={`${url}/${editValues?.Releve_notes}`}
                  alt="aperçu"
                />
              )}
              {images[3] && (
                <img
                  style={{ borderRadius: "10px" }}
                  width="50%"
                  height="50px"
                  src={images[3]}
                  alt="Preview"
                />
              )}
            </Box>
          </Box>
          <Box sx={{ paddingLeft: "15%" }} hidden={true}>
            <CustomFileInput
              className="readerId"
              onChange={handleImageChange}
              type="file"
              titre="Ajouter document(s)"
            />
          </Box>
          <Box
            sx={{
              paddingLeft: "15%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  name="acceptedTos"
                  type="checkbox"
                  sx={{
                    color: "#43a81f",
                    "&.Mui-checked": {
                      color: "#43a81f",
                    },
                  }}
                />
              }
              sx={{
                margin: 0,
                fontSize: "20px",
              }}
            />
            <FormLabel
              component="legend"
              sx={{
                fontSize: "12px",
                color: "#9FA9B2",
                fontFamily: ["Poppins", "sans-serif"].join(","),
              }}
            >
              Lettre d'engagement.
            </FormLabel>
          </Box>

          <Box display="flex" justifyContent="center" gap="2rem" mt="1rem">
            <FormBtn
              type="submit"
              buttonText="Editer"
              bgNormalColor="#43A81F"
              margin_=""
              width_="30%"
            />
            <FormBtn
              onClick={() => window.location.reload()}
              buttonText="Annuler"
              bgNormalColor="#C74040"
              margin_=""
              width_="30%"
            />
          </Box>
        </form>
      )}
    </>
  );
};

export default EditAdmissionForm;
