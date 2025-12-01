// dashboard.js

import { initSidebar } from './components/sidebar/sidebar.js';
import { initTopbar } from './components/topbar/topbar.js';
import { loadClientePage } from './pages/cliente/cliente.js'; // Assumindo este import existe

// Função para carregar HTML externo
async function loadComponent(path, containerId) {
    const response = await fetch(path);
    const text = await response.text();
    
    // A atribuição do innerHTML é rápida e aguardada.
    // O erro anterior era de timing após esta linha.
    document.getElementById(containerId).innerHTML = text;
}

async function initDashboard() {
    console.log("Iniciando Dashboard...");
    
    // Carrega Layout da Sidebar e espera (await) a conclusão
    await loadComponent('./components/sidebar/sidebar.html', 'sidebar-container');
    initSidebar(); // Inicializa o JS da sidebar

    // Carrega Layout da Topbar e espera (await) a conclusão
    await loadComponent('./components/topbar/topbar.html', 'topbar-container');
    initTopbar(); // Inicializa o JS da topbar

    // Roteamento simples (Mock)
    window.addEventListener('navigate', (e) => {
        const route = e.detail.route;
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = ''; 

        if (route === 'clientes') {
            loadComponent('./pages/cliente/cliente.html', 'content-area')
                .then(() => loadClientePage());
        }
        // Se houver overlay (mobile), fecha ao navegar
        document.body.classList.remove('sidebar-open');
    });
    
    // Dispara a navegação inicial para a página de clientes
    window.dispatchEvent(new CustomEvent('navigate', { detail: { route: 'clientes' } }));
}

initDashboard();