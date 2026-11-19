export const getPageFromUrl = (): number => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = Number(params.get('page'));
    return Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
};

export const setPageUrl = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(page));
    window.history.pushState({ page }, '', url.toString());
};

export function setupPagination(
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    onPageChange: (newPage: number) => void
) {
    const container = document.getElementById('pagination') as HTMLElement | null;
    if (!container) return;

    container.innerHTML = '';

    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'pagination__btn';
    prevBtn.textContent = '← Ant.';
    prevBtn.disabled = currentPage <= 1;
    if (currentPage > 1) {
        prevBtn.classList.add('is-active');
    }
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    });

    // Indicador central: "Página X de Y"
    const info = document.createElement('span');
    info.className = 'pagination__info';
    info.textContent = `Página ${currentPage} de ${totalPages}`;

    // Botón siguiente
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'pagination__btn';
    nextBtn.textContent = 'Sig. →';
    nextBtn.disabled = currentPage >= totalPages;
    if (currentPage < totalPages) {
        nextBtn.classList.add('is-active');
    }
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    });

    container.append(prevBtn, info, nextBtn);
}
