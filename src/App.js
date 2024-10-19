import './App.css';
import logo from "./imagenes/5412.jpg";
import Boton from './componentes/Boton';
import Pantalla from './componentes/Pantalla';
import BotonClear from './componentes/BotonClear';
import { useState, useEffect } from 'react';
import { evaluate } from "mathjs";

function App() {
  const [input, setInput] = useState("");  // para la entrada de números
  const [disabledEqual, setDisabledEqual] = useState(false);  // para deshabilitar el botón "="

  // Función para agregar el valor presionado al input
  const agregarInput = (val) => {
    if (disabledEqual) setDisabledEqual(false);  // Habilita el botón "=" si se agrega más input
    setInput((prevInput) => prevInput + val);  // Actualiza el valor en la pantalla
  };

  // Función para calcular el resultado
  const calcular = () => {
    if (input) {
      try {
        setInput(evaluate(input).toString());  // Realiza el cálculo y actualiza la pantalla con el resultado
        setDisabledEqual(true);  // Deshabilita el botón "=" después de calcular
      } catch (error) {
        setInput("Error");  // Si hay un error, muestra "Error"
        setDisabledEqual(true);
      }
    }
  };

  // Función para manejar los eventos del teclado
  const manejarTeclaPresionada = (event) => {
    const tecla = event.key;  // Obtenemos la tecla presionada

    // Si la tecla es un número o un operador
    if (/[0-9]/.test(tecla)) {
      agregarInput(tecla);
    } else if (['+', '-', '*', '/'].includes(tecla)) {
      agregarInput(tecla);
    } else if (tecla === 'Enter') {
      calcular();
    } else if (tecla === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));  // Elimina el último carácter
    } else if (tecla === 'Escape') {
      setInput("");  // Limpia el input
    } else if (tecla === '.') {
      agregarInput(tecla);  // Agrega el punto decimal
    }
  };

  // Hook para escuchar eventos del teclado
  useEffect(() => {
    document.addEventListener("keydown", manejarTeclaPresionada);
    return () => {
      document.removeEventListener("keydown", manejarTeclaPresionada);
    };
  }, [input]);  // Se ejecuta cada vez que cambia el valor de `input`

  return (
    <div className="App">
      <div className='logo-contenedor'>
        <img
          src={logo}
          className='logo'
          alt="logo"
        />
      </div>

      <div className='Contenedor-calculadora'>
        <Pantalla input={input} />

        <div className='fila'>
          <Boton Clics={agregarInput}>7</Boton>
          <Boton Clics={agregarInput}>8</Boton>
          <Boton Clics={agregarInput}>9</Boton>
          <Boton Clics={agregarInput}>-</Boton>
        </div>

        <div className='fila'>
          <Boton Clics={agregarInput}>4</Boton>
          <Boton Clics={agregarInput}>5</Boton>
          <Boton Clics={agregarInput}>6</Boton>
          <Boton Clics={agregarInput}>+</Boton>
        </div>

        <div className='fila'>
          <Boton Clics={agregarInput}>1</Boton>
          <Boton Clics={agregarInput}>2</Boton>
          <Boton Clics={agregarInput}>3</Boton>
          <Boton Clics={agregarInput}>*</Boton>
        </div>

        <div className='fila'>
          <BotonClear FClear={() => setInput("")}>Clear</BotonClear>
          <Boton Clics={agregarInput}>0</Boton>
          <Boton Clics={agregarInput}>.</Boton>
          <Boton Clics={agregarInput}>/</Boton>
        </div>

        <div className='fila'>
          <Boton Clics={calcular} disabled={disabledEqual}>=</Boton>
        </div>
      </div>
    </div>
  );
}

export default App;
