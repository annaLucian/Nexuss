import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { fetchData } from '../ts/services/fetchData.js';
import { type Post } from '../models/post.model.js';

vi.mock('axios');

const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Primer post', body: 'Contenido inicial de prueba' },
    { userId: 1, id: 2, title: 'Segundo post', body: 'Otro texto diferente' },
];

describe('fetchData service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('getAllData', () => {
        it('should the posts using `fetch` when `apiService` is “fetch”', async () => {
            vi.stubGlobal(
                'fetch',
                vi.fn().mockResolvedValue({
                    ok: true,
                    json: vi.fn().mockResolvedValue(mockPosts),
                })
            );

            const result = await fetchData.getAllData('fetch');

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
            expect(result).toEqual(mockPosts);
        });

        it('should use Axios for the posts when apiService is “axios”', async () => {
            vi.mocked(axios.get).mockResolvedValue({ data: mockPosts });

            const result = await fetchData.getAllData('axios');

            expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
            expect(result).toEqual(mockPosts);
        });

        it('should return an empty array if fetch returns a status other than “OK.”', async () => {
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                ok: false,
                status: 500,
            } as Response);
            const result = await fetchData.getAllData('fetch');
            expect(result).toEqual([]);
        });
    });

    describe('getSearchBlogs', () => {
        it('should filter by text (case-insensitive) and allow searching by ID', async () => {
            vi.mocked(axios.get).mockResolvedValue({ data: mockPosts });

            const byTitle = await fetchData.getSearchBlogs('axios', 'SEGUNDO');
            const byId = await fetchData.getSearchBlogs('axios', '1');

            expect(byTitle).toEqual([mockPosts[1]]);
            expect(byId).toEqual([mockPosts[0]]);
        });

        it('should return all posts if the search term is empty', async () => {
            vi.mocked(axios.get).mockResolvedValue({ data: mockPosts });

            const result = await fetchData.getSearchBlogs('axios', '   ');

            expect(result).toEqual(mockPosts);
        });
    });

    describe('getPaginatedPosts', () => {
        it('envía _page, _limit y q y lee X-Total-Count con fetch', async () => {
            const headers = new Headers({ 'X-Total-Count': '100' });
            const fetchMock = vi.fn().mockResolvedValue({
                ok: true,
                headers,
                json: vi.fn().mockResolvedValue([mockPosts[0]]),
            });
            vi.stubGlobal('fetch', fetchMock);

            const result = await fetchData.getPaginatedPosts('fetch', {
                page: 2,
                limit: 10,
                q: 'primer',
            });

            expect(fetchMock).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/posts?_page=2&_limit=10&q=primer'
            );
            expect(result).toEqual({
                posts: [mockPosts[0]],
                totalItems: 100,
            });
        });

        it('envía params y lee x-total-count con axios', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: mockPosts,
                headers: { 'x-total-count': '42' },
            });

            const result = await fetchData.getPaginatedPosts('axios', {
                page: 1,
                limit: 10,
                q: '',
            });

            expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
                params: { _page: 1, _limit: 10 },
            });
            expect(result).toEqual({
                posts: mockPosts,
                totalItems: 42,
            });
        });
    });
});
