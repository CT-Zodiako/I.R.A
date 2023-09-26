import { useEffect, useState } from "react";

export const VistaEstudiantes = () => {
    
    
    return(
        <>
            <div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Programa</th>
                            <th>Titulo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaExamenes.map((examenes) => (
                        <tr key={examenes.id}>
                            <td>{examenes.programa}</td>
                            <td>{examenes.proyecto_integrador}</td>
                            <td>Pendiente</td>
                            <td>
                                <div>
                                    <button onClick={(e) => onEditarEvaluador(evaluador.id)}><Link to="/gestion-usuario">Editar</Link></button>
                                    {/* <button onClick={(e) => onCambiarEstadoEvaluador(e, evaluador.id)}>{evaluador.estado ? 'Desactivar' : 'Activar'}</button> */}
                                    {/* <button onClick={(e) => onEditarEvaluador(evaluador.id)}><Link to="/gestion-usuario">Editar</Link></button> */}
                                    {/* <button onClick={(e) => onEliminarEvaluador(e, evaluador.id)}>Eliminar</button> */}
                                </div>  
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
