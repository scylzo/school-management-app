import React from "react";

const ReadOnlyFromApi = ({ item, handleOnEditClik }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.horaire}</td>
      <td> {item.Lundi}</td>
      <td>{item.Mardi}</td>
      <td>{item.Mercredi}</td>
      <td>{item.Jeudi}</td>
      <td>{item.Vendredi}</td>
      <td>{item.Samedi}</td>
      <td>
        <button onClick={() => handleOnEditClik(item)}>Editer</button>{" "}
      </td>
    </tr>
  );
};

export default ReadOnlyFromApi;
