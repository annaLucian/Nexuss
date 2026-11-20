import axios from 'axios';
import { type ApiClient } from '../../types/api.types.js';
import type { Post } from '../../models/post.model.js';
import type { PaginatedPostsParams } from '../../models/paginatedPostsParams.model.js';
import type { PaginatedPostsResult } from '../../models/paginatedPostsResult.model.js';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchData = {
    getAllData: async (apiService: ApiClient): Promise<Post[]> => {
        try {
            if (apiService === 'axios') {
                const { data } = await axios.get<Post[]>(API_URL);
                return data ?? [];
            }

            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data: Post[] = await response.json();
            return data ?? [];
        } catch (error) {
            console.error('Los posts no se cargaron correctamente', error);
            return [];
        }
    },

    getSearchBlogs: async (apiService: ApiClient, searchTerm: string): Promise<Post[]> => {
        const blogs = await fetchData.getAllData(apiService);
        const cleanQuery = searchTerm.trim().toLowerCase();

        if (!cleanQuery) return blogs;

        try {
            return blogs.filter(
                (blog: Post) =>
                    blog.title.toLowerCase().includes(cleanQuery) ||
                    blog.body.toLowerCase().includes(cleanQuery) ||
                    String(blog.id) === cleanQuery
            );
        } catch (error) {
            console.error('Error al filtrar los posts:', error);
            throw error;
        }
    },
    getPaginatedPosts: async (
        apiService: ApiClient,
        { page = 1, limit = 10, q = '' }: PaginatedPostsParams = {}
    ): Promise<PaginatedPostsResult> => {
        const trimmedQuery = q.trim();

        try {
            if (apiService === 'axios') {
                const response = await axios.get<Post[]>(API_URL, {
                    params: {
                        _page: page,
                        _limit: limit,
                        ...(trimmedQuery ? { q: trimmedQuery } : {}),
                    },
                });

                const totalHeader = response.headers['x-total-count'];
                const posts = response.data ?? [];
                const totalItems = totalHeader !== undefined ? Number(totalHeader) : posts.length;

                return { posts, totalItems };
            }

            const params = new URLSearchParams({
                _page: String(page),
                _limit: String(limit),
            });

            if (trimmedQuery) {
                params.set('q', trimmedQuery);
            }

            const response = await fetch(`${API_URL}?${params.toString()}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const posts: Post[] = await response.json();
            const totalHeader = response.headers.get('X-Total-Count');
            const totalItems = totalHeader !== null ? Number(totalHeader) : posts.length;

            return { posts: posts ?? [], totalItems };
        } catch (error) {
            console.error('Error al obtener los posts paginados:', error);
            throw error;
        }
    },
};
