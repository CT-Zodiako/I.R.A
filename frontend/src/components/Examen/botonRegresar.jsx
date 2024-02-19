import ReplyIcon from '@mui/icons-material/Reply';
import { Button } from '@mui/material';

export const BotonRegresar = ({ regresar }) => {
    return (
      <div>
        <Button
          variant="contained"
          color="warning"
          onClick={regresar}
        >
          <ReplyIcon/>
          Regresar
        </Button>
      </div>
    );
}