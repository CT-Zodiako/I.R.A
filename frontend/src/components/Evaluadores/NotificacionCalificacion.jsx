import { Alert, Collapse } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const NotificacionCalificacion = ({ estadoAlerta }) => {
    return(
        <>
            <Collapse in={estadoAlerta} sx={{ width: "100%" }}>
                <Alert 
                    sx={{ width: '35%', background: "rgba(112, 212, 112, 0.5)" }}
                    icon={<CheckIcon fontSize="inherit" />} 
                    severity="success"  
                    color="success"
                    open={estadoAlerta}
                >
                    Calificacion Enviada
                </Alert>
            </Collapse>
        </>
    );
}