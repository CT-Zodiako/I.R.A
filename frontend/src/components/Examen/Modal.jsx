export const Modal = ({ activo, inactivo }) => {
    

    return(
        <>
            <div>
                <form onSubmit={onEnviarEvaluador}>
                    <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre_evaluador"
                        value={formulario.nombre_evaluador}
                        onChange={onAgregarEvaluador}
                        required
                    />
                    </div>
                    <div>
                    <label>Correo:</label>
                    <input
                        type="text"
                        name="correo"
                        value={formulario.correo}
                        onChange={onAgregarEvaluador}
                        required
                    />
                    </div>
                    <div>
                    <label>Numero identificacion:</label>
                    <input
                        type="text"
                        name="numero_identificacion"
                        value={formulario.numero_identificacion}
                        onChange={onAgregarEvaluador}
                        required
                    />
                    </div>
                    <div>
                    <label>Contrseña:</label>
                    <input
                        type="text"
                        name="contrasenna"
                        value={formulario.contrasenna}
                        onChange={onAgregarEvaluador}
                        required
                    />
                    </div>
                    <div>
                    <label>Telefono:</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={onAgregarEvaluador}
                        required
                    />
                    </div>
                    <div>
                    <button type="submit">Crear Evaluador</button>
                    <button></button>
                    </div>
                </form>
            </div>
        </>
    );
}