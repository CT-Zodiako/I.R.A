import axios from 'axios';

class programaServicio{
    
    async traerPrograma() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/programa/`);
          return response.data.data;
        } catch (err) {
          console.error(err);
        }
      }
}

export default new programaServicio();