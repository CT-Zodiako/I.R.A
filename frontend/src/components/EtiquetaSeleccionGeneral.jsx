export const InputSeleccion = ({seleccion}) => {
    return(
        <>
            <form action="">
                <select name="resultadoAprendizaje">
                    {
                        seleccion.map(opcion => (
                            <option key={opcion.id} value={opcion.id}>{opcion.titulo}</option>
                        ))
                    }
                </select>
            </form>
        </>
    )
}
