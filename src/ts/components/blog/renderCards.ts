import type { Post } from '../../../models/post.model.js';
import { getElements } from './dom.js';
import { getPageFromUrl, setPageUrl, setupPagination } from './pagination.js';

let currentPage = getPageFromUrl() || 1;
const itemsPerPage = 10;

const getDataPosts = () => {
    const storedPosts = localStorage.getItem('postData');
    const dataPosts: Post[] = storedPosts ? JSON.parse(storedPosts) : [];
    return dataPosts;
};

export const renderCards = (page: number = getPageFromUrl()) => {
    const { postCard } = getElements();
    const dataPosts = getDataPosts();

    if (!postCard) return;

    const totalItems = dataPosts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const activePage = Math.min(Math.max(1, page), totalPages);

    setPageUrl(activePage);

    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPosts = dataPosts.slice(startIndex, endIndex);

    postCard.innerHTML = '';

    paginatedPosts.forEach((dataPost, index) => {
        const postNumber = startIndex + index + 1;
        const formattedNumber = `N.° ${String(postNumber).padStart(2, '0')}`;

        const card = document.createElement('article');
        card.classList.add('editorial-card');
        card.innerHTML = `
            <div class="editorial-card__top">
                <div class="editorial-card__meta">
                    <span class="editorial-card__circle">+</span>
                    <span class="editorial-card__number">${formattedNumber}</span>
                </div>
                <h2 class="editorial-card__title">${dataPost.title}</h2>
            </div>
            <div class="editorial-card__bottom">
                <p class="editorial-card__excerpt">${dataPost.body}</p>
            </div>
        `;
        postCard.appendChild(card);
    });

    setupPagination(totalItems, itemsPerPage, activePage, (nextPage) => {
        renderCards(nextPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};
