import { fetchData } from '../services/fetchData.js';

const getAllPosts = async () => {
    const posts = await fetchData.getAllData('fetch');

    console.log(posts);
};

getAllPosts();
