import type { Post } from '../../../models/post.model.js';
import { getElements } from './dom.js';

export const renderCards = (posts: Post[]) => {
    const { postCard } = getElements();
    if (!postCard) return;
    postCard.innerHTML = '';

    if (posts.length === 0) {
        postCard.classList.add('container-nogrid');
        postCard.innerHTML = `<div class="error-blog__container"><p class="container__error-blogs">No existen <strong>Blogs</strong> con esa busqueda...</p><img class="error-blogs__img" src="/public/assets/no-found.png"></div>`;
        return;
    }

    posts.forEach((post, index) => {
        const formattedNumber = `N.° ${String(index + 1).padStart(2, '0')}`;
        postCard.classList.remove('container-nogrid');

        const card = document.createElement('article');
        card.classList.add('editorial-card');
        card.innerHTML = `
            <div class="editorial-card__top">
                <div class="editorial-card__meta">
                    <span class="editorial-card__circle">+</span>
                    <span class="editorial-card__number">${formattedNumber}</span>
                </div>
                <h2 class="editorial-card__title">${post.title}</h2>
            </div>
            <div class="editorial-card__bottom">
                <p class="editorial-card__excerpt">${post.body}</p>
            </div>
        `;

        postCard.appendChild(card);
    });
};
