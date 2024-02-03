import React from "react";
import style from "../css/inputfield.module.css";

const  InputField : React.FC<any>  = ({ icon,error, title,label, placeholder,type, passInput,toggleShow,name})  =>  {

  return (
    <>
    <label className="p-0  w-75 text-start" style={{marginBottom:'-7px', marginLeft:'-18px'}}>{label}</label>
    <div className={`p-0 m-0 ${style.container}`}>
      <input
      name={name}
      id={name}
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
    <p className="text-start text-danger w-75 p-0" style={{fontSize:'0.7em', marginTop:'-5px'}}>{error}</p>
    </>
  );
}
export default InputField;
