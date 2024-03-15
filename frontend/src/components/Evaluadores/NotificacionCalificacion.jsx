import { Alert, Collapse } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const NotificacionCalificacion = ({ estadoAlerta, alerta }) => {
    return(
        <>
            <Collapse in={estadoAlerta} sx={{ width: "100%" }}>
                <Alert 
                    sx={{ maxWidth: '22rem', background: "rgba(112, 212, 112, 0.5)" }}
                    icon={<CheckIcon fontSize="inherit" />} 
                    severity="success"  
                    color="success"
                    open={estadoAlerta}
                >
                    { alerta }
                </Alert>
            </Collapse>
        </>
    );
}