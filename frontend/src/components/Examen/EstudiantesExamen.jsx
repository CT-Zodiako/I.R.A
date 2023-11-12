import { useState } from "react";
import {eliminarEstudiante} from '../../redux/examenSlice'
import { useDispatch, useSelector } from "react-redux";

export const AgregarListaEstudiantes = ({handleNext}) => {
    
    const dispatch = useDispatch();
    const examen = useSelector((state) => state.examenFormulario);
    
    const [estudianteEstado, setEstudianteEstado] = useState();
    const [estudiantesExamen, setEstudiantes] = useState({
        estudiantes: []
    }); 

    const onEstudiante = (event) => {
        setEstudianteEstado(event.target.value)
    }

    const agregarEstudiante = () => {
        setEstudiantes({
          ...estudiantesExamen,
          estudiantes: [...estudiantesExamen.estudiantes, estudianteEstado]
        });
    };

    const eliminarEstudianteLista = (index) =>{
        const nuevoFormulario = { ...examen };
        const nuevoEstudiante = [...nuevoFormulario.estudiantes]
        nuevoEstudiante.splice(index, 1);
        nuevoFormulario.estudiantes = nuevoEstudiante;
        const nuevoFormularioExamen = nuevoFormulario;
        dispatch(
            eliminarEstudiante(nuevoFormularioExamen)
        )
    }
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('archivo', file);
      
        axios.post('http://127.0.0.1:3001/examen/ruta_de_carga_de_archivos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            setEstudiantes({
              ...estudiantesExamen,
              estudiantes: response.data
            }); 
          })
          .catch((error) => {
            console.error(error);
          });
    };

    const onEnviarEstudiantes = async() => {
        dispatch(
            agregarEstudiante({
                estudiantes: estudiantesExamen.estudiantes
            })
        )
        handleNext();
    }
    
    return(
        <>
            <form onSubmit={onEnviarEstudiantes}>
                <div>
                    <h3>Estudiante</h3>
                    <div>
                        <div>
                        <input
                            type="text"
                            name="NOMBRE"
                            onChange={onEstudiante}
                            placeholder="Nombre del estudiante"
                        />
                        <button type="button" onClick={agregarEstudiante}>
                            Agregar Estudiante
                        </button>
                        </div>
                        <div>
                        <input
                            type="file"
                            accept="xlsx" 
                            onChange={handleFileUpload}
                        />
                        </div>
                    </div>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>Nombre del Estudiante</th>
                            </tr>
                            </thead>
                            <tbody>
                            {formularioExamen.estudiantes.map((estudiante, index) => (
                                <tr key={index}>
                                <td>{estudiante.NOMBRE}</td>
                                <td>
                                    <button type='button' onClick={() => eliminarEstudianteLista(index)}>Eliminar</button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div> 
                <div>
                    <button type="submit">Cargar</button>
                </div>
            </form>
        </>
    );
}