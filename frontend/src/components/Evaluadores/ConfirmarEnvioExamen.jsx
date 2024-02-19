import { 
    Button, Dialog, DialogActions, 
    DialogContent, DialogContentText, 
    DialogTitle 
} from "@mui/material";

export const ConfirmarEnvioExamen = ({ estadoConfirmacion, cerrarConfirmacion, enviarExamenCalificado }) => {
    return(
        <>
            <Dialog
                open={estadoConfirmacion}
                onClose={cerrarConfirmacion}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Calificacion Examen
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Desea poder enviar las calificaciones de los estudiantes del examen?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant="contained"
                        color="warning"
                        onClick={cerrarConfirmacion}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        variant="contained"
                        type="submit"
                        onClick={enviarExamenCalificado}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}