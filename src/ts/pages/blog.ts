import { type Post } from '../../models/post.model.js';
import { type ApiClient } from '../../types/api.types.js';
import { fetchData } from '../../services/fetchData.js';
import { httpMethod, btnFetch } from '../dom.js';
import { paragraphError } from '../dom.js';

const getAllPosts = async (service: ApiClient) => {
    const posts: Post[] = await fetchData.getAllData(service);
    return posts;
};

btnFetch.addEventListener('click', async () => {
    const selectValue = httpMethod.value;
    const formatApi = selectValue.trim().toLowerCase();

    if (selectValue == '') {
        paragraphError.innerHTML = 'Por favor selecciona una opción válida';
        paragraphError.classList.toggle('error', selectValue === '');
        return;
    }

    try {
        if (formatApi === 'axios' || formatApi === 'fetch') {
            const allDataPosts: Post[] = await getAllPosts(formatApi);
            localStorage.setItem('postData', JSON.stringify(allDataPosts));

            window.location.href = '/src/views/blog.html';
        }
    } catch (error) {
        console.log('Hubo un error al obtener los posts:', error);
    }
});
