import React, { useState } from "react";
import "../styles/grocery.css"
const GroceryInput = ({ handleAdd }) => {
  const [text, setText] = useState("");

  return (
    <>
      <input className="inputBar"
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Add something"
      />
      <button
        onClick={() => {
          handleAdd(text);
          setText("")
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </>
  );
};

export default GroceryInput;
