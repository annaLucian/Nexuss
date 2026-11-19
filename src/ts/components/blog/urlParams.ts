export const urlParams = (query: string) => {
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

export const getSearchFromUrl = (): string => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') ?? '';
};
