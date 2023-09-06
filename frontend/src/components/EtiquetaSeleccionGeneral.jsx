import { useEffect, useState } from "react";
import axios from 'axios';

export const InputSeleccion = () => {

    // const evaluadores = [
    //     {id:1, nombre: 'cristian'},
    //     {id:2, nombre: 'nayeli'},
    //     {id:3, nombre: 'daniela'}
    // ]

    const [resultadoAprendizaje, setresultadoAprendizaje] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:3001/resultado_aprendizaje/traer_resultados')
          .then((response) => {
            setresultadoAprendizaje(response.data);
            console.log(response.data)
            setLoading(false); 
          })
          .catch((error) => {
            console.error('Error al obtener evaluadores:', error);
          });
      }, []);

    return(
        <>
            <form action="">
                <select name="evaluadores">
                    {
                        resultadoAprendizaje.map(opcion => (
                            <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
                        ))
                    }
                </select>
            </form>
        </>
    )
}
