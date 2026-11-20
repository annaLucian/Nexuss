import type { Post } from '../../../models/post.model.js';
import { getElements } from './dom.js';
import { renderCards } from './renderCards.js';
import { getPageFromUrl, syncPageUrl } from './syncSearchUrl.js';

const ITEMS_PER_PAGE = 10;

let currentPage = 1;
let activeBlogs: Post[] = [];

export const setupPagination = (page: number = 1, data: Post[]) => {
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    const activePage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endindex = startIndex + ITEMS_PER_PAGE;
    const paginatedPosts = data.slice(startIndex, endindex);

    return { paginatedPosts, startIndex, totalPages, activePage };
};

const updateButtonState = () => {
    const { btnNext, btnPrev } = getElements();
    const buttonNext = btnNext as HTMLButtonElement | null;
    const buttonPrev = btnPrev as HTMLButtonElement | null;

    const totalPages = Math.max(1, Math.ceil(activeBlogs.length / ITEMS_PER_PAGE));

    if (buttonPrev) {
        buttonPrev.disabled = currentPage <= 1;
    }
    if (buttonNext) {
        buttonNext.disabled = currentPage >= totalPages || activeBlogs.length === 0;
    }
};

const updateIndicator = () => {
    const { pageIndicator } = getElements();
    if (!pageIndicator) return;

    const totalPages = Math.max(1, Math.ceil(activeBlogs.length / ITEMS_PER_PAGE));
    pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
};

export const setPaginationState = (blogs: Post[], page: number = 1) => {
    activeBlogs = blogs;
    const totalPages = Math.max(1, Math.ceil(activeBlogs.length / ITEMS_PER_PAGE));
    currentPage = Math.min(Math.max(1, page), totalPages);
    updateButtonState();
};

export const handlePagination = () => {
    const { btnNext, btnPrev } = getElements();

    const buttonNext = btnNext as HTMLButtonElement | null;
    const buttonPrev = btnPrev as HTMLButtonElement | null;

    currentPage = getPageFromUrl();
    updateButtonState();

    buttonNext?.addEventListener('click', () => {
        console.log('holaaa next');
        const totalPages = Math.max(1, Math.ceil(activeBlogs.length / ITEMS_PER_PAGE));

        if (currentPage < totalPages) {
            currentPage += 1;
            syncPageUrl(currentPage);
            renderCards(activeBlogs, currentPage);
            updateButtonState();
            updateIndicator();
        }
    });

    buttonPrev?.addEventListener('click', () => {
        console.log('holaaa neprevxt');
        if (currentPage > 1) {
            currentPage -= 1;
            syncPageUrl(currentPage);
            renderCards(activeBlogs, currentPage);
            updateButtonState();
            updateIndicator();
        }
    });
};
