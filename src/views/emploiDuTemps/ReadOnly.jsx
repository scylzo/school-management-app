import React from "react";

const ReadOnly = ({ item, handleOnEditClik }) => {
  return (
    <tr>
      <td
        style={{
          background: "#B1C6B7",
          color: "#fff",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        {item.horaire}
      </td>
      <td
        style={{
          background: "#fcfcfc",
          color: "#B1BBC6",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        {" "}
        {item.Lundi}
      </td>
      <td
        style={{
          background: "#fcfcfc",
          color: "#B1BBC6",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        {item.Mardi}
      </td>
      <td
        style={{
          background: "#fcfcfc",
          color: "#B1BBC6",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        {item.Mercredi}
      </td>
      <td
        style={{
          background: "#fcfcfc",
          color: "#B1BBC6",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        {item.Jeudi}
      </td>
      <td
        style={{
          background: "#fcfcfc",
          color: "#B1BBC6",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        {item.Vendredi}
      </td>
      <td
        style={{
          background: "#fcfcfc",
          color: "#B1BBC6",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        {item.Samedi}
      </td>
      <td
        style={{ background: "#fcfcfc", border: "none", borderRadius: "10px" }}
      >
        <button
          style={{
            background: "#E95060",
            border: "none",
            color: "#fff",
            width: "100%",
            padding: "5px 0",
            borderRadius: "8px",
            fontSize: "10px",
          }}
          onClick={() => handleOnEditClik(item)}
        >
          Editer
        </button>{" "}
      </td>
    </tr>
  );
};

export default ReadOnly;
