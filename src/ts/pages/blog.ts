import { type Post } from '../../models/post.model.js';
import { type ApiClient } from '../../types/api.types.js';
import { fetchData } from '../../services/fetchData.js';
import { httpMethod, btnFetch, paragraphError } from '../dom.js';

const getAllPosts = async (service: ApiClient) => {
    const posts: Post[] = await fetchData.getAllData(service);
    return posts;
};

httpMethod.addEventListener('change', () => {
    if (httpMethod.value !== '') {
        paragraphError.innerHTML = '';
        paragraphError.classList.remove('error');
        paragraphError.classList.remove('visible');
    }
});

btnFetch.addEventListener('click', async () => {
    const selectValue = httpMethod.value;
    const formatApi = selectValue.trim().toLowerCase();

    if (selectValue == '') {
        paragraphError.innerHTML = 'X Por favor selecciona una opción válida';
        paragraphError.classList.toggle('error', selectValue === '');
        paragraphError.classList.toggle('visible', selectValue !== '');
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
