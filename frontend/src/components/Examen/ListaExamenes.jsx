import { useEffect, useState } from "react"

export const examenes = () => {
    const [listaExamenes, setListaExamenes] = useState();
    
    useEffect(() => {
        async function fetchData(){
            try{

            }catch{

            }
        } fetchData();
    }, [])
    
    return(
        <>
        <div>
            <div>
                <h1>Lista Examenes Creados</h1>
            </div>
            <div>
                <div>
                    <h3>examenes</h3>
                </div>
                <div>
                    <button>Crear Examen</button>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Estado</th>
                                <th>Accines</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listaExamenes.map(()=>{
                            <tr>
                                <td>{}</td>
                                <td>{}</td>
                                <td>
                                    <div>
                                        <button></button>
                                        <button></button>
                                        <button></button>
                                    </div>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}