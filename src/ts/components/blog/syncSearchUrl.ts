export const syncSearchUrl = (query: string) => {
    const params = new URLSearchParams(window.location.search);
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
        params.set('q', trimmedQuery);
    } else {
        params.delete('q');
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
};

export const syncPageUrl = (page: number) => {
    const params = new URLSearchParams(window.location.search);

    if (page > 1) {
        params.set('page', String(page));
    } else {
        params.delete('page');
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
};

export const getSearchFromUrl = (): string => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') ?? '';
};

export const getPageFromUrl = (): number => {
    const params = new URLSearchParams(window.location.search);
    const parsedPage = Number(params.get('page'));
    return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
};
