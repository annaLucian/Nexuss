import { getElements } from './dom.js';

export const initBlog = () => {
    const { pageBody, dynamicTitle, serviceBadge, breadcrumbClient, heroDropcap, dynamicParagraph } = getElements();
    const clientUsed = localStorage.getItem('clientUsed');

    if (clientUsed === 'axios') {
        pageBody?.classList.remove('theme-fetch');
        pageBody?.classList.add('theme-axios');
        if (serviceBadge) serviceBadge.textContent = '• Potenciado con Axios ⚡';
        if (dynamicTitle) dynamicTitle.textContent = 'Axios';
        if (breadcrumbClient) breadcrumbClient.textContent = 'AXIOS';
        if (heroDropcap) heroDropcap.textContent = 'A';
        if (dynamicParagraph) {
            dynamicParagraph.textContent =
                'Cada publicación se cargó con Axios, cuidando el detalle de las peticiones, los encabezados y una experiencia rápida en cada consulta.';
        }
    } else {
        pageBody?.classList.remove('theme-axios');
        pageBody?.classList.add('theme-fetch');
        if (serviceBadge) serviceBadge.textContent = '• Potenciado con Fetch Nativo 🧩';
        if (dynamicTitle) dynamicTitle.textContent = 'Fetch';
        if (breadcrumbClient) breadcrumbClient.textContent = 'FETCH';
        if (heroDropcap) heroDropcap.textContent = 'F';
        if (dynamicParagraph) {
            dynamicParagraph.textContent =
                'Utilizamos la API nativa Fetch del navegador para solicitar estos artículos de forma directa, ligera y sin dependencias externas.';
        }
    }
};

document.addEventListener('DOMContentLoaded', initBlog);
