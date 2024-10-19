import React from"react";
import "../Hoja-Estilos/Boton.css"

function Boton (props){

    const esOperador = valor => {
        return isNaN (valor ) && (valor != ".") && (valor != "=")

        // si el valor no es numero ,ni punto ,ni igual lo consideran operador y retorna true
    };

    return(
        <div className={`boton-contenedor ${esOperador(props.children) ? "operador ":"" }`.trimEnd ()} 
             onClick ={()=> props.Clics(props.children)}> 
             {/* //asi se define una funcion anonima,funcion que llama a otra funcion */}
             
            {props.children}
            
            {/*  renderizar elementos o componentes hijos..permite que un componente encapsule otros elementos o componentes dentro de sus etiquetas y renderice lo que está entre ellas ..no dejar espacio entre ${ */ }

        </div> 
    );
}

export default Boton;