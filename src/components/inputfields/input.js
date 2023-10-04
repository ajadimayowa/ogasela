import React from "react";
import style from "../css/inputfield.module.css";
import "../css/inputfield.module.css";

export default function InputField({ icon, title, placeholder,type, passInput,toggleShow }) {

  return (
    <div className={`${style.container}`}>
      <input
      onChange={passInput}
      className={`${style.field}`}
      type={type}
        placeholder={placeholder}
        style={{
          outline: "none",
          border: "none",
          width: "100%",
          margin: "0px",
          paddingLeft: "10px",
          color:'#7b7b7b'
        }}
      />
      <p
      onClick={toggleShow}
        style={{
          display: "flex",
          margin: "0px",
          padding: "10px",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {icon}
      </p>
    </div>
  );
}
