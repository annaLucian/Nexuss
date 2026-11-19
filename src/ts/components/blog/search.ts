import { getElements } from './dom.js';
import { fetchData } from '../../services/fetchData.js';
import { debounce } from '../../utils/debounce.js';
import { renderCards } from './renderCards.js';
import { type ApiClient } from '../../../types/api.types.js';

const excecuteDebounce = debounce(async (inputValue) => {
    const selectUser = localStorage.getItem('clientUsed') as ApiClient;
    const filteredBolgs = await fetchData.getSearchBlogs(selectUser, inputValue);
    renderCards(filteredBolgs);
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
