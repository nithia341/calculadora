import React from "react";
import "../Hoja-Estilos/BotonClear.css"

const BotonClear =(props) => (
    <div className="boton-clear" onClick ={()=> props.FClear(props.children)}>
        {props.children}
    </div>
);
export default BotonClear;