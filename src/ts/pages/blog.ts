import { initBlog } from '../components/blog/initBlog.js';
import { renderCards } from '../components/blog/renderCards.js';
import { search } from '../components/blog/search.js';
import { getBolgsStorage } from '../components/blog/blogsStorage.js';

const blog = () => {
    initBlog();
    renderCards(getBolgsStorage());
    search();
};
blog();
