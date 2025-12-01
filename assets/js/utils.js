// Simulação do cliente Supabase
// TODO: Instalar supabase-js via CDN ou npm posteriormente
export const supabase = {
    from: (table) => ({
        select: async () => {
            console.log(`Supabase: Buscando dados de ${table}`);
            // Retorna dados mockados por enquanto
            const { mockData } = await import('./mockData.js');
            return { data: mockData[table] || [], error: null };
        }
    })
};

// Gerador de elementos DOM (Substitui injeção HTML)
export function createElement(tag, classes = [], text = '') {
    const el = document.createElement(tag);
    if (classes.length) el.classList.add(...classes);
    if (text) el.textContent = text;
    return el;
}

// Sistema de Feedback Visual (Toast)
export function showToast(message, type = 'success') {
    const toast = createElement('div', ['toast', type], message);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
