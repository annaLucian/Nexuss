import { fetchData } from '../services/fetchData.js';
import { blog } from './pages/blog.js';
import { httpMethod, btnFetch } from './dom.js';

const getAllPosts = async (service: string) => {
    const posts = await fetchData.getAllData(service);

    console.log(posts);
};

btnFetch.addEventListener('click', () => {
    const selectValue = httpMethod.value;
    const allDataPost = getAllPosts(selectValue);
    window.location.href = '/src/views/blog.html';
    // blog(allDataPost)
});
