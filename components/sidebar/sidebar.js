// components/sidebar/sidebar.js

export function initSidebar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const overlay = document.querySelector('.sidebar-overlay');

    // **CHECAGEM DE SEGURANÇA**
    if (navLinks.length === 0) {
        console.error("ERRO SIDEBAR: Links de navegação não encontrados.");
        return;
    }

    // 1. Lógica de Navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            
            // Dispara evento para o dashboard.js capturar e rotear
            const event = new CustomEvent('navigate', { detail: { route } });
            window.dispatchEvent(event);
            
            // Lógica de fechar no mobile é tratada no dashboard.js para garantir fechamento após a navegação
        });
    });

    // 2. Lógica de Fechar Sidebar (Overlay Mobile)
    if (overlay) {
        overlay.addEventListener('click', () => {
            // Clicar fora (no overlay) deve fechar a sidebar
            document.body.classList.remove('sidebar-open');
        });
    }
}