// components/sidebar/sidebar.js

export function initSidebar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const overlay = document.querySelector('.sidebar-overlay'); // Elemento que cobre a tela no mobile

    // 1. Lógica de Navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            
            // Dispara evento para o dashboard.js capturar e rotear
            const event = new CustomEvent('navigate', { detail: { route } });
            window.dispatchEvent(event);

            // **🐛 CORREÇÃO DE BUG**: Fecha a sidebar no mobile após a navegação
            if (window.innerWidth <= 768) {
                 document.body.classList.remove('sidebar-open');
            }
        });
    });

    // 2. Lógica de Fechar Sidebar (Overlay Mobile)
    if (overlay) {
        overlay.addEventListener('click', () => {
            // **CORREÇÃO**: Clicar no overlay remove a classe que abre o menu.
            document.body.classList.remove('sidebar-open');
        });
    }
}