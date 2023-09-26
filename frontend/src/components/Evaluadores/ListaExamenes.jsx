export const VistaExamenes = () =>{
    return(
        <>
            <div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Nombre del Evaluador</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Numero de Identificacion</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {evaluadores.map((evaluador) => (
                        <tr key={examen.id}>
                            <td>{evaluador.nombre_evaluador}</td>
                            <td>{evaluador.correo}</td>
                            <td>{evaluador.telefono}</td>
                            <td>{evaluador.numero_identificacion}</td>
                            <td>
                                <div>
                                    {/* <button onClick={(e) => onCambiarEstadoEvaluador(e, evaluador.id)}>{evaluador.estado ? 'Desactivar' : 'Activar'}</button> */}
                                    <button onClick={(e) => onEditarEvaluador(evaluador.id)}><Link to="/gestion-usuario">Editar</Link></button>
                                    <button onClick={(e) => onEliminarEvaluador(e, evaluador.id)}>Eliminar</button>
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