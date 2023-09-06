import React from 'react'
import ReactDOM from 'react-dom/client'
// import {CrearExamen} from './view/Examen'
// import { InputSeleccion } from './components/EtiquetaSeleccionGeneral'
// import {CrearEvaluador} from './view/AgregarEvaluador';
import { FormularioPorPasos } from './components/EvaluadorComponentes/pruebaPasos';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < FormularioPorPasos/>
  </React.StrictMode>,
)
