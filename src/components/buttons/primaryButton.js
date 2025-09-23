import React from "react";
import style from "../css/button.module.css";

export default function PrimaryButton({title,type}){
    return(
        <div className={`${style.container}`}>
            <button
            type={type}
            style={{
                outline: "none",
                border:'0px',
                borderRadius:'5px',
                backgroundColor: 'transparent',
                width: "100%",
                margin: "0px",
                paddingLeft: "10px",
                color:'white'
              }}
            >{title}</button>
        </div>
    )
}