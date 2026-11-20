import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { search } from '../ts/components/blog/search.js';
import { getSearchFromUrl, getPageFromUrl, syncPageUrl, syncSearchUrl } from '../ts/components/blog/syncSearchUrl.js';
import { setPaginationState } from '../ts/components/blog/pagination.js';
import { fetchData } from '../ts/services/fetchData.js';
import type { Post } from '../models/post.model.js';

const mockPosts: Post[] = Array.from({ length: 25 }, (_, i) => ({
    userId: 1,
    id: i + 1,
    title: i === 0 ? 'Lorem ipsum post' : `Post número ${i + 1}`,
    body: i === 0 ? 'Contenido lorem de ejemplo' : 'Texto general',
}));

const setupDom = () => {
    document.body.innerHTML = `
        <input id="search-input" type="text" />
        <div id="cards-container"></div>
        <button id="btn-prev">Prev</button>
        <span id="page-indicator"></span>
        <button id="btn-next">Next</button>
    `;
};

describe('should perform searches and synchronization using the URL', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        localStorage.clear();
        window.history.replaceState({}, '', '/');
        setupDom();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('should return to page 1 when searching and update the total number of pages based on the results.', async () => {
        const filtered = mockPosts.slice(0, 1);
        vi.spyOn(fetchData, 'getSearchBlogs').mockResolvedValue(filtered);

        syncPageUrl(3);
        setPaginationState(mockPosts, 3, mockPosts.length);

        search();

        const input = document.querySelector<HTMLInputElement>('#search-input')!;
        input.value = 'lorem';
        input.dispatchEvent(new Event('input'));

        await vi.advanceTimersByTimeAsync(600);

        expect(getPageFromUrl()).toBe(1);
        expect(getSearchFromUrl()).toBe('lorem');
        expect(document.querySelector('#page-indicator')?.textContent).toBe('Página 1 de 1');
    });

    it('should see the general list and the complete pagination when clearing the search', async () => {
        const searchSpy = vi
            .spyOn(fetchData, 'getSearchBlogs')
            .mockResolvedValueOnce(mockPosts.slice(0, 1))
            .mockResolvedValueOnce(mockPosts);

        search();

        const input = document.querySelector<HTMLInputElement>('#search-input')!;

        input.value = 'lorem';
        input.dispatchEvent(new Event('input'));
        await vi.advanceTimersByTimeAsync(600);
        expect(document.querySelector('#page-indicator')?.textContent).toBe('Página 1 de 1');

        input.value = '';
        input.dispatchEvent(new Event('input'));
        await vi.advanceTimersByTimeAsync(600);

        expect(searchSpy).toHaveBeenLastCalledWith('fetch', '');
        expect(document.querySelector('#page-indicator')?.textContent).toBe('Página 1 de 3');
    });

    it('should read “?q=lorem&page=2” from the URL and set the maximum number of pages to “?page=999”.', () => {
        window.history.replaceState({}, '', '/?q=lorem&page=2');
        expect(getSearchFromUrl()).toBe('lorem');
        expect(getPageFromUrl()).toBe(2);

        window.history.replaceState({}, '', '/?page=999');
        const requestedPage = getPageFromUrl();
        setPaginationState(mockPosts, requestedPage, mockPosts.length);

        expect(document.querySelector('#page-indicator')?.textContent).toBe('Página 3 de 3');
    });

    it('should normalize invalid URLs such as ?page=-1 and ?page=abc to a valid range', () => {
        window.history.replaceState({}, '', '/?page=-1');
        expect(getPageFromUrl()).toBe(1);
        setPaginationState(mockPosts, getPageFromUrl(), mockPosts.length);
        expect(document.querySelector('#page-indicator')?.textContent).toBe('Página 1 de 3');

        window.history.replaceState({}, '', '/?page=abc');
        expect(getPageFromUrl()).toBe(1);
        setPaginationState(mockPosts, getPageFromUrl(), mockPosts.length);
        expect(document.querySelector('#page-indicator')?.textContent).toBe('Página 1 de 3');
    });
});
