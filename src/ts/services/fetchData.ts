import axios from 'axios';
import { type ApiClient } from '../../types/api.types.js';
import type { Post } from '../../models/post.model.js';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchData = {
    getAllData: async (apiService: ApiClient): Promise<Post[]> => {
        try {
            if (apiService === 'axios') {
                const { data } = await axios.get<Post[]>(API_URL);
                return data ?? [];
            }

            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data: Post[] = await response.json();
            return data ?? [];
        } catch (error) {
            console.error('Los posts no se cargaron correctamente', error);
            return [];
        }
    },
};
