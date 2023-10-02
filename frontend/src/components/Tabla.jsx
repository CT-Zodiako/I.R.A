export const listaTablas = () => {
    return(
        <>
            <table>
              <thead>
              <tr>
                <th>Nombre del Evaluador</th>
                <th>Correo del Evaluador</th>
              </tr>
              </thead>
              <tbody>
                {formularioExamen.evaluadores_ids.map((evaluadorId, index) => {
                  const evaluador = evaluadores.find(e => e.id === evaluadorId);
                  if (!evaluador) {
                    return null; 
                  }
                  return (
                    <tr key={index}>
                      <td>{evaluador.nombre_evaluador}</td>
                      <td>{evaluador.correo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </>
    );
}