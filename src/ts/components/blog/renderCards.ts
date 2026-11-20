import type { Post } from '../../../models/post.model.js';
import { getElements } from './dom.js';
import { setupPagination } from './pagination.js';

export const renderCards = (blogsArray: Post[], page: number = 1) => {
    const { postCard } = getElements();
    if (!postCard) return;
    postCard.innerHTML = '';

    if (blogsArray.length === 0) {
        postCard.classList.add('container-nogrid');
        postCard.innerHTML = `<div class="error-blog__container"><p class="container__error-blogs">No existen <strong>Blogs</strong> con esa busqueda...</p><img class="error-blogs__img" src="/public/assets/no-found.png"></div>`;
        return;
    }
    postCard.classList.remove('container-nogrid');

    const { paginatedPosts: blogs } = setupPagination(page, blogsArray);

    blogs.forEach((blog, index) => {
        const formattedNumber = `N.° ${String(blog.id).padStart(2, '0')}`;

        const card = document.createElement('article');
        card.classList.add('editorial-card');
        card.innerHTML = `
            <div class="editorial-card__top">
                <div class="editorial-card__meta">
                    <span class="editorial-card__circle">+</span>
                    <span class="editorial-card__number">${formattedNumber}</span>
                </div>
                <h2 class="editorial-card__title">${blog.title}</h2>
            </div>
            <div class="editorial-card__bottom">
                <p class="editorial-card__excerpt">${blog.body}</p>
            </div>
        `;

        postCard.appendChild(card);
    });
};
