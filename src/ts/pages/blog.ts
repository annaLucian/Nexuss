import { initBlog } from '../components/blog/initBlog.js';
import { renderCards } from '../components/blog/renderCards.js';

const blog = () => {
    initBlog();
    renderCards();
};
blog();
