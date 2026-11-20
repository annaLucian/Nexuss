import { getElements } from './dom.js';
import { fetchData } from '../../services/fetchData.js';
import { debounce } from '../../utils/debounce.js';
import { renderCards } from './renderCards.js';
import { syncSearchUrl, syncPageUrl } from './syncSearchUrl.js';
import { setPaginationState } from './pagination.js';
import { type ApiClient } from '../../../types/api.types.js';

const excecuteDebounce = debounce(async (inputValue: string) => {
    const storedClient = localStorage.getItem('clientUsed') as ApiClient | null;
    const selectUser: ApiClient = storedClient === 'axios' ? 'axios' : 'fetch';

    try {
        const filteredBlogs = await fetchData.getSearchBlogs(selectUser, inputValue);

        syncSearchUrl(inputValue);
        syncPageUrl(1);
        setPaginationState(filteredBlogs, 1, filteredBlogs.length);
        renderCards(filteredBlogs, 1);
    } catch (error) {
        console.error('Error al buscar blogs:', error);
        syncPageUrl(1);
        setPaginationState([], 1, 0);
        renderCards([], 1);
    }
}, 600);

export const search = () => {
    const { input } = getElements();
    const searchInput = input as HTMLInputElement | null;
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });

    searchInput.addEventListener('input', function (this: HTMLInputElement) {
        this.value = this.value.replace(/^\s+/, '');

        const inputValue = searchInput.value.trim().toLowerCase();
        excecuteDebounce(inputValue);
    });
};
