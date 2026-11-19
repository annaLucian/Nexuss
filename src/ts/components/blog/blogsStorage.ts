import type { Post } from '../../../models/post.model.js';

export const getBolgsStorage = () => {
    const storedPosts = localStorage.getItem('postData');
    const dataPosts: Post[] = storedPosts ? JSON.parse(storedPosts) : [];
    return dataPosts;
};
