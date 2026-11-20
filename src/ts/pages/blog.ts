import { initBlog } from '../components/blog/initBlog.js';
import { renderCards } from '../components/blog/renderCards.js';
import { search } from '../components/blog/search.js';
import { getBolgsStorage } from '../components/blog/blogsStorage.js';
import { getSearchFromUrl, getPageFromUrl } from '../components/blog/syncSearchUrl.js';
import { getElements } from '../components/blog/dom.js';
import { handlePagination, setPaginationState } from '../components/blog/pagination.js';

const blog = () => {
    initBlog();

    const initialQuery = getSearchFromUrl();
    const initialPage = getPageFromUrl();

    const { input } = getElements();
    const searchInput = input as HTMLInputElement;

    if (searchInput && initialQuery) {
        searchInput.value = initialQuery;
    }

    const allBlogs = getBolgsStorage();
    const normalizedQuery = initialQuery.trim().toLowerCase();

    const filteredBlogs = initialQuery
        ? allBlogs.filter((post) => {
              return (
                  post.title.toLowerCase().includes(normalizedQuery) ||
                  post.body.toLowerCase().includes(normalizedQuery) ||
                  String(post.id) === initialQuery.trim()
              );
          })
        : allBlogs;

    renderCards(filteredBlogs, initialPage);
    search();
    setPaginationState(filteredBlogs, initialPage);
    handlePagination();
};
blog();
