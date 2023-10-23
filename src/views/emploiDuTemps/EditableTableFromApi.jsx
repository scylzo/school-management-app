import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEC } from "redux/scolariteFeatures";
import { emploiHoraire } from "services";

const EditableTableFromApi = ({ empInputEditData, handleEditChange }) => {
  const dispatch = useDispatch();
  const ec = useSelector((state) => state.ec);

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchEC());
  }, []);
  return (
    <tr>
      <td>{empInputEditData?.id}</td>
      <td>
        <select name="horaire" id="horaire" onChange={handleEditChange}>
          <option>{empInputEditData?.horaire}</option>
          {emploiHoraire.map((horaire) => {
            return <option value={horaire}>{horaire}</option>;
          })}
        </select>
      </td>
      <td>
        <select name="Lundi" id="Lundi" onChange={handleEditChange}>
          <option>{empInputEditData?.Lundi}</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
          <option value="">Pas de cours</option>;
        </select>
      </td>
      <td>
        <select name="Mardi" onChange={handleEditChange}>
          <option>{empInputEditData?.Mardi}</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
          <option value="">Pas de cours</option>;
        </select>
      </td>
      <td>
        <select name="Mercredi" onChange={handleEditChange}>
          <option>{empInputEditData?.Mercredi}</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
          <option value="">Pas de cours</option>;
        </select>
      </td>
      <td>
        <select name="Jeudi" onChange={handleEditChange}>
          <option>{empInputEditData?.Jeudi}</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
          <option value="">Pas de cours</option>;
        </select>
      </td>
      <td>
        <select name="Vendredi" onChange={handleEditChange}>
          <option>{empInputEditData?.Vendredi}</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
          <option value="">Pas de cours</option>;
        </select>
      </td>
      <td>
        <select name="Samedi" onChange={handleEditChange}>
          <option>{empInputEditData?.Samedi}</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
          <option value="">Pas de cours</option>;
        </select>
      </td>
      <td>
        <button type="submit" style={{ marginRight: "10px" }}>
          Enregistrer
        </button>
        <button onClick={() => handleReset()}>Annuler</button>{" "}
      </td>
    </tr>
  );
};

export default EditableTableFromApi;
