const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchData = {
    getAllData: async (apiService: string) => {
        const formatApi = apiService.trim().toLowerCase();
        try {
            if (formatApi === 'axios') {
            } else {
                const response = await fetch(`${API_URL}`);
                if (!response.ok) {
                    throw new Error('las respuesta no fue la esperada');
                }
                const data = await response.json();
                return data ? data : [];
            }
        } catch (error) {
            console.error('Los posts no se cargaron correctamente', error);
        }
    },
};
