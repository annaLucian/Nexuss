import type { Post } from '../../../models/post.model.js';
import { getElements } from './dom.js';

const getDataPosts = () => {
    const storedPosts = localStorage.getItem('postData');
    const dataPosts: Post[] = storedPosts ? JSON.parse(storedPosts) : [];
    return dataPosts;
};
export const renderCards = () => {
    const { postCard } = getElements();
    const dataPosts = getDataPosts();

    if (!postCard) return;
    postCard.innerHTML = '';

    if (dataPosts.length === 0) {
        postCard.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 2rem; font-weight: 600;">No hay publicaciones disponibles.</p>`;
        return;
    }

    dataPosts.forEach((dataPost, index) => {
        const formattedNumber = `N.° ${String(index + 1).padStart(2, '0')}`;

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
};
