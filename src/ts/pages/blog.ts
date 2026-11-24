import { initBlog } from '../components/blog/initBlog.js';
import { renderCards } from '../components/blog/renderCards.js';
import { search } from '../components/blog/search.js';
import { getSearchFromUrl, getPageFromUrl, syncPageUrl } from '../components/blog/syncSearchUrl.js';
import { getElements } from '../components/blog/dom.js';
import { handlePagination, setPaginationState } from '../components/blog/pagination.js';
import { fetchData } from '../services/fetchData.js';
import type { ApiClient } from '../../types/api.types.js';

const ITEMS_PER_PAGE = 10;

export const loadBlogsPage = async (page: number, query: string, apiService: ApiClient = 'fetch') => {
    try {
        const { posts, totalItems } = await fetchData.getPaginatedPosts(apiService, {
            page,
            limit: ITEMS_PER_PAGE,
            q: query,
        });

        setPaginationState(page, totalItems);
        renderCards(posts);

        return totalItems;
    } catch (error) {
        console.error('Error al cargar los blogs:', error);
        setPaginationState(1, 0);
        renderCards([]);
        return 0;
    }
};

const blog = async () => {
    initBlog();

    const initialQuery = getSearchFromUrl();
    const initialPage = getPageFromUrl();

    const { input } = getElements();
    const searchInput = input as HTMLInputElement | null;

    if (searchInput && initialQuery) {
        searchInput.value = initialQuery;
    }

    syncPageUrl(initialPage);

    await loadBlogsPage(initialPage, initialQuery, 'fetch');

    handlePagination(async (newPage) => {
        const currentQuery = searchInput?.value ?? '';
        await loadBlogsPage(newPage, currentQuery, 'fetch');
    });

    search();
};

blog();
