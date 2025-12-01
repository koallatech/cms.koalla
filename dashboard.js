import { initSidebar } from './components/sidebar/sidebar.js';
import { initTopbar } from './components/topbar/topbar.js';
import { loadClientePage } from './pages/cliente/cliente.js';

// Função para carregar HTML externo
async function loadComponent(path, containerId) {
    const response = await fetch(path);
    const text = await response.text();
    document.getElementById(containerId).innerHTML = text;
}

async function initDashboard() {
    // Carrega Layout
    await loadComponent('./components/sidebar/sidebar.html', 'sidebar-container');
    await loadComponent('./components/topbar/topbar.html', 'topbar-container');

    // Inicializa lógica dos componentes
    initSidebar();
    initTopbar();

    // Roteamento simples (Mock)
    // Ouve eventos disparados pelo menu
    window.addEventListener('navigate', (e) => {
        const route = e.detail.route;
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = ''; // Limpa área

        if (route === 'clientes') {
            loadComponent('./pages/cliente/cliente.html', 'content-area')
                .then(() => loadClientePage());
        }
    });
}

initDashboard();
