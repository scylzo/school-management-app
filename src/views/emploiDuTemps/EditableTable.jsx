/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEC } from "redux/scolariteFeatures";
import { emploiHoraire } from "services";

const EditableTable = ({
  empInputEditData,
  handleEditSave,
  handleReset,
  handleEditChange,
}) => {
  const dispatch = useDispatch();
  const ec = useSelector((state) => state.ec);

  useEffect(() => {
    dispatch(fetchEC());
  }, []);

  return (
    <tr>
      <td>
        <select
          name="horaire"
          id="horaire"
          value={empInputEditData?.horaire}
          onChange={handleEditChange}
        >
          <option>Horaire</option>
          {emploiHoraire.map((horaire) => {
            return <option value={horaire}>{horaire}</option>;
          })}
        </select>
      </td>
      <td>
        <select
          name="Lundi"
          id="Lundi"
          value={empInputEditData?.Lundi}
          onChange={handleEditChange}
        >
          <option>Lundi</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
        </select>
      </td>
      <td>
        <select
          name="Mardi"
          value={empInputEditData?.Mardi}
          onChange={handleEditChange}
        >
          <option>Mardi</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
        </select>
      </td>
      <td>
        <select
          name="Mercredi"
          value={empInputEditData?.Mercredi}
          onChange={handleEditChange}
        >
          <option>Mercredi</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
        </select>
      </td>
      <td>
        <select
          name="Jeudi"
          value={empInputEditData?.Jeudi}
          onChange={handleEditChange}
        >
          <option>Jeudi</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
        </select>
      </td>
      <td>
        <select
          name="Vendredi"
          value={empInputEditData?.Vendredi}
          onChange={handleEditChange}
        >
          <option>Vendredi</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
        </select>
      </td>
      <td>
        <select
          name="Samedi"
          value={empInputEditData?.Samedi}
          onChange={handleEditChange}
        >
          <option>Samedi</option>
          {ec?.data?.map((ec) => {
            return <option value={ec?.nom_element}>{ec?.nom_element}</option>;
          })}
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

export default EditableTable;
