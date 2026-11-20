import { type Post } from './post.model';
export interface PaginatedPostsResult {
    posts: Post[];
    totalItems: number;
}
