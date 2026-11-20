import type { Post } from '../../../models/post.model.js';
import { type OnPageChange } from '../../../types/onPageChange.type.js';
import { getElements } from './dom.js';
import { renderCards } from './renderCards.js';
import { getPageFromUrl, syncPageUrl } from './syncSearchUrl.js';

const ITEMS_PER_PAGE = 10;

let currentPage = 1;
let totalItems = 0;
let activeBlogs: Post[] = [];
let onPageChangeCallback: OnPageChange | null = null;
let isPaginationBound = false;

const getTotalPages = () => Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

export const setupPagination = (page: number = 1, data: Post[]) => {
    const localTotal = data.length;
    const totalPages = Math.max(1, Math.ceil(localTotal / ITEMS_PER_PAGE));
    const activePage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedPosts = data.slice(startIndex, endIndex);

    return { paginatedPosts, startIndex, totalPages, activePage };
};

const updateButtonState = () => {
    const { btnNext, btnPrev } = getElements();
    const buttonNext = btnNext as HTMLButtonElement | null;
    const buttonPrev = btnPrev as HTMLButtonElement | null;

    const totalPages = getTotalPages();

    if (buttonPrev) {
        buttonPrev.disabled = currentPage <= 1;
    }
    if (buttonNext) {
        buttonNext.disabled = currentPage >= totalPages || totalItems === 0;
    }
};

const updateIndicator = () => {
    const { pageIndicator } = getElements();
    if (!pageIndicator) return;

    const totalPages = getTotalPages();
    pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
};

export const setPaginationState = (blogs: Post[], page: number = 1, totalCount: number = blogs.length) => {
    activeBlogs = blogs;
    totalItems = Math.max(0, totalCount);

    const totalPages = getTotalPages();
    currentPage = totalItems === 0 ? 1 : Math.min(Math.max(1, page), totalPages);

    updateButtonState();
    updateIndicator();
};

export const handlePagination = (onPageChange?: OnPageChange) => {
    if (onPageChange) {
        onPageChangeCallback = onPageChange;
    }

    const { btnNext, btnPrev } = getElements();
    const buttonNext = btnNext as HTMLButtonElement | null;
    const buttonPrev = btnPrev as HTMLButtonElement | null;

    currentPage = getPageFromUrl();
    updateButtonState();
    updateIndicator();

    if (isPaginationBound) return;
    isPaginationBound = true;

    const goToPage = async (nextPage: number) => {
        const totalPages = getTotalPages();
        const clampedPage = Math.min(Math.max(1, nextPage), totalPages);
        if (clampedPage === currentPage) return;

        currentPage = clampedPage;
        syncPageUrl(currentPage);
        updateButtonState();
        updateIndicator();

        if (onPageChangeCallback) {
            await onPageChangeCallback(currentPage);
        } else {
            renderCards(activeBlogs, currentPage);
        }
    };

    buttonNext?.addEventListener('click', () => {
        const totalPages = getTotalPages();
        if (currentPage < totalPages) {
            void goToPage(currentPage + 1);
        }
    });

    buttonPrev?.addEventListener('click', () => {
        if (currentPage > 1) {
            void goToPage(currentPage - 1);
        }
    });
};
