import { getElements } from './dom.js';
import { debounce } from '../../utils/debounce.js';

export const search = () => {
    const { input } = getElements();
    const searchInput = input as HTMLInputElement | null;
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const inputValue = searchInput.value.trim().toLowerCase();
        console.log('value:', inputValue);
    });
};
