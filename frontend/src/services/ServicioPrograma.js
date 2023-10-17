import axios from 'axios';

class programaServicio{
    
    async traerPrograma() {
        try {
          const response = await axios.get('http://127.0.0.1:3001/programa/');
          return response.data.data;
        } catch (err) {
          console.error(err);
        }
      }
}

export default new programaServicio();