import React, { useState } from "react";

const GroceryInput = ({ handleAdd }) => {
  const [text, setText] = useState("");

  return (
    <>
      <input
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
        Add
      </button>
    </>
  );
};

export default GroceryInput;
