export const AgregarListaEstudiantes = ({listaEstudiantes}) => {
    return(
        <>
            <form>
                <div>
                    <input
                        type="file"
                        accept="xlsx" 
                        onChange={handleFileUpload}
                    /> 
                </div>
            </form>
        </>
    );
}