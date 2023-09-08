import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
// import {CrearExamen} from './view/Examen'
// import { InputSeleccion } from './components/EtiquetaSeleccionGeneral'
// import { CrearEvaluador } from './view/AgregarEvaluador';
// import { FormularioPorPasos } from './components/EvaluadorComponentes/pruebaPasos';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
  </Router>
)
